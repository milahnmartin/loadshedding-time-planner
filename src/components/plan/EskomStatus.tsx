import LottieLoading from "@assets/90918-charging-electricity.json";
import EskomUpcomingEventLabel from "@comps/labels/EskomUpcomingEventLabel";
import classNames from "classnames";
import Lottie from "react-lottie-player";
import { v4 as uuidv4 } from "uuid";

type Props = {
  loadsheddingStageData: any;
  loadsheddingStageError: any;
  loadsheddingStageLoading: boolean;
};
function EskomStatus({
  loadsheddingStageData,
  loadsheddingStageError,
  loadsheddingStageLoading,
}: Props) {
  const capetownStages = classNames("font-satoshiBlack text-2xl", {
    "text-red-200": loadsheddingStageData?.capetown?.stage == 8,
    "text-red-300": loadsheddingStageData?.capetown?.stage == 7,
    "text-red-400": loadsheddingStageData?.capetown?.stage == 6,
    "text-red-500": loadsheddingStageData?.capetown?.stage == 5,
    "text-orange-700": loadsheddingStageData?.capetown?.stage == 4,
    "text-orange-600": loadsheddingStageData?.capetown?.stage == 3,
    "text-amber-600": loadsheddingStageData?.capetown?.stage == 2,
    "text-amber-400": loadsheddingStageData?.capetown?.stage == 1,
    "text-green-500": loadsheddingStageData?.capetown?.stage == 0,
  });

  const eskomStages = classNames("font-satoshiBlack text-2xl", {
    "text-red-200": loadsheddingStageData?.eskom?.stage == 8,
    "text-red-300": loadsheddingStageData?.eskom?.stage == 7,
    "text-red-400": loadsheddingStageData?.eskom?.stage == 6,
    "text-red-500": loadsheddingStageData?.eskom?.stage == 5,
    "text-orange-700": loadsheddingStageData?.eskom?.stage == 4,
    "text-orange-600": loadsheddingStageData?.eskom?.stage == 3,
    "text-amber-600": loadsheddingStageData?.eskom?.stage == 2,
    "text-amber-400": loadsheddingStageData?.eskom?.stage == 1,
    "text-green-500": loadsheddingStageData?.eskom?.stage == 0,
  });

  if (loadsheddingStageError) {
    return (
      <div className='flex items-center justify-center h-full w-3/12'>
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
    <div className='flex flex-col h-full w-3/12'>
      <div className='h-[18%] text-center flex items-center justify-center flex-col space-y-4'>
        {/* <h1 className='font-satoshiBold text-3xl text-transparent bg-clip-text bg-gradient-to-r from-caqua via-cblue to-cpurple'> */}
        <h1 className='font-satoshiBold text-3xl text-white pt-1'>CURRENT STAGES</h1>
       
        <h1 className={capetownStages}>
          Cape Town: Stage: <span>{loadsheddingStageData?.capetown?.stage}</span>
        </h1>
        <h1 className={eskomStages}>
          Eskom: Stage: <span>{loadsheddingStageData?.eskom?.stage}</span>
        </h1>
      </div>
      <div className='h-[41%] flex flex-col justify-center items-center'>
        {/* <h1 className='font-satoshiBold text-center text-2xl text-transparent bg-clip-text bg-gradient-to-r from-caqua via-cblue to-cpurple'> */}
        <h1 className='font-satoshiBold text-center text-2xl text-white pb-2'>
          CAPE TOWN UPCOMING EVENTS:
        </h1>
        <div className='flex flex-col h-full justify-start space-y-1 overflow-y-scroll '>
          {loadsheddingStageData?.capetown?.next_stages?.map(
            (event: { stage: number; stage_start_timestamp: string }) => {
              return <EskomUpcomingEventLabel key={uuidv4()} {...event} />;
            }
          )}
        </div>
      </div>
      <div className='h-[41%] flex flex-col justify-start items-center'>
        {/* <h1 className='font-satoshiBold text-center text-2xl text-transparent bg-clip-text bg-gradient-to-r from-caqua via-cblue to-cpurple'> */}
        <h1 className='font-satoshiBold text-center text-2xl text-white pb-2 pt-1'>
          ESKOM UPCOMING EVENTS:
        </h1>

        <div className='flex flex-col h-full justify-start space-y-1 overflow-y-scroll'>
          {loadsheddingStageData?.eskom?.next_stages?.map(
            (event: { stage: number; stage_start_timestamp: string }) => {
              return <EskomUpcomingEventLabel key={uuidv4()} {...event} />;
            }
          )}
        </div>
      </div>
    </div>
  );
}

export default EskomStatus;
