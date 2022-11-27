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
    case "SET_LS_USERS_TIME":
      return {
        ...state,
        member_times: action.PAYLOAD,
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
  }
};
export default function PlanMain() {
  const router = useRouter();
  const [state, dispatch] = useReducer(handleReducer, {
    filter: true,
    member_times: [],
    team_times: [],
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

  const handleFilterChange = ({ members, teams, filterInputs }: FilterData) => {
    dispatch({
      TYPE: "SET_FILTER_DATA",
      PAYLOAD: {
        members,
        teams,
        filterInputs,
      },
    });
  };
  const {
    data: planData,
    error: planError,
    isLoading: planLoading,
    isFetching: planFetching,
  } = useFetchPlanData(router.query.plan_id as string);

  useEffect(() => {
    console.log("MOUNTED");
    (async () => {
      const res = await fetch("/api/sepush/status");
      const data = await res.json();
      dispatch({
        TYPE: "SET_LS_STAGE",
        PAYLOAD: {
          currentLoadSheddingStage: {
            capetown: data?.capetown?.stage,
            eskom: data?.eskom?.stage,
          },
        },
      });
    })();
    return () => {
      console.log("UNMOUNTED");
    };
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
        />
      )}

      <div className='flex flex-col h-full w-3/6'>
        <button
          className='p-4 bg-orange-400 text-black rounded-xl text-2xl font-Inter'
          onClick={() => dispatch({ TYPE: "TOGGLE_FILTER" })}
        >
          TOGGLE
        </button>
        <h1 className='text-white text-sm font-black'>{JSON.stringify(state)}</h1>
        <h1 className='text-orange-500 text-sm font-black'>{JSON.stringify(planData)}</h1>
      </div>
    </div>
  );
}
