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

function DataControllers() {
  const [currentUser, loading] = useAuthState(auth);
  const [minGameTimeRef, setGameTimeRef] = useState<number>(40);
  const [users, setUsers] = useState<Array<string>>([]);
  const [time, setTime] = useState<IStartEndTimes>({
    startTime: "10:00",
    endTime: {
      date: new Date().toString(),
      time: "00:00",
    },
  });

  useEffect(() => {
    console.log("time is:", time);
  }, [time]);

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
    time?.endTime.time,
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
    if (!currentUser) {
      toast.error("You need to be logged in to view current plan");
      Router.push("/auth/login");
      return;
    }
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

    if (planData!.length == 0) {
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
    }: any = planData![0];

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
      .select(
        `
      plan_id,
      plan_lsTimes
      `
      )
      .eq("plan_id", IdContext);

    let { plan_id, plan_lsTimes }: any = PlanData![0];

    const { data: UpdatedData, error: UpdatedError } = await supabase
      .from("user_plans")
      .update({ plan_lsTimes: JSON.stringify([...users]) })
      .eq("plan_id", plan_id);

    if (!UpdatedError) {
      toast.success("Updated Plan Succesfully");
    }
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

    if (inviteRef?.current?.value == "") {
      toast.warning("You need to enter a user to invite");
      return;
    }

    if (
      inviteRef?.current?.value == currentUser?.email ||
      inviteRef?.current?.value == currentUser?.displayName
    ) {
      toast.warning("You can't invite yourself to a plan");
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

    if (plan_authorizedUsers) {
      if (plan_authorizedUsers.includes(inviteRef?.current?.value)) {
        toast.warning(`User ${inviteRef.current?.value} is already authorized`);
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
      toast.success(`User ${inviteRef.current?.value} was invited`);
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

    toast.success(`User ${inviteRef.current?.value} was invited`);
  };

  const handleRemovePlayer = (val: string) => {
    const newUsers = users.filter((user, i) => user !== val);
    setUsers(newUsers);
  };
  useEffect(() => {
    if (!IdContext || IdContext == "create") return;
    if (loading) return;
    fetchPlanData();
  }, [loading]);

  return <div className='w-full flex items-center pt-16'></div>;
}

export default DataControllers;
