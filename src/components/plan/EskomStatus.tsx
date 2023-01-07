import LottieLoading from "@assets/90918-charging-electricity.json";
import EskomUpcomingEventLabel from "@comps/labels/EskomUpcomingEventLabel";
import useFetchLoadsheddingStatus from "@hooks/useFetchLoadsheddingStatus";
import classNames from "classnames";
import Lottie from "react-lottie-player";
function EskomStatus() {
  const {
    data: loadsheddingStageData,
    error: loadsheddingStageError,
    isLoading: loadsheddingStageLoading,
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

  if (loadsheddingStageError) {
    return (
      <div className='flex items-center justify-center border-2 h-full w-3/12'>
        <h1 className='text-center font-satoshiBlack text-red-700 text-2xl'>
          ERROR FETCHING STAGES
        </h1>
      </div>
    );
  }

  if (loadsheddingStageLoading) {
    return (
      <div className='flex h-full w-3/12 items-center justify-center'>
        <Lottie
          loop
          animationData={LottieLoading}
          play
          style={{ width: "35%", height: "35%" }}
        />
      </div>
    );
  }

  return (
    <div className='flex flex-col border-2 h-full w-3/12'>
      <div className='h-[20%] text-center flex items-center justify-center flex-col space-y-4 p-2'>
        {/* <h1 className='font-satoshiBold text-3xl text-transparent bg-clip-text bg-gradient-to-r from-caqua via-cblue to-cpurple'> */}
        <h1 className='font-satoshiBold text-3xl text-white'>CURRENT STAGES:</h1>
        <h1 className={capetownStages}>
          Cape Town: Stage: <span>{loadsheddingStageData?.capetown?.stage}</span>
        </h1>
        <h1 className={eskomStages}>
          Eskom: Stage: <span>{loadsheddingStageData?.eskom?.stage}</span>
        </h1>
      </div>
      <div className='h-[40%] p-2 flex flex-col justify-center items-center pt-4'>
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
      <div className='h-[40%] flex p-2 flex-col justify-center items-center pt-4'>
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
