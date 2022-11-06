import RedLabel from "@comps/RedLabel";
import { Player } from "@lottiefiles/react-lottie-player";
import classNames from "classnames";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { ThreeDots } from "react-loading-icons/";
import { toast } from "react-toastify";
import useFetchPlanData from "../hooks/useFetchPlanData";
import type { IStartEndTimes } from "../types/types";
import { auth } from "../utils/firebase-config";
const loadedPlanStyles = classNames(
  "w-full h-[90%] grid grid-cols-1 grid-rows-4 md:grid-cols-2 md:grid-rows-2"
);
const unLoadedPlanStyles = classNames(
  "w-full h-[90%] flex items-center justify-center"
);
function PlanMain() {
  const router = useRouter();
  const { id } = router.query;
  const [currentUser, loading] = useAuthState(auth);
  const [minPlanTimeRef, setMinPlanTimeRef] = useState<number>(40);
  const [users, setUsers] = useState<Array<string>>([]);
  const [teams, setTeams] = useState<Array<string>>([]);
  const [time, setTime] = useState<IStartEndTimes>({
    startTime: "10:00",
    endTime: {
      date: new Date().toString(),
      time: "00:00",
    },
  });
  const [planData, setplanData] = useState<any>({});
  const userRefAdd = useRef<HTMLInputElement>(null);
  const teamRefAdd = useRef<HTMLInputElement>(null);

  const {
    data: fetchedPlanData,
    isError,
    isFetching,
  } = useFetchPlanData(id as string);

  const inputRef = useRef<HTMLInputElement>(null);
  const inviteRef = useRef<HTMLInputElement>(null);

  const handleRemoveUser = (val: string) => {
    const newUsers = users.filter((user, i) => user !== val);
    setUsers(newUsers);
  };
  const handleRemoveTeam = (val: string) => {
    const newTeams = teams.filter((team, i) => team !== val);
    setTeams(newTeams);
  };
  const handleAddUsers = () => {
    if (!userRefAdd?.current?.value) {
      toast.warning("Nothing Was Entered");
      return;
    }

    const splitedNewUsers = userRefAdd.current.value
      ?.trim()
      .toUpperCase()
      .split(",");
    const newUsers = Array.from(new Set([...users, ...splitedNewUsers]));
    setUsers(newUsers);
    userRefAdd.current.value = "";
  };

  const handleAddTeam = async () => {
    if (!teamRefAdd?.current?.value) {
      toast.warning("Nothing Was Entered");
      return;
    }

    const splittedNewTeams = teamRefAdd.current.value
      ?.trim()
      .toUpperCase()
      .split(",");
    const newTeams = Array.from(new Set([...teams, ...splittedNewTeams]));
    setTeams(newTeams);
    teamRefAdd.current.value = "";
  };

  return (
    <div className={isFetching ? unLoadedPlanStyles : loadedPlanStyles}>
      {isFetching ? (
        <ThreeDots />
      ) : (
        <>
          <div className='border-2 flex flex-col items-center justify-evenly p-2'>
            <h1 className='text-white font-Inter text-2xl font-bold tracking-wide'>
              ADDED TEAMS
              <h1 className='text-white'>{JSON.stringify(fetchedPlanData)}</h1>
            </h1>
            <div className='p-2'>
              {teams.map((team) => (
                <RedLabel data={team} cb={handleRemoveTeam} />
              ))}
            </div>
            <input
              ref={teamRefAdd}
              type='text'
              placeholder='Bravado'
              className='rounded-xl p-2 outline-none border-none ring-0 focus:ring-4 focus:ring-cblue'
            />
            <button
              onClick={handleAddTeam}
              className='relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 w-[10rem] h-[3rem] overflow-hidden text-sm font-medium text-gray-900 rounded-full group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white '
            >
              <span className='relative px-5 py-2.5 transition-all ease-in duration-200 w-[9.5rem] h-[2.5rem] bg-white dark:bg-gray-900 rounded-full group-hover:bg-opacity-0'>
                ADD TEAM
              </span>
            </button>
          </div>
          <div className='border-2 flex flex-col items-center justify-evenly p-2'>
            <h1 className='text-white font-Inter text-2xl font-bold tracking-wide'>
              ADDED USERS
            </h1>
            <div className='p-2'>
              {fetchedPlanData?.plan_authorizedUsers.map((user: string) => (
                <RedLabel data={user} cb={handleRemoveUser} />
              ))}
            </div>
            <input
              ref={userRefAdd}
              type='text'
              placeholder='yourfriendemail@email.com, friendUUID'
              className='placeholder:text-cblue placeholder:font-black placeholder:font-Inter w-full rounded-xl p-2 placeholder:text-center outline-none border-none ring-0 focus:ring-4 focus:ring-cblue'
            />
            <button
              onClick={handleAddUsers}
              className='relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 w-[10rem] h-[3rem] overflow-hidden text-sm font-medium text-gray-900 rounded-full group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white '
            >
              <span className='relative px-5 py-2.5 transition-all ease-in duration-200 w-[9.5rem] h-[2.5rem] bg-white dark:bg-gray-900 rounded-full group-hover:bg-opacity-0'>
                ADD TIMES
              </span>
            </button>
          </div>
          <div className='border-2 flex flex-col items-center justify-evenly p-2 flex-wrap content-center'>
            <h1 className='text-white font-Inter text-2xl font-bold tracking-wide'>
              PLAN INFORMATION
            </h1>
            <label className='text-white font-black font-Inter text-2xl'>
              Scheduled Date
            </label>
            <input
              required
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setTime({
                  ...time,
                  endTime: {
                    ...time.endTime,
                    date: e.currentTarget.value,
                  },
                });
              }}
              value={time.endTime.date}
              className='rounded-xl px-4 py-2 text-black font-black font-Inter'
              type='date'
            />
            <label className='font-black text-white font-Inter text-2xl'>
              Start Time
            </label>
            <input
              required
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setTime({ ...time, startTime: e.currentTarget.value });
              }}
              value={time.startTime}
              className='rounded-xl px-4 py-2 text-black font-black font-Inter'
              type='time'
            />
            <label className='font-black text-white font-Inter text-2xl'>
              End Time
            </label>
            <input
              required
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTime({
                  ...time,
                  endTime: { ...time.endTime, time: e.currentTarget.value },
                })
              }
              value={time.endTime.time}
              className='rounded-xl px-4 py-2 text-black font-black font-Inter'
              type='time'
            />
            <label className='font-black text-white font-Inter text-2xl'>
              Min Plan Time
            </label>
            <input
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (Number(e.currentTarget?.value) < 1) {
                  setMinPlanTimeRef(1);
                } else {
                  setMinPlanTimeRef(Number(e.currentTarget?.value));
                }
              }}
              className='rounded-xl px-4 py-2 text-black font-black font-Inter'
              type='number'
              value={minPlanTimeRef}
            />
          </div>
          <div className='border-2 flex items-center justify-center'>
            <Player
              src='https://assets1.lottiefiles.com/private_files/lf30_3vhjjbex.json'
              className='player w-[300px] h-[300px] '
              autoplay
              loop
              speed={0.5}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default PlanMain;
