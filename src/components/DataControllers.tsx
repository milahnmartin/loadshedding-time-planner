import Router from "next/router";
import { useContext, useEffect, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import TimeCalculations from "../helpers/TimeCalculations.module";
import { GameidContext } from "../pages/plan/[id]";
import type { IStartEndTimes } from "../types/types";
import { auth } from "../utils/firebase-config";
import supabase from "../utils/supabase-config";
import GreenLabel from "./GreenLabel";
import RedLabel from "./RedLabel";

function DataControllers() {
  const [currentUser, loading] = useAuthState(auth);
  const [minGameTimeRef, setGameTimeRef] = useState<number>(40);
  const [users, setUsers] = useState<Array<string>>([]);
  const [time, setTime] = useState<IStartEndTimes>({
    startTime: "10:00",
    endTime: "00:00",
  });

  const IdContext = useContext(GameidContext);
  const inputRef = useRef<HTMLInputElement>(null);
  const inviteRef = useRef<HTMLInputElement>(null);

  const StartTimeCalc = TimeCalculations.getInitialStartTime(
    users,
    time?.startTime,
    minGameTimeRef
  );
  const InbetweenTimeCalc = TimeCalculations.getInbetweenTimes(
    users,
    minGameTimeRef
  );
  const EndTimesCalc = TimeCalculations.getInitialEndTimes(
    users,
    time?.endTime,
    minGameTimeRef
  );
  const fetchUserInfo = async () => {
    const { data: userData, error: UserError } = await supabase
      .from("user_info")
      .select()
      .eq("user_id", currentUser?.uid);

    if (UserError) {
      toast.error("Something Went Wrong..");
      return [];
    }
    return userData;
  };

  const handleInvalidGame = () => {
    toast.error("Game ID is invalid or not Authorized");
  };

  const fetchPlanData = async () => {
    const { data: planData, error: planError } = await supabase
      .from("user_plans")
      .select(
        `plan_id,plan_lsTimes,plan_authorizedUsers,user_id,plan_authorizedTeams`
      )
      .eq("plan_id", IdContext);

    if (planError) {
      console.log(planError);
      return;
    }

    if (planData.length == 0) {
      toast.error("Plan Doesn't Exist, Create a new one");
      Router.push("/plan/create");
      return;
    }
    let {
      plan_id,
      plan_lsTimes,
      plan_authorizedUsers,
      user_id,
      plan_authorizedTeams,
    }: any = planData[0];

    plan_lsTimes = JSON.parse(plan_lsTimes);
    plan_authorizedUsers = JSON.parse(plan_authorizedUsers);
    plan_authorizedTeams = JSON.parse(plan_authorizedTeams);

    if (user_id == currentUser?.uid) {
      setUsers(plan_lsTimes);
      return;
    }
    if (!plan_authorizedUsers) {
      toast.error("You are not authorized to view this plan");
      Router.push("/plans");
      return;
    }

    if (plan_authorizedUsers.includes(currentUser?.email)) {
      setUsers(plan_lsTimes);
      return;
    }
    toast.error("You are not authorized to view this plan");
    Router.push("/plans");
  };

  const saveToDatabaseRef = async () => {
    if (!currentUser || loading) {
      toast.error("You need to be logged in to save a game");
      Router.push("/auth/login");
      return;
    }
    const { data: PlanData, error: PlanError } = await supabase
      .from("user_plans")
      .select()
      .eq("plan_id", IdContext);

    const currentlsTimes = PlanData;
    console.log(currentlsTimes);
  };

  const saveToDatabaseCreate = async () => {
    if (!currentUser || loading) {
      toast.error("You need to be logged in to save a game");
      Router.push("/auth/login");
      return;
    }

    const userData = await fetchUserInfo();

    if (userData!.length === 0) {
      const { error: AccountCreateError } = await supabase
        .from("user_info")
        .insert({
          user_id: currentUser?.uid,
          user_email: currentUser?.email
            ? currentUser?.email
            : currentUser?.displayName,
        })
        .select("user_id");
      if (AccountCreateError) {
        toast.error("User Info didn't Save Correctly");
        return;
      }
    }
    if (users.length == 0) {
      toast.warning("You need to add at least one time slot");
      return;
    }
    const { error: PlanInserterror } = await supabase.from("user_plans").insert({
      plan_id: uuidv4(),
      user_id: currentUser?.uid,
      plan_lsTimes: JSON.stringify([...users]),
    });

    if (PlanInserterror) {
      toast.error("Plan Failed to Save Correctly...");
      return;
    }

    toast.success("Plan Saved Successfully");
  };

  const handleAddPlayer = () => {
    const name = inputRef.current?.value;
    if (!name) return;
    const parsedNames = name.split(",");
    setUsers((prev): any => {
      if (!prev.length) return [...parsedNames];
      return [...prev, ...parsedNames];
    });
    inputRef.current!.value = "";
  };

  const inviteUserToPlan = async () => {
    if (!currentUser || loading) {
      toast.error("You need to be logged in to add users to plans");
      Router.push("/auth/login");
      return;
    }

    const { data: PlanData, error: PlanError } = await supabase
      .from("user_plans")
      .select(
        `
        plan_authorizedUsers,plan_authorizedTeams
      `
      )
      .eq("plan_id", IdContext);

    let { plan_authorizedUsers, plan_authorizedTeams }: any = PlanData![0];
    plan_authorizedUsers = JSON.parse(plan_authorizedUsers);
    plan_authorizedTeams = JSON.parse(plan_authorizedTeams);

    if (inviteRef?.current?.value == "") {
      toast.warning("You need to enter a user to invite");
      return;
    }

    if (plan_authorizedUsers) {
      if (plan_authorizedUsers.includes(inviteRef?.current?.value)) {
        toast.warning(
          `User ${
            currentUser?.email || currentUser?.displayName
          } is already authorized`
        );
        return;
      }

      const { error: PlanInviteError } = await supabase
        .from("user_plans")
        .update({
          plan_authorizedUsers: JSON.stringify([
            ...plan_authorizedUsers,
            inviteRef?.current?.value,
          ]),
        })
        .eq("plan_id", IdContext);
      if (PlanInviteError) {
        toast.error("Something went wrong while inviting user");
        return;
      }
      return;
    }

    const { error: PlanInviteError } = await supabase
      .from("user_plans")
      .update({
        plan_authorizedUsers: JSON.stringify([inviteRef?.current?.value]),
      })
      .eq("plan_id", IdContext);
    if (PlanInviteError) {
      toast.error("Something went wrong while inviting user");
      return;
    }

    toast.success("User Invited Successfully");
  };

  const handleRemovePlayer = (val: string) => {
    const newUsers = users.filter((user, i) => user !== val);
    setUsers(newUsers);
  };
  useEffect(() => {
    if (!IdContext || IdContext == "create") return;
    if (!currentUser || loading) return;
    fetchPlanData();
  }, [loading]);

  return (
    <div className='w-full flex items-center pt-16'>
      <div className='flex flex-col space-y-8 items-center align-center justify-center w-[50%] p-2'>
        <h1 className='text-white text-2xl tracking-widest font-roboto'>
          LS Times Added:{" "}
          <span className='text-transparent animate-pulse bg-clip-text bg-gradient-to-r from-red-700 via-purple-700 to-primary text-2xl font-extrabold underline'>
            {users.length}
          </span>
        </h1>
        <label className='text-2xl text-white font-roboto font-extralight'>
          Start Time
        </label>
        <input
          onChange={(e) =>
            setTime({ endTime: time.endTime, startTime: e.currentTarget.value })
          }
          className='text-center py-2 px-4 outline-none focus:ring-4 focus:ring-primary rounded-sm bg-white w-fit font-robot font-bold'
          type='time'
          value={time.startTime}
          required
        />
        <label className='text-2xl text-white font-roboto font-extralight'>
          End Time
        </label>
        <input
          onChange={(e) =>
            setTime({ startTime: time.startTime, endTime: e.currentTarget.value })
          }
          className='py-2 px-4 outline-none focus:ring-4 focus:ring-primary rounded-sm bg-white w-fit font-robot font-bold'
          type='time'
          value={time.endTime}
          required
        />
        <label className='text-2xl text-white font-roboto font-extralight'>
          Min Game Time (min)
        </label>
        <input
          onChange={(e) => setGameTimeRef(Number(e.currentTarget.value))}
          className='py-2 px-4 rounded-md font-roboto font-bold text-center outline-none focus:ring-4 focus:ring-primary'
          type='number'
          value={minGameTimeRef}
        />
        <input
          placeholder='Enter Loadshedding Schedule eg. 13:00-15:00, 17:00-19:00'
          className='text-black font-roboto rounded px-2 py-1 w-[60%] outline-none focus:ring-4 focus:ring-tersier'
          type='text'
          id='loadsheddingdata'
          name='loadsheddingdata'
          ref={inputRef}
          required
        />

        <button
          onClick={handleAddPlayer}
          className='px-5 py-3 text-white bg-gradient-to-r from-purple-700 to-red-700 rounded hover:from-red-700 hover:to-purple-700'
        >
          Add Player Time
        </button>
      </div>
      <div className='w-[50%] h-full flex flex-col items-center justify-start px-5'>
        <div className='flex items-center justify-start flex-col w-full h-[50%]'>
          <h1 className='text-red-600 underline font-roboto font-extrabold text-2xl'>
            LOADSHEDDING TIMES:
          </h1>
          <div
            id='bubbled-red-label-container'
            className='flex flex-wrap justify-center items-center space-x-6 py-5'
          >
            {users.length > 0 &&
              TimeCalculations.sortLoadSheddingTime(users).map((item, index) => (
                <RedLabel data={item} key={uuidv4()} cb={handleRemovePlayer} />
              ))}
          </div>
        </div>
        <div className='flex items-center justify-start flex-col w-full h-[50%]'>
          <h1 className='text-lime-400 underline font-roboto font-extrabold text-2xl mb-2'>
            AVAILIBLE TIMES
          </h1>
          <div className='flex flex-wrap justify-center items-center space-x-6 py-5'>
            {users.length > 0 && StartTimeCalc && (
              <GreenLabel data={StartTimeCalc} />
            )}
            {users.length > 0 &&
              InbetweenTimeCalc.map((item) => {
                return <GreenLabel key={uuidv4()} data={item} />;
              })}
            {users.length > 0 && EndTimesCalc && <GreenLabel data={EndTimesCalc} />}
          </div>
          <button
            onClick={
              IdContext == "create" ? saveToDatabaseCreate : saveToDatabaseRef
            }
            className='px-5 py-3 text-white bg-gradient-to-r from-purple-700 to-red-700 rounded hover:from-red-700 hover:to-purple-700'
          >
            SAVE TO CLOUD
          </button>
          <input
            ref={inviteRef}
            type='text'
            placeholder='Enter Invite Email'
            className='text-black font-roboto rounded px-2 py-1 w-[60%] outline-none focus:ring-4 focus:ring-tersier mt-10'
          />
          <button
            disabled={IdContext == "create"}
            onClick={inviteUserToPlan}
            className='px-5 py-3 text-white bg-gradient-to-r from-purple-700 to-red-700 rounded hover:from-red-700 hover:to-purple-700 mt-5'
          >
            invite User
          </button>
        </div>
      </div>
    </div>
  );
}

export default DataControllers;
