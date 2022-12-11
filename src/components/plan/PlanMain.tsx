import PlanFilter from "@comps/plan/PlanFilter";
import useFetchLoadsheddingStatus from "@hooks/useFetchLoadsheddingStatus";
import useFetchPlanData from "@hooks/useFetchPlanData";
import type { FilterData } from "@lstypes/types";
import supabase from "@utils/supabase-config";
import Image from "next/image";
import Router, { useRouter } from "next/router";
import { useEffect, useReducer } from "react";
import { toast } from "react-toastify";
const handleReducer = (state: any, action: { TYPE: string; PAYLOAD?: any }) => {
  switch (action.TYPE) {
    case "SET_FILTER_DATA":
      return {
        ...state,
        filterInputs: action.PAYLOAD.filterInputs,
        active_member_times: state.member_times
          .map((items: any) => {
            if (items.user_weekLSTimes) {
              return items.user_weekLSTimes.filter((times: any) => {
                return times.date === action.PAYLOAD.filterInputs?.startDate;
              });
            }
          })
          .flat(),
      };
    case "SET_LS_USERS_TIME":
      return {
        ...state,
        member_times: action.PAYLOAD,
        active_member_times: action.PAYLOAD.map((items: any) => {
          if (items.user_weekLSTimes) {
            return items.user_weekLSTimes.filter((times: any) => {
              return times.date === state.filterInputs?.startDate;
            });
          }
        }).flat(),
      };
    case "SET_LS_TEAM_TIME":
      return {
        ...state,
        team_times: action.PAYLOAD,
      };
    case "SET_LS_STAGE":
      return {
        ...state,
        currentLoadSheddingStage: action.PAYLOAD,
      };

    case "SET_ACTIVE_DATE_TIMES_USERS":
      return {
        ...state,
        active_member_times: action.PAYLOAD,
      };
  }
};
export default function PlanMain({ filterState }: any) {
  const router = useRouter();
  const [state, dispatch] = useReducer(handleReducer, {
    member_times: [],
    active_member_times: [],
    team_times: [],
    active_team_times: [],
    filterInputs: {
      startDate: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate(),
        new Date().getHours()
      )
        .toISOString()
        .split("T")[0] as string,
      startTime: "17:00",
      endTime: "02:00",
    },
    devMode: true,
  });

  const handleFilterChange = ({ filterInputs }: FilterData) => {
    dispatch({
      TYPE: "SET_FILTER_DATA",
      PAYLOAD: {
        filterInputs,
      },
    });
  };

  const handleUserRemove = async (rUser: string) => {
    if (!rUser) return;
    const newMembers = planData?.plan_authorizedUsers?.filter(
      (member: string) => member !== rUser
    );
    const { error } = await supabase
      .from("user_plans")
      .update({ plan_authorizedUsers: newMembers })
      .eq("plan_id", router.query.plan_id);

    if (error) {
      console.log(error);
      toast.error("Error removing member");
      return;
    }
    await planRefetch();
  };

  const {
    data: planData,
    error: planError,
    isLoading: planLoading,
    refetch: planRefetch,
  } = useFetchPlanData(router.query.plan_id as string);

  const {
    data: loadsheddingStageData,
    error: loadsheddingStageError,
    isLoading: loadsheddingStageLoading,
    isFetching: loadsheddingStageFetching,
    refetch: loadsheddingStageRefetch,
  } = useFetchLoadsheddingStatus();

  useEffect(() => {
    if (planLoading) return;
    (async () => {
      const { data: emailData, error: errorData } = await supabase
        .from("user_info")
        .select("user_id,user_email,user_weekLSTimes")
        .in("user_email", planData?.plan_authorizedUsers);

      const { data: uidData, error: uidError } = await supabase
        .from("user_info")
        .select("user_id,user_email,user_weekLSTimes")
        .in("user_id", planData?.plan_authorizedUsers);

      if (errorData || uidError) {
        toast.error("Error fetching authorized users");
        return;
      }
      dispatch({
        TYPE: "SET_LS_USERS_TIME",
        PAYLOAD: [...emailData, ...uidData],
      });
    })();
  }, [planLoading]);

  if (planError || loadsheddingStageError || state.devMode) {
    return (
      <div className='h-[90vh] w-screen flex items-center justify-center flex-col space-y-10'>
        <Image src='/Logov3.png' width={170} height={170} alt='LSPLANNER LOGO' />
        <h1 className='text-white font-satoshiBold tracking-tighter text-5xl'>
          DASHBOARD IS CURRENTLY UNAVAILABLE
        </h1>
        <button
          className='relative flex items-center justify-center  w-[10rem] h-[3rem] text-sm font-black text-gray-900 rounded-full group bg-gradient-to-br from-[#6EE7B7] via-[#3B82F6] to-[#9333EA] group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white '
          onClick={() => Router.push("/")}
        >
          <span className='relative px-5 py-2.5 group-hover:px-0 transition-all ease-in duration-200 w-[9.5rem] h-[2.5rem] bg-white dark:bg-slate-800 rounded-full group-hover:bg-opacity-0'>
            <span className='flex items-center justify-around font-satoshiBlack'>
              GO HOME
            </span>
          </span>
        </button>
      </div>
    );
  }

  return (
    <div className='w-full h-full relative'>
      {filterState && (
        <PlanFilter
          members={planData?.plan_authorizedUsers}
          teams={planData?.plan_authorizedTeams}
          invitedData={planData?.plan_InvitedData}
          filterSettings={state.filterInputs}
          onFilter={handleFilterChange}
          removeUserCB={handleUserRemove}
          refetchPlanData={planRefetch}
        />
      )}

      <div className='flex flex-col h-full w-6/6'>
        <h1 className='text-white text-sm font-black'>
          {loadsheddingStageLoading ? (
            <>LOADING LOADSHEDDING STAGES</>
          ) : (
            JSON.stringify(loadsheddingStageData)
          )}
        </h1>
        <pre className='text-pink-500 whitespace-pre-wrap'>
          {JSON.stringify(planData)}
        </pre>
        <pre className='text-white whitespace-pre-wrap font-satoshiBold'>
          {JSON.stringify(state.active_member_times)}
        </pre>
      </div>
    </div>
  );
}
