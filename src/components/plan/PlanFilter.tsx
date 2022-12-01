import RedLabel from "@comps/labels/RedLabel";
import { Player } from "@lottiefiles/react-lottie-player";
import classNames from "classnames";
import { ChangeEvent, useRef, useState } from "react";
import { AiFillFilter } from "react-icons/ai";
import { toast } from "react-toastify";
import { v1 as uuidv1 } from "uuid";
import type { FilterTime, PlanFilterType } from "../../types/types";
const filterInputClassNames = classNames(
  "rounded-xl px-6 py-2 text-center bg-slate-500 text-white font-inter shadow-xl outline-none border-none focus:ring-2 focus:ring-cblue"
);

function PlanFilter({
  members,
  teams,
  filterSettings,
  onFilter,
  invitedData,
  removeUserCB,
}: PlanFilterType) {
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

  const inviteInputRef = useRef<HTMLInputElement>(null);

  const handleInviteMember = () => {
    const inviteInput = inviteInputRef.current?.value.trim();
    if (!inviteInput || inviteInput.length === 0) {
      toast.warning("Please enter a valid UUID or email");
      inviteInputRef.current?.focus();
      return;
    }
  };
  return (
    <div
      id='dashboard-filter'
      className='absolute flex p-1 right-0 h-[90vh] w-[40rem] bg-slate-600 rounded-sm'
    >
      <div className='flex flex-col h-full w-1/2'>
        <form
          onSubmit={handleFilterSubmit}
          className='flex flex-col space-y-2 w-full h-full justify-evenly px-2'
        >
          <input
            value={inputData.startDate}
            type='date'
            className={filterInputClassNames}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setInputData({ ...inputData, startDate: e.target.value })
            }
          />
          <input
            value={inputData.startTime}
            type='time'
            className={filterInputClassNames}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
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
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
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

        <div className='border-2 w-full h-full overflow-y-scroll justify-start flex flex-col p-2'>
          {members?.map((member: string) => (
            <RedLabel
              key={uuidv1()}
              args={false}
              data={member}
              cb={() => removeUserCB(member)}
            />
          ))}
        </div>
        <div className='border-2 w-full h-full overflow-y-scroll justify-start flex flex-col p-2'>
          {teams?.map((team: string) => (
            <RedLabel
              key={uuidv1()}
              args={true}
              data={team}
              cb={() => removeUserCB(team)}
            />
          ))}
        </div>
      </div>
      <div className='flex flex-col h-full w-1/2'>
        <div className='flex flex-col space-y-2 w-full h-full justify-evenly px-2'>
          <input
            type='text'
            className={filterInputClassNames}
            placeholder='invite Member via ID or Email'
            ref={inviteInputRef}
          />
          <button onClick={handleInviteMember}>SEND INVITE</button>
          <input
            type='text'
            className={filterInputClassNames}
            placeholder='Invite Team Via ID or Name'
          />
          <button>INVITE TEAM</button>
        </div>

        <div className='border-2 w-full h-full overflow-y-scroll justify-start flex flex-col p-2'>
          {invitedData?.invitedUsers?.map((member: string) => (
            <RedLabel
              key={uuidv1()}
              args={false}
              data={member}
              cb={() => console.log("YES")}
            />
          ))}
        </div>
        <div className='border-2 w-full h-full overflow-y-scroll justify-start flex flex-col p-2'>
          {invitedData?.invitedTeams?.map((team: string) => (
            <RedLabel
              key={uuidv1()}
              args={true}
              data={team}
              cb={() => console.log("REMOVED")}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default PlanFilter;
