import RedLabel from "@comps/labels/RedLabel";
import { useState } from "react";
import { AiFillFilter } from "react-icons/ai";
import { v1 as uuidv1 } from "uuid";
import type { PlanFilterType } from "../../types/types";

type filterInputData = {
  startDate: string;
  startTime: string;
  endTime: string;
};

function PlanFilter({ members, teams, onFilter }: PlanFilterType) {
  const [inputData, setInputData] = useState<filterInputData>({
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
  });

  const handleFilterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onFilter({
      members,
      teams,
      filterInputs: inputData,
    });
  };

  const handleRemoveMember = (cmember: string) => {
    const newMembers = members.filter((member: string) => member !== cmember);
    onFilter({ members: newMembers, teams });
  };
  const handleRemoveTeam = (cteam: string) => {
    const newTeam = teams.filter((team: string) => team !== cteam);
    onFilter({ teams: newTeam, members });
  };
  return (
    <div
      id='dashboard-filter'
      className='absolute flex flex-col p-1 right-0 h-[90vh] w-[20rem] bg-slate-600 rounded-sm'
    >
      <div className='border-2 w-full h-full p-2 flex flex-col items-center'>
        <h1 className='w-full text-center tect-2xl font-black'>Date:</h1>
        <form
          onSubmit={handleFilterSubmit}
          className='flex flex-col space-y-2 border-2 w-full h-full justify-evenly'
        >
          <input
            value={inputData.startDate}
            type='date'
            className='rounded-xl px-4 py-2 text-center'
            onChange={(e) => setInputData({ ...inputData, startDate: e.target.value })}
          />
          <input
            value={inputData.startTime}
            type='time'
            className='rounded-xl px-4 py-2 text-center'
            onChange={(e) =>
              setInputData({
                ...inputData,
                startTime: e.target.value,
              })
            }
          />
          <input
            value={inputData.endTime}
            type='time'
            className='rounded-xl px-4 py-2 text-center'
            onChange={(e) =>
              setInputData({
                ...inputData,
                endTime: e.target.value,
              })
            }
          />
          <button
            type='submit'
            className='relative flex items-center justify-center p-0.5 mb-2 mr-2 w-full h-[2.7rem] overflow-hidden text-sm font-black text-gray-900 rounded-xl group bg-gradient-to-br from-cpurple to-caqua  hover:text-white dark:text-white'
          >
            <h1 className='group-hover:hidden'>APPLY</h1>
            <div className='relative left-[6px] top-[.5px] transition-all group-hover:text-yellow-500  group-hover:animate-pulse'>
              {<AiFillFilter />}
            </div>
          </button>
        </form>
      </div>
      <div className='border-2 w-full h-full flex flex-col items-center justify-start flex-wrap content-center'>
        <h1 className='text-center'>Members:</h1>
        {members?.map((member: string) => (
          <RedLabel key={uuidv1()} args={false} data={member} cb={handleRemoveMember} />
        ))}
      </div>
      <div className='border-2 w-full h-full flex flex-col items-center justify-start flex-wrap content-center'>
        <h1 className='text-center'>Teams:</h1>
        {teams?.map((team: string) => (
          <RedLabel key={uuidv1()} args={true} data={team} cb={handleRemoveTeam} />
        ))}
      </div>
    </div>
  );
}

export default PlanFilter;
