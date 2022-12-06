import RedLabel from "@comps/labels/RedLabel";
import { Player } from "@lottiefiles/react-lottie-player";
import type { FilterTime, IInviteData, PlanFilterType } from "@lstypes/types";
import { auth } from "@utils/firebase-config";
import supabase from "@utils/supabase-config";
import classNames from "classnames";
import { useRouter } from "next/router";
import { ChangeEvent, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { AiFillFilter } from "react-icons/ai";
import { toast } from "react-toastify";
import { v1 as uuidv1 } from "uuid";
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
  const [loggedInUser, loading] = useAuthState(auth);
  const [filterbuttonText, setfilterbuttonText] = useState<boolean>(false);
  const [inputData, setInputData] = useState<FilterTime>({
    startDate: filterSettings?.startDate,
    startTime: filterSettings?.startTime,
    endTime: filterSettings?.endTime,
  } as FilterTime);
  const router = useRouter();
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

  const configureUserInviteForInfo = async (invite_id: string) => {
    if (!invite_id) {
      toast.error("Could not find invite");
      return;
    }
    const { data: userData, error: userError } = await supabase
      .from("user_info")
      .select(`user_id,user_email,user_sepushID,user_plan_Invites,user_weekLSTimes`)
      .or(`user_id.eq.${invite_id},user_email.eq.${invite_id}`);

    if (userError) {
      toast.error("Something Went Wrong While Fetching User Info");
      return;
    }

    if (userData.length === 0) {
      toast.warning("User Does Not Exist");
      return;
    }

    const {
      user_id,
      user_email,
      user_sepushID,
      user_plan_Invites,
      user_weekLSTimes,
    }: any = userData[0];

    const userAlreadyInvited: boolean = user_plan_Invites.find((data: IInviteData) => {
      return data.plan_id === router.query.id;
    });

    if (userAlreadyInvited) {
      toast.warning("User Already Invited");
      return;
    }

    if (!user_sepushID) {
      toast.warning("User has not added their loadshedding area yet");
      return;
    }

    const { error: inviteError } = await supabase
      .from("user_info")
      .update({
        user_plan_Invites: [
          ...user_plan_Invites,
          {
            plan_id: router.query.id,
            invitedBy: [
              loggedInUser?.uid,
              loggedInUser?.email ? loggedInUser?.email : loggedInUser?.displayName,
            ],
          },
        ],
      })
      .eq("user_id", user_id);

    if (inviteError) {
      toast.error("Something Went Wrong While Inviting User");
      return;
    }

    const { error: planInvitedDataError } = await supabase
      .from("user_plans")
      .update({
        plan_InvitedData: [...invitedData!, user_id],
      })
      .eq("plan_id", router.query.plan_id);

    if (planInvitedDataError) {
      toast.error("Something Went Wrong While Inviting User");
      return;
    }

    toast.success("User Succesfully Invited");
  };

  const handleInviteMember = async () => {
    const inviteInput = inviteInputRef.current?.value.trim();
    if (!inviteInput || inviteInput.length === 0) {
      toast.warning("Please enter a valid UUID or email");
      inviteInputRef.current?.focus();
      return;
    }
    const plan_id = router.query.plan_id;
    if (!plan_id) {
      toast.error("The Plan ID Could not be found");
      return;
    }

    await configureUserInviteForInfo(inviteInput);
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
          {invitedData?.map((member: string) => (
            <RedLabel
              key={uuidv1()}
              args={false}
              data={member}
              cb={() => console.log("YES")}
            />
          ))}
        </div>
        <div className='border-2 w-full h-full overflow-y-scroll justify-start flex flex-col p-2'>
          {JSON.stringify(invitedData)}
        </div>
      </div>
    </div>
  );
}

export default PlanFilter;
