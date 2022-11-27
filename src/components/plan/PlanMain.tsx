import PlanFilter from "@comps/plan/PlanFilter";
import useFetchAuthorizedUsers from "@hooks/useFetchAuthorizedUsers";
import useFetchPlanData from "@hooks/useFetchPlanData";
import type { FilterData } from "@lstypes/types";
import { useRouter } from "next/router";
import { useEffect, useReducer } from "react";
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
        members: action.PAYLOAD.members,
        teams: action.PAYLOAD.teams,
        filterInputs: action.PAYLOAD.filterInputs,
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

  useEffect(() => {
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
  }, []);
  const {
    data: planData,
    error: planError,
    isLoading: planLoading,
    isFetching: planFetching,
  } = useFetchPlanData(router.query.plan_id as string);

  const {
    data: authorizedUsersData,
    error: authorizedUsersError,
    isLoading: authorizedUsersLoading,
    isFetching: authorizedUsersFetching,
  } = useFetchAuthorizedUsers(planData?.plan_authorizedUsers as string[]);

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
        <h1 className='text-red-700 text-2xl font-black'>
          {JSON.stringify(planData?.plan_authorizedUsers)}
        </h1>
      </div>
    </div>
  );
}
