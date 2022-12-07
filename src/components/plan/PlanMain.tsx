import PlanFilter from "@comps/plan/PlanFilter";
import useFetchPlanData from "@hooks/useFetchPlanData";
import type { FilterData } from "@lstypes/types";
import supabase from "@utils/supabase-config";
import { useRouter } from "next/router";
import { useEffect, useReducer } from "react";
import { toast } from "react-toastify";
const handleReducer = (state: any, action: { TYPE: string; PAYLOAD?: any }) => {
  switch (action.TYPE) {
    case "TOGGLE_FILTER":
      return {
        ...state,
        filter: !state.filter,
      };
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
export default function PlanMain() {
  const router = useRouter();
  const [state, dispatch] = useReducer(handleReducer, {
    filter: false,
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
    currentLoadSheddingStage: { capetown: 0, eskom: 0 },
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
    isFetching: planFetching,
    refetch: planRefetch,
  } = useFetchPlanData(router.query.plan_id as string);

  useEffect(() => {
    (async () => {
      const data = await fetch("/api/sepush/status").then((resp) => resp.json());
      dispatch({
        TYPE: "SET_LS_STAGE",
        PAYLOAD: {
          capetown: data?.capetown?.stage,
          eskom: data?.eskom?.stage,
        },
      });
    })();
  }, []);

  useEffect(() => {
    if (planLoading) return;
    (async () => {
      const { data, error } = await supabase
        .from("user_info")
        .select("user_id,user_email,user_weekLSTimes")
        .in("user_email", planData?.plan_authorizedUsers);

      if (error) {
        toast.error("Error fetching authorized users");
        return;
      }
      dispatch({
        TYPE: "SET_LS_USERS_TIME",
        PAYLOAD: data,
      });
    })();
  }, [planLoading]);

  return (
    <div className='w-full h-full relative'>
      {state.filter && (
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
        <button
          className='p-4 bg-orange-400 text-black rounded-xl text-2xl font-Inter'
          onClick={() => dispatch({ TYPE: "TOGGLE_FILTER" })}
        >
          TOGGLE
        </button>
        <h1 className='text-white text-sm font-black'>
          {JSON.stringify(state.currentLoadSheddingStage)}
        </h1>

        <pre className='text-pink-500 whitespace-pre-wrap'>
          {JSON.stringify(planData)}
        </pre>
        <pre className='text-white whitespace-pre-wrap'>{JSON.stringify(state)}</pre>
      </div>
    </div>
  );
}
