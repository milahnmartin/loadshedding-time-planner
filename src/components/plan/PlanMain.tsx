import PlanFilter from "@comps/plan/PlanFilter";
import type { FilterData } from "@lstypes/types";
import { useReducer } from "react";
const handleReducer = (state: any, action: any) => {
  switch (action.TYPE) {
    case "TOGGLE_FILTER":
      return {
        ...state,
        filter: !state.filter,
      };
    case "SET_FILTER_DATA":
      return {
        ...state,
        members: action.payload.members,
        teams: action.payload.teams,
      };
  }
};
export default function PlanMain() {
  const [state, dispatch] = useReducer(handleReducer, {
    filter: true,
    members: ["bluevultra@gmail.com"],
    teams: ["bravado"],
  });

  const handleFilterChange = ({ members, teams }: FilterData) => {
    dispatch({
      TYPE: "SET_FILTER_DATA",
      payload: {
        members,
        teams,
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
      {JSON.stringify(state)}
    </div>
  );
}
