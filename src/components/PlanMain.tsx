import TimeCalculations from "@helpers/TimeCalculations.module";
import classNames from "classnames";
import { useRouter } from "next/router";
import { useEffect, useMemo, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { toast } from "react-toastify";
import useFetchPlanData from "../hooks/useFetchPlanData";
import type { IStartEndTimes } from "../types/types";
import { auth } from "../utils/firebase-config";
import supabase from "../utils/supabase-config";
import GreenLabel from "./GreenLabel";
import RedLabel from "./RedLabel";
type PlanProps = {
  planData: any;
};
const enum MyVariant {
  ls = "ls",
  availible = "availible",
  buffer = "buffer",
}

const inputStyles = classNames(
  "appearance-none bg-transparent border-none w-full pt-4 pb-1 text-gray-400 text-center font-bold font-Inter focus:outline-none focus:text-blue-600 "
);
const gline = classNames(
  " w-[90%] h-[0.25rem] bg-gradient-to-r from-[#6EE7B7] via-[#3B82F6] to-[#9333EA] rounded border-0 "
);

const custom_h1 = classNames(
  "text-center flex items-center text-white font-black font-Inter text-xl pt-4 "
);
const loadedPlanStyles = classNames(
  "w-full h-[90%] grid grid-cols-1 grid-rows-4 md:grid-cols-2 md:grid-rows-2"
);
const unLoadedPlanStyles = classNames("w-full h-[90%] flex items-center justify-center");

function PlanMain() {
  const [loggedUser, loading] = useAuthState(auth);
  // useRouter Hook
  const router = useRouter();
  const { plan_id } = router.query;
  const { data: planData, isError, isFetching } = useFetchPlanData(plan_id as string);

  // useState Hooks
  const [minPlanTimeRef, setMinPlanTimeRef] = useState<number>(40);
  const [users, setUsers] = useState<Array<string>>([]);
  const [teams, setTeams] = useState<Array<string>>([]);
  const [lstimes, setlstimes] = useState<any>([]);
  const [time, setTime] = useState<IStartEndTimes>({
    startTime: {
      date: new Date().toISOString().split("T")[0] as string,
      time: "10:00",
    },
    endTime: {
      date: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate(),
        new Date().getHours() + 24
      )
        .toISOString()
        .split("T")[0] as string,
      time: "02:00",
    },
  });

  useEffect(() => {
    if (isFetching) return;
    if (planData) {
      setUsers((prev: string[]) => [...prev, ...planData.plan_authorizedUsers]);
      setTeams(planData.plan_authorizedTeams);
      setlstimes(planData.plan_lsTimes);
    }
  }, [isFetching]);

  useEffect(() => {
    if (loading || !loggedUser) return;
    addCurrentLoggedInUser(loggedUser.email ? loggedUser.email : loggedUser.displayName!);
  }, [loading]);
  // useRef Hooks
  const userRefAdd = useRef<HTMLInputElement>(null);
  const teamRefAdd = useRef<HTMLInputElement>(null);
  const inviteRef = useRef<HTMLInputElement>(null);

  const handleRemoveUser = (val: string) => {
    const newUsers = users.filter((user, i) => user !== val);
    setUsers(newUsers);
    const newLsTimes = lstimes.filter((owner: { user: string; times: string[] }): any => {
      return owner.user !== val;
    });
    setlstimes(newLsTimes);
  };
  const handleRemoveTeam = (val: string) => {
    const newTeams = teams.filter((team, i) => team !== val);
    setTeams(newTeams);
  };
  const handleAddUsers = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userRefAdd?.current?.value.trim()) {
      toast.warning("Nothing Was Entered");
      return;
    }

    const inputRef = userRefAdd.current.value.trim();

    const splitedNewUsers = inputRef?.trim().toLowerCase();

    userRefAdd.current.value = "";
    const { data, error } = await supabase
      .from("user_info")
      .select("user_sepushID->id")
      .or(`user_id.eq.${inputRef},user_email.eq.${inputRef.toLowerCase()}`);

    if (error) {
      console.log(error);
      return;
    }
    if (data.length === 0) {
      toast.error("No User Found");
      return;
    }
    const { id }: any = data[0];

    if (!id) {
      toast.warning("User has not linked their loadshedding area yet");
      return;
    }
    const newUsers = Array.from(new Set([...users, splitedNewUsers]));
    setUsers(newUsers);

    const fetchedUserTimes = await fetch(`/api/sepush/${id}/${time.startTime.date}}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const jsonedUserTimes = await fetchedUserTimes.json();
    const currentLoasheddingStage = jsonedUserTimes.currentStage;
    const loadsheddingData = jsonedUserTimes.lsdata;
    // const specifiedStartDateTimes = loadsheddingData.filter(
    //   (day: { date: string; name: string; stages: string[][]; stage: string }) => {
    //     return day.date === time.startTime.date;
    //   }
    // )[0];
    // const specifiedEndDateTimes = loadsheddingData.filter(
    //   (day: { date: string; name: string; stages: string[][]; stage: string }) => {
    //     return day.date === time.endTime.date;
    //   }
    // )[0];
    // setlstimes((prev: any) => [
    //   ...prev,
    //   {
    //     user: inputRef,
    //     times: [...specifiedStartDateTimes.stages[currentLoasheddingStage - 1]],
    //   },
    // ]);
  };

  const handleAddTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamRefAdd?.current?.value.trim()) {
      toast.warning("Nothing Was Entered");
      return;
    }

    const splittedNewTeams = teamRefAdd.current.value?.trim().toLowerCase().split(",");
    const newTeams = Array.from(new Set([...teams, ...splittedNewTeams]));
    setTeams(newTeams);
    teamRefAdd.current.value = "";
  };

  const memoCalcTimes = useMemo(
    () =>
      TimeCalculations.calcAllTimes(
        lstimes,
        time.startTime.time,
        time.endTime.time,
        minPlanTimeRef,
        time.endTime.date
      ),
    [lstimes, teams, time, minPlanTimeRef]
  );

  const memoDeconstructTimes = useMemo(() => {
    const times = [];
    for (let info of lstimes) {
      times.push(...info.times);
    }
    return TimeCalculations.sortLoadSheddingTime(times);
  }, [lstimes]);

  const addCurrentLoggedInUser = async (user: string) => {
    const { data, error } = await supabase
      .from("user_info")
      .select("user_sepushID->id")
      .or(`user_id.eq.${user},user_email.eq.${user.toLowerCase()}`);

    if (error) {
      console.log(error);
      return;
    }
    if (data.length === 0) {
      toast.error("No User Found");
      return;
    }
    const { id }: any = data[0];

    if (!id) {
      toast.warning("You have not linked your loadshedding area yet");
      return;
    }
    const newUsers = Array.from(new Set([...users, user]));
    setUsers(newUsers);

    const fetchedUserTimes = await fetch(`/api/sepush/${id}/${time.startTime.date}}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const jsonedUserTimes = await fetchedUserTimes.json();
    const currentLoasheddingStage = jsonedUserTimes.currentStage;
    const loadsheddingData = jsonedUserTimes.lsdata;
    console.log("CALLED FROM ADD CURRENT LOGGED IN USER");
    console.log(loadsheddingData);

    const specifiedStartDateTimes = loadsheddingData.filter(
      (day: { date: string; name: string; stages: string[][] }) => {
        return day.date === time.startTime.date;
      }
    )[0];
    const specifiedEndDateTimes = loadsheddingData.filter(
      (day: { date: string; name: string; stages: string[][]; stage: string }) => {
        return day.date === time.endTime.date;
      }
    )[0];
    setlstimes((prev: any) => [
      ...prev,
      {
        user: user,
        times: [...specifiedStartDateTimes.stages[currentLoasheddingStage - 1]],
      },
    ]);
  };

  return (
    <div className='w-full h-[90%] flex flex-col md:flex-row'>
      <div className='w-full h-full md:w-1/2'>
        <div className='w-full h-[50%] flex flex-col justify-start items-center p-2 '>
          <h1 className='text-white h-fit text-center pt-5 pb-6 w-full font-Inter font-bold text-4xl'>
            PLAN SETTINGS
          </h1>
          <section className='flex p-2 w-full h-full'>
            <div className='w-1/2 h-full px-2 flex flex-col items-center justify-start space-y-0'>
              <h1 className={custom_h1}>
                Start Plan Date:
                <span
                  className='ml-2 animation-all duration-300 hover:text-cblue cursor-pointer'
                  title='What Day Are You Planning To Start ?'
                >
                  <AiOutlineInfoCircle />
                </span>
              </h1>
              <input
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setTime({
                    ...time,
                    startTime: {
                      time: time.startTime.time,
                      date: e.currentTarget.value,
                    },
                  })
                }
                value={time.startTime.date}
                className={inputStyles}
                type='date'
              />
              <hr className={gline} />
              <h1 className={custom_h1}>
                End Plan Date:
                <span
                  className='ml-2 animation-all duration-300 hover:text-cblue cursor-pointer'
                  title='What Day Are You Planning To End ?'
                >
                  <AiOutlineInfoCircle />
                </span>
              </h1>
              <input
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setTime({
                    ...time,
                    endTime: {
                      ...time.endTime,
                      date: e.currentTarget.value,
                    },
                  })
                }
                value={time.endTime.date}
                className={inputStyles}
                type='date'
              />
              <hr className={gline} />
              <h1 className={custom_h1}>
                Min Plan Time
                <span
                  className='ml-2 animation-all duration-300 hover:text-cblue cursor-pointer'
                  title='How Long Must The Min Plan Time be'
                >
                  <AiOutlineInfoCircle />
                </span>
              </h1>
              <input
                value={minPlanTimeRef}
                onChange={(e) => {
                  if (!e.target.value) return;
                  if (+e.target.value < 1) {
                    setMinPlanTimeRef(1);
                    return;
                  }
                  setMinPlanTimeRef(+e.currentTarget.value);
                }}
                className={inputStyles}
                type='number'
              />
              <hr className={gline} />
            </div>
            <div className='w-1/2 h-full px-2 flex flex-col items-center justify-start '>
              <h1 className={custom_h1}>
                Start Time:
                <span
                  className='ml-2 animation-all duration-300 hover:text-cblue cursor-pointer'
                  title='Start Time For Plan'
                >
                  <AiOutlineInfoCircle />
                </span>
              </h1>
              <input
                value={time.startTime.time}
                onChange={(e) => {
                  if (!e.currentTarget.value) return;
                  setTime({
                    ...time,
                    startTime: {
                      ...time.startTime,
                      time: e.currentTarget.value,
                    },
                  });
                }}
                className={inputStyles}
                type='time'
              />
              <hr className={gline} />
              <h1 className={custom_h1}>
                End Time:
                <span
                  className='ml-2 animation-all duration-300 hover:text-cblue cursor-pointer'
                  title='End Time For Plan'
                >
                  <AiOutlineInfoCircle />
                </span>
              </h1>
              <input
                value={time.endTime.time}
                onChange={(e) => {
                  if (!e.currentTarget.value) return;
                  setTime({
                    ...time,
                    endTime: {
                      date: time.endTime.date,
                      time: e.currentTarget.value,
                    },
                  });
                }}
                className={inputStyles}
                type='time'
              />
              <hr className={gline} />
            </div>
          </section>
        </div>
        <div className='w-full h-[50%] flex p-2 overflow-y-scroll overflow-x-hidden '>
          <div className='w-1/2 h-full p-2 flex flex-col items-center '>
            <h1 className={custom_h1}>Add Team:</h1>
            <form onSubmit={handleAddTeam} className='flex flex-col items-center w-full '>
              <input
                placeholder='Bravado, Nixuh etc...'
                ref={teamRefAdd}
                className={inputStyles}
                type='text'
              />
              <hr className={gline} />
              <button className='relative inline-flex items-center justify-center p-0.5 mt-4 mb-2 mr-2 w-[10rem] h-[2.5rem] overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cpurple to-caqua  hover:text-white dark:text-white '>
                ADD TEAM
              </button>
            </form>
            <div className='h-full w-full flex flex-wrap content-center justify-center items-center gap-1 '>
              {teams.map((team: string) => {
                return (
                  <RedLabel key={team} args={true} data={team} cb={handleRemoveTeam} />
                );
              })}
            </div>
          </div>
          <div className='w-1/2 h-full p-2 flex flex-col items-center '>
            <h1 className={custom_h1}>Add User:</h1>
            <form
              onSubmit={handleAddUsers}
              className='flex flex-col w-full items-center '
            >
              <input
                placeholder='ultrafy@gmail.com, id etc...'
                ref={userRefAdd}
                className={inputStyles}
                type='text'
              />
              <hr className={gline} />
              <button
                type='submit'
                className='relative inline-flex items-center justify-center p-0.5 mt-4 mb-2 mr-2 w-[10rem] h-[2.5rem] overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cpurple to-caqua  hover:text-white dark:text-white '
              >
                ADD USER
              </button>
            </form>
            <div className='h-full w-full flex flex-wrap content-center justify-center items-center gap-1 '>
              {/* THE LS TIMES WILL COME HERE */}
              {users.map((user: string) => {
                return (
                  <RedLabel key={user} args={false} data={user} cb={handleRemoveUser} />
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className='w-full h-full border-sky-500 border-0 flexs flex-col p-2 md:w-1/2'>
        {/* ls times */}
        <div className='w-full h-1/3 flex flex-col items-center justify-start'>
          <h1 className='text-white font-bold text-2xl flex items-center pt-5'>
            LS TIMES:{" "}
            <span
              className='ml-2 animation-all duration-300 hover:text-cblue cursor-pointer relative top-[1px]'
              data-title={`All Added Users Loadshedding Times for ${time.startTime.date} - ${time.endTime.date}`}
            >
              <AiOutlineInfoCircle />
            </span>
          </h1>

          <div className='flex gap-1 pt-2 text-white'>
            {memoDeconstructTimes.map((time: string) => {
              return <GreenLabel variant='ls' data={time} key={time} />;
            })}
          </div>
        </div>
        {/* def availible times */}
        <div className='w-full h-1/3 flex flex-col items-center justify-start'>
          <h1 className='text-white font-bold text-2xl flex items-center h-fit'>
            AVAILABLE TIMES:
            <span
              className='ml-2 animation-all duration-300 hover:text-cblue cursor-pointer relative top-[1px]'
              data-title={`All Available Times for ${time.startTime.date} - ${time.endTime.date}`}
            >
              <AiOutlineInfoCircle />
            </span>
          </h1>
          <div className='flex gap-1 pt-2'>
            {memoCalcTimes[0]?.map((time: string) => {
              return (
                time && (
                  <GreenLabel variant={MyVariant.availible} key={time} data={time} />
                )
              );
            })}
          </div>
        </div>
        {/* buffer slot times (30min) */}
        <div className='w-full h-1/3 flex flex-col items-center justify-start'>
          <h1 className='text-white font-bold text-2xl flex items-center'>
            BUFFER TIMES:
            <span
              className='ml-2 animation-all duration-300 hover:text-cblue cursor-pointer relative top-[1px]'
              data-title={`30 Minutes Before and After Each Available Time Removed`}
            >
              <AiOutlineInfoCircle />
            </span>
          </h1>
          <div className='flex gap-1 pt-2'>
            {memoCalcTimes[1]?.map((time: string) => {
              return (
                time && <GreenLabel variant={MyVariant.buffer} key={time} data={time} />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlanMain;
