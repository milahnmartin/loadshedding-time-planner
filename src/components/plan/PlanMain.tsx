import LoaddingLottie from '@assets/90918-charging-electricity.json';
import EskomStatus from '@comps/plan/EskomStatus';
import PlanFilter from '@comps/plan/PlanFilter';
import TimeInformation from '@comps/plan/TimeInformation';
import useFetchLoadsheddingStatus from '@hooks/useFetchLoadsheddingStatus';
import useFetchPlanData from '@hooks/useFetchPlanData';
import type { FilterData, Info } from '@lstypes/types';
import supabase from '@utils/supabase-config';
import Image from 'next/image';
import Router, { useRouter } from 'next/router';
import { useEffect, useReducer } from 'react';
import Lottie from 'react-lottie-player';
import { toast } from 'react-toastify';
import PlanInfo from './RightSide';
const handleReducer = (state: any, action: { TYPE: string; PAYLOAD?: any }) => {
  switch (action.TYPE) {
    case 'SET_FILTER_DATA':
      console.log(action.PAYLOAD.filterInputs);
      return {
        ...state,
        filterInputs: action.PAYLOAD.filterInputs,
        active_member_times: state.user_data
          .map((items: any) => {
            if (items.user_weekLSTimes) {
              return {
                timeData: items.user_weekLSTimes.filter(
                  (times: any) =>
                    times.date === action.PAYLOAD.filterInputs?.startDate
                ),
                stageRegion:
                  items?.user_sepushID?.id.split('-')[0] === 'capetown'
                    ? 'capetown'
                    : 'eskom',
              };
            }
          })
          .flat(),
      };
    case 'SET_LS_USERS_TIME':
      return {
        ...state,
        user_data: action.PAYLOAD,
        active_member_times: action.PAYLOAD.map((items: any) => {
          if (items.user_weekLSTimes) {
            return {
              timeData: items.user_weekLSTimes.filter(
                (times: any) => times.date === state.filterInputs?.startDate
              ),
              stageRegion:
                items?.user_sepushID?.id.split('-')[0] === 'capetown'
                  ? 'capetown'
                  : 'eskom',
            };
          }
        }).flat(),
      };
    case 'SET_LS_TEAM_TIME':
      return {
        ...state,
        team_times: action.PAYLOAD,
      };
    case 'SET_LS_STAGE':
      return {
        ...state,
        currentLoadSheddingStage: action.PAYLOAD,
      };

    case 'SET_ACTIVE_DATE_TIMES_USERS':
      return {
        ...state,
        active_member_times: action.PAYLOAD,
      };
  }
};
type PlanMainProps = {
  filterState: {
    filter: boolean;
    setshowfilter: React.Dispatch<React.SetStateAction<boolean>>;
  };
};
export default function PlanMain({ filterState }: PlanMainProps) {
  const router = useRouter();
  const {
    data: loadsheddingStageData,
    error: loadsheddingStageError,
    isLoading: loadsheddingStageLoading,
  } = useFetchLoadsheddingStatus();
  const [state, dispatch] = useReducer(handleReducer, {
    user_data: [],
    active_member_times: [],
    team_times: [],
    active_team_times: [],
    filterInputs: {
      startDate: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate(),
        new Date().getHours()
      )
        .toISOString()
        .split('T')[0] as string,
      startTime: new Date().toLocaleTimeString('en-ZA', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      endTime: '02:00',
      minPlanTime: 40,
    },
  });

  const handleFilterChange = ({ filterInputs }: FilterData) => {
    dispatch({
      TYPE: 'SET_FILTER_DATA',
      PAYLOAD: {
        filterInputs,
      },
    });
  };

  const handleUserRemove = async (rUser: string) => {
    if (!rUser) return;
    if (rUser === planData?.user_id) {
      toast.error("You can't remove the owner from their plan");
      return;
    }
    const newMembers = planData?.plan_authorizedUsers?.filter(
      (member: string) => member !== rUser
    );
    const { error } = await supabase
      .from('user_plans')
      .update({ plan_authorizedUsers: newMembers })
      .eq('plan_id', router.query.plan_id);

    if (error) {
      console.log(error);
      toast.error('Error removing member');
      return;
    }

    await planRefetch();
  };

  const {
    data: planData,
    error: planError,
    isLoading: planLoading,
    isFetching: planFetching,
    refetch: planRefetch,
  } = useFetchPlanData(router.query.plan_id as string);

  useEffect(() => {
    if (planFetching) return;
    (async () => {
      const { data: emailData, error: errorData } = await supabase
        .from('user_info')
        .select('user_id,user_sepushID,user_email,user_weekLSTimes')
        .in('user_email', planData?.plan_authorizedUsers);

      const { data: uidData, error: uidError } = await supabase
        .from('user_info')
        .select('user_id,user_sepushID,user_email,user_weekLSTimes')
        .in('user_id', [planData?.plan_authorizedUsers, planData?.user_id]);

      if (errorData || uidError) {
        toast.error('Error fetching authorized users');
        return;
      }
      const updatedUsers = [];
      for (const users of [...emailData, ...uidData]) {
        if (!users) continue;
        if (!users?.user_sepushID?.id) {
          toast.warning(
            `${users?.user_email} HAS NOT SET THEIR LOADSHEDDING AREA YET`,
            {
              autoClose: 10000,
            }
          );
          toast.warning('AREA CAN BE SET IN PROFILE SETTINGS', {
            autoClose: 10000,
          });
          continue;
        }
        if (!users?.user_weekLSTimes) {
          toast.error(
            `WE COULDNT GET ${users?.user_email}'S LOADSHEDDING TIMES, CONTACT THE DEVELOPER`
          );
          continue;
        }
        const latestTime = users?.user_weekLSTimes[0]?.date;
        if (new Date(latestTime).getDate() === new Date().getDate()) {
          updatedUsers.push(users);
          continue;
        }

        const updatedTime = await fetch(
          `/api/sepush/${users?.user_sepushID?.id}`
        ).then(resp => resp.json());
        if (!updatedTime) {
          console.log(
            `DEV LOG - COULDNT UPDATE TIME FOR ${users?.user_sepushID?.id}`
          );
          continue;
        }

        const { data, error } = await supabase
          .from('user_info')
          .update({ user_weekLSTimes: updatedTime?.lsdata })
          .eq('user_id', users?.user_id)
          .select();

        if (error) {
          console.log(
            `DEV LOG - COULDNT UPDATE TIME FOR ${users?.user_sepushID?.id}`
          );
          continue;
        }
        updatedUsers.push(data![0]);
      }
      dispatch({
        TYPE: 'SET_LS_USERS_TIME',
        PAYLOAD: updatedUsers,
      });
    })();
  }, [planFetching]);

  if (planLoading) {
    return (
      <div className="h-[90vh] w-screen flex items-center justify-center flex-col">
        <Lottie
          loop
          animationData={LoaddingLottie}
          play
          style={{ width: '35%', height: '35%' }}
        />
      </div>
    );
  }

  if (planError) {
    return (
      <div className="h-[90vh] w-screen flex items-center justify-center flex-col space-y-10">
        <Image
          src="/Logov3.png"
          width={170}
          height={170}
          alt="LSPLANNER LOGO"
        />
        <h1 className="text-white text-center font-satoshiBold tracking-tighter text-5xl">
          DASHBOARD IS CURRENTLY UNAVAILABLE
        </h1>
        <button
          className="relative flex items-center justify-center  w-[10rem] h-[3rem] text-sm font-black text-gray-900 rounded-full group bg-gradient-to-br from-[#6EE7B7] via-[#3B82F6] to-[#9333EA] group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white "
          onClick={() => Router.push('/')}>
          <span className="relative px-5 py-2.5 group-hover:px-0 transition-all ease-in duration-200 w-[9.5rem] h-[2.5rem] bg-white dark:bg-slate-800 rounded-full group-hover:bg-opacity-0">
            <span className="flex items-center justify-around font-satoshiBlack">
              GO HOME
            </span>
          </span>
        </button>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative">
      {filterState.filter && (
        <PlanFilter
          members={[...planData?.plan_authorizedUsers, planData?.user_id]}
          teams={planData?.plan_authorizedTeams}
          invitedData={planData?.plan_InvitedData}
          filterSettings={state.filterInputs}
          onFilter={handleFilterChange}
          removeUserCB={handleUserRemove}
          refetchPlanData={planRefetch}
          toggleFilter={filterState.setshowfilter}
        />
      )}

      <div className="flex h-[90vh] w-full overflow-y-scroll">
        <EskomStatus
          {...{
            loadsheddingStageData,
            loadsheddingStageError,
            loadsheddingStageLoading,
          }}
        />
        <TimeInformation
          LSTimes={state.active_member_times}
          timeScope={{
            start: state.filterInputs.startTime,
            end: state.filterInputs.endTime,
            date: state.filterInputs.startDate,
            minPlanTime: state.filterInputs.minPlanTime,
          }}
          stageData={{
            data: loadsheddingStageData,
            stageDataLoading: loadsheddingStageLoading,
          }}
        />
        {/* <RightSide /> */}
        <PlanInfo planInfo={planData as Info} />
      </div>
    </div>
  );
}
