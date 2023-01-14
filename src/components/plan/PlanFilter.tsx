import RedLabel from "@comps/labels/RedLabel";
import type { FilterTime, IInviteData, PlanFilterType } from "@lstypes/types";
import { auth } from "@utils/firebase-config";
import supabase from "@utils/supabase-config";
import classNames from "classnames";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { BsFilterCircle } from "react-icons/bs";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import { v1 as uuidv1 } from "uuid";
enum LabelType {
  authorized,
  invited,
  invitedPending,
}
const filterInputClassNames = classNames(
  "w-full rounded-lg px-6 py-2 text-center bg-slate-800 text-white  font-satoshi shadow-xl outline-none border-none "
);

const filterInputTextClassNames = classNames(
  "w-full rounded-lg px-6 py-2 text-center bg-slate-800 text-white  font-satoshi shadow-xl outline-none border-none "
);

function PlanFilter({
  members,
  teams,
  filterSettings,
  onFilter,
  invitedData,
  removeUserCB,
  refetchPlanData,
  toggleFilter,
  filterVisible,
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
      toggleFilter!(false);
    }, 2110);
  };

  const inviteInputRef = useRef<HTMLInputElement>(null);

  const configureUserInviteForInfo = async (invite_id: string) => {
    if (!invite_id) {
      toast.error("Error Occured When Trying To Invite, no invite id");
      return;
    }
    const { data: userData, error: userError } = await supabase
      .from("user_info")
      .select(`user_id,user_email,user_sepushID,user_plan_Invites,user_weekLSTimes`)
      .or(`user_id.eq.${invite_id},user_email.eq.${invite_id}`);

    if (loggedInUser?.uid === userData![0]?.user_id) {
      toast.warning("You Cannot Invite Yourself");
      inviteInputRef!.current!.focus();
      inviteInputRef!.current!.value = "";
      return;
    }
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

    const userAlreadyInvited: boolean = user_plan_Invites.some(
      (data: IInviteData) => data.plan_id === router.query.plan_id
    );

    if (userAlreadyInvited) {
      toast.warning("User Already Invited");
      inviteInputRef!.current!.focus();
      return;
    }

    if (!user_sepushID) {
      toast.warning(
        `${user_email} has not linked their loadshedding area yet ! This Can be Done in Profile Settings.`,
        {
          autoClose: 10000,
        }
      );
      inviteInputRef!.current!.focus();
      inviteInputRef!.current!.value = "";
      return;
    }

    const { error: inviteError } = await supabase
      .from("user_info")
      .update({
        user_plan_Invites: [
          ...user_plan_Invites,
          {
            plan_id: router.query.plan_id,
            invitedBy: [
              loggedInUser?.uid,
              //todo check if works
              loggedInUser?.email ?? loggedInUser?.displayName,
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
    await refetchPlanData!();
    inviteInputRef!.current!.value = "";
  };

  const handleInviteMember = async (e: FormEvent) => {
    e.preventDefault();
    const plan_id = router.query.plan_id;
    if (!plan_id) {
      toast.error("The Plan ID Could not be found");
      return;
    }
    const inviteInput = inviteInputRef.current?.value.trim();
    if (!inviteInput || inviteInput.length === 0) {
      toast.warning("Please enter a valid UUID or email");
      inviteInputRef.current?.focus();
      return;
    }
    await configureUserInviteForInfo(inviteInput);
  };

  const filterClassnames = classNames(
    "absolute flex p-1 right-0 h-[90vh] w-1/2 bg-slate-700 rounded-sm"
  );

  return (
    <div id='dashboard-filter' className={filterClassnames}>
      <div className='flex flex-col h-full w-1/2 '>
        <form
          onSubmit={handleFilterSubmit}
          className='flex flex-col space-y-2 w-full h-full justify-evenly px-2'
        >
          <div className='text-base rounded-xl w-full h-fit bg-gradient-to-r p-[4px] from-[#6EE7B7] via-[#3B82F6] to-[#9333EA]'>
            <input
              value={inputData.startDate}
              type='date'
              className={filterInputClassNames}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const maxLimitDate = new Date().getDate() + 7;
                const minLimitDate = new Date().getDate();
                const setDate = new Date(e.target.value).getDate();
                if (setDate >= maxLimitDate || setDate < minLimitDate) {
                  toast.error("You can only filter for a week ahead");
                  return;
                }
                setInputData({ ...inputData, startDate: e.target.value });
              }}
            />
          </div>

          <div className='text-base rounded-xl w-full h-fit bg-gradient-to-r p-[4px] from-[#6EE7B7] via-[#3B82F6] to-[#9333EA]'>
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
          </div>
          <div className='text-base rounded-xl w-full h-fit bg-gradient-to-r p-[4px] from-[#6EE7B7] via-[#3B82F6] to-[#9333EA]'>
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
          </div>

          <button
            title='Filter Plan'
            type='submit'
            className='relative inline-flex font-satoshiBold items-center justify-evenly p-0.5 mb-2 mr-2 w-full h-[3rem] overflow-hidden text-sm font-black text-gray-900 rounded-lg group bg-gradient-to-br from-[#6EE7B7] via-[#3B82F6] to-[#9333EA]  hover:text-white dark:text-white '
          >
            <div className='relative left-[6px] top-[.5px] transition-all group-hover:text-slate-800  '>
              {!filterbuttonText ? (
                <span className='flex items-center gap-2 text-base'>
                  <BsFilterCircle className='text-lg' /> FILTER
                </span>
              ) : (
                <span className='flex items-center gap-1 text-lime-500 text-base'>
                  <IoCheckmarkDoneCircleOutline fill='green' size={30} /> APPLIED
                </span>
              )}
            </div>
          </button>
        </form>

        <div className='border-2 w-full h-full overflow-y-scroll justify-start flex flex-col p-2'>
          {members?.map((member: string) => (
            <RedLabel
              key={uuidv1()}
              args={LabelType?.authorized}
              data={member}
              cb={() => removeUserCB(member)}
            />
          ))}
        </div>
        <div className='border-2 w-full h-full overflow-y-scroll justify-start flex flex-col p-2'>
          {teams?.map((team: string) => (
            <RedLabel
              key={uuidv1()}
              args={LabelType?.authorized}
              data={team}
              cb={() => removeUserCB(team)}
            />
          ))}
        </div>
      </div>
      <div className='flex flex-col h-full w-1/2 '>
        <div className='flex flex-col space-y-2 w-full h-full justify-evenly px-2 '>
          <div className='text-base rounded-xl w-full h-fit bg-gradient-to-r p-[4px] from-[#6EE7B7] via-[#3B82F6] to-[#9333EA]'>
            <form onSubmit={handleInviteMember}>
              <input
                type='text'
                className={filterInputTextClassNames}
                placeholder='Invite Member via ID or Email'
                ref={inviteInputRef}
              />
            </form>
          </div>

          <button
            onClick={handleInviteMember}
            className='px-1 relative flex items-center justify-center  w-[100%] h-[3rem] text-sm font-black text-gray-900 rounded-xl group bg-gradient-to-br from-[#6EE7B7] via-[#3B82F6] to-[#9333EA] group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white '
          >
            <span className='relative px-5 py-2.5 group-hover:px-0 transition-all ease-in duration-200 w-[100%] h-[2.5rem] bg-white dark:bg-slate-800 rounded-lg group-hover:bg-opacity-0'>
              <span className='font-satoshiBlack'>SEND INVITE</span>
            </span>
          </button>
          <div className='text-base rounded-xl w-full h-fit bg-gradient-to-r p-[4px] from-[#6EE7B7] via-[#3B82F6] to-[#9333EA]'>
            <input
              type='text'
              className={filterInputTextClassNames}
              placeholder='Invite Team Via ID or Name'
            />
          </div>

          <button
            className='px-1 relative flex items-center justify-center  w-[100%] h-[3rem] text-sm font-black text-gray-900 rounded-xl group bg-gradient-to-br from-[#6EE7B7] via-[#3B82F6] to-[#9333EA] group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white '
            onClick={async () => await refetchPlanData!()}
          >
            <span className='relative px-5 py-2.5 group-hover:px-0 transition-all ease-in duration-200 w-[100%] h-[2.5rem] bg-white dark:bg-slate-800 rounded-lg group-hover:bg-opacity-0'>
              <span className='font-satoshiBlack'>RESFRESH PLAN</span>
            </span>
          </button>
        </div>

        <div className='border-2 w-full h-full overflow-y-scroll justify-start flex flex-col p-2'>
          {invitedData?.map((member: string) => (
            <RedLabel
              key={uuidv1()}
              args={LabelType.invited}
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
