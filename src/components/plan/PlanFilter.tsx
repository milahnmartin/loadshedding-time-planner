import RedLabel from "@comps/labels/RedLabel";
import { Player } from "@lottiefiles/react-lottie-player";
import classNames from "classnames";
import { useState } from "react";
import { AiFillFilter } from "react-icons/ai";
import { v1 as uuidv1 } from "uuid";
import type { FilterTime, PlanFilterType } from "../../types/types";
const filterInputClassNames = classNames(
  "rounded-xl px-6 py-2 text-center bg-slate-500 text-white font-inter shadow-xl outline-none border-none focus:ring-2 focus:ring-cblue"
);

type filterInputData = {
  startDate: string;
  startTime: string;
  endTime: string;
};

function PlanFilter({ members, teams, filterSettings, onFilter }: PlanFilterType) {
  const [filterbuttonText, setfilterbuttonText] = useState<boolean>(false);
  const [inputData, setInputData] = useState<FilterTime>({
    startDate: filterSettings?.startDate,
    startTime: filterSettings?.startTime,
    endTime: filterSettings?.endTime,
  } as FilterTime);

  const handleFilterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onFilter({
      members,
      teams,
      filterInputs: inputData,
    });
    setfilterbuttonText(true);
    setTimeout(() => {
      setfilterbuttonText(false);
    }, 2110);
  };

  const handleRemoveMember = (cmember: string) => {
    const newMembers = members.filter((member: string) => member !== cmember);
    onFilter({ members: newMembers, teams, filterInputs: inputData });
  };
  const handleRemoveTeam = (cteam: string) => {
    const newTeam = teams.filter((team: string) => team !== cteam);
    onFilter({ teams: newTeam, members, filterInputs: inputData });
  };
  return (
    <div
      id='dashboard-filter'
      className='absolute flex flex-col p-1 right-0 h-[90vh] w-[20rem] bg-slate-600 rounded-sm'
    >
      <div className='border-2 w-full h-full p-2 flex flex-col items-center'>
        <form
          onSubmit={handleFilterSubmit}
          className='flex flex-col space-y-2 w-full h-full justify-evenly'
        >
          <input
            value={inputData.startDate}
            type='date'
            className={filterInputClassNames}
            onChange={(e) => setInputData({ ...inputData, startDate: e.target.value })}
          />
          <input
            value={inputData.startTime}
            type='time'
            className={filterInputClassNames}
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
            className={filterInputClassNames}
            onChange={(e) =>
              setInputData({
                ...inputData,
                endTime: e.target.value,
              })
            }
          />
          <button
            title='Filter Plan'
            type='submit'
            className='relative flex items-center justify-center p-0.5 mb-2 mr-2 w-full h-[2.7rem] overflow-hidden text-sm font-black text-gray-900 rounded-xl group bg-gradient-to-br from-cpurple to-caqua  hover:text-white dark:text-white'
          >
            <div className='relative left-[6px] top-[.5px] transition-all group-hover:text-yellow-500  group-hover:animate-pulse'>
              {!filterbuttonText ? (
                <AiFillFilter />
              ) : (
                <Player
                  src='https://assets4.lottiefiles.com/packages/lf20_lk80fpsm.json'
                  className='h-8 w-8'
                  autoplay
                  speed={0.7}
                />
              )}
            </div>
          </button>
        </form>
      </div>
      <div className='border-2 w-full h-full overflow-y-scroll justify-start flex flex-col p-2'>
        {members?.map((member: string) => (
          <RedLabel key={uuidv1()} args={false} data={member} cb={handleRemoveMember} />
        ))}
      </div>
      <div className='border-2 w-full h-full overflow-y-scroll justify-start flex flex-col p-2'>
        {teams?.map((team: string) => (
          <RedLabel key={uuidv1()} args={true} data={team} cb={handleRemoveTeam} />
        ))}
      </div>
    </div>
  );
}

export default PlanFilter;
