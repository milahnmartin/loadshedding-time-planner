import PlanFilter from "@comps/plan/PlanFilter";
import type { FilterData } from "@lstypes/types";
import { useReducer } from "react";
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
  }
};
export default function PlanMain() {
  const [state, dispatch] = useReducer(handleReducer, {
    filter: true,
    members: ["bluevultra@gmail.com"],
    teams: ["bravado"],
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
    userLoadSheddingTimes: {},
    currentLoadSheddingStage: 0,
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
  return (
    <div className='w-full h-full relative'>
      {state.filter && (
        <PlanFilter
          members={state.members}
          teams={state.teams}
          onFilter={handleFilterChange}
        />
      )}
      <button
        className='p-4 bg-orange-400 text-black rounded-xl text-2xl font-Inter'
        onClick={() => dispatch({ TYPE: "TOGGLE_FILTER" })}
      >
        TOGGLE
      </button>
      <h1 className='text-white text-sm font-black'>{JSON.stringify(state)}</h1>
    </div>
  );
}
