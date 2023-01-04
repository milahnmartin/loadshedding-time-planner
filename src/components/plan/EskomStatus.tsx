import EskomUpcomingEventLabel from "@comps/labels/EskomUpcomingEventLabel";
import useFetchLoadsheddingStatus from "@hooks/useFetchLoadsheddingStatus";
import { Player } from "@lottiefiles/react-lottie-player";
import classNames from "classnames";
function EskomStatus() {
  const {
    data: loadsheddingStageData,
    error: loadsheddingStageError,
    isLoading: loadsheddingStageLoading,
    isFetching: loadsheddingStageFetching,
    refetch: loadsheddingStageRefetch,
  } = useFetchLoadsheddingStatus();
  const capetownStages = classNames("font-satoshiBold tracking-wide text-xl", {
    "text-red-700": loadsheddingStageData?.capetown?.stage >= 4,
    "text-red-500": loadsheddingStageData?.capetown?.stage == 3,
    "text-amber-600": loadsheddingStageData?.capetown?.stage == 2,
    "text-yellow-400": loadsheddingStageData?.capetown?.stage == 1,
    "text-green-400": loadsheddingStageData?.capetown?.stage == 0,
  });

  const eskomStages = classNames("font-satoshiBold tracking-wide text-xl", {
    "text-red-700": loadsheddingStageData?.eskom?.stage >= 4,
    "text-red-500": loadsheddingStageData?.eskom?.stage == 3,
    "text-amber-600": loadsheddingStageData?.eskom?.stage == 2,
    "text-yellow-400": loadsheddingStageData?.eskom?.stage == 1,
    "text-green-400": loadsheddingStageData?.eskom?.stage == 0,
  });

  if (loadsheddingStageLoading)
    return (
      <div className='flex items-center justify-center border-2 h-full w-3/12'>
        <Player
          src='https://assets2.lottiefiles.com/private_files/lf30_3vhjjbex.json'
          style={{ height: "30%", width: "30%" }}
          autoplay
          loop
          speed={0.5}
        />
      </div>
    );
  return (
    <div className='flex flex-col border-2 h-full w-3/12'>
      <div className='h-[20%] text-center flex items-center justify-center flex-col space-y-4 p-2 border-2 border-red-700'>
        {/* <h1 className='font-satoshiBold text-3xl text-transparent bg-clip-text bg-gradient-to-r from-caqua via-cblue to-cpurple'> */}
        <h1 className='font-satoshiBold text-3xl text-white'>CURRENT STAGES:</h1>
        <h1 className={capetownStages}>
          Cape Town: Stage: <span>{loadsheddingStageData?.capetown?.stage}</span>
        </h1>
        <h1 className={eskomStages}>
          Eskom: Stage: <span>{loadsheddingStageData?.eskom?.stage}</span>
        </h1>
      </div>
      <div className='border-2 border-pink-600 h-[40%] p-2 flex flex-col justify-center items-center'>
        {/* <h1 className='font-satoshiBold text-center text-2xl text-transparent bg-clip-text bg-gradient-to-r from-caqua via-cblue to-cpurple'> */}
        <h1 className='font-satoshiBold text-center text-2xl text-white'>
          CAPE TOWN UPCOMING EVENTS:
        </h1>
        <div className='flex flex-col h-full justify-center space-y-1'>
          {loadsheddingStageData?.capetown?.next_stages?.map(
            (event: { stage: number; stage_start_timestamp: string }) => {
              return <EskomUpcomingEventLabel {...event} />;
            }
          )}
        </div>
      </div>
      <div className='border-2 border-pink-600 h-[40%] flex p-2 flex-col justify-center items-center'>
        {/* <h1 className='font-satoshiBold text-center text-2xl text-transparent bg-clip-text bg-gradient-to-r from-caqua via-cblue to-cpurple'> */}
        <h1 className='font-satoshiBold text-center text-2xl text-white'>
          ESKOM UPCOMING EVENTS:
        </h1>

        <div className='flex flex-col h-full justify-center space-y-1'>
          {loadsheddingStageData?.eskom?.next_stages?.map(
            (event: { stage: number; stage_start_timestamp: string }) => {
              return <EskomUpcomingEventLabel {...event} />;
            }
          )}
        </div>
      </div>
    </div>
  );
}

export default EskomStatus;
