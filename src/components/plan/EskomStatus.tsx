import LottieLoading from "@assets/90918-charging-electricity.json";
import EskomUpcomingEventLabel from "@comps/labels/EskomUpcomingEventLabel";
import classNames from "classnames";
import Lottie from "react-lottie-player";
import { v4 as uuidv4 } from "uuid";
import { Player } from "@lottiefiles/react-lottie-player";

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
    "text-red-800": loadsheddingStageData?.capetown?.stage == 8,
    "text-red-500": loadsheddingStageData?.capetown?.stage == 7,
    "text-yellow-600": loadsheddingStageData?.capetown?.stage == 6,
    "text-yellow-500": loadsheddingStageData?.capetown?.stage == 5,
    "text-c2purple": loadsheddingStageData?.capetown?.stage == 4,
    "text-blue-500": loadsheddingStageData?.capetown?.stage == 3,
    "text-aqua-500": loadsheddingStageData?.capetown?.stage == 2,
    "text-aqua-200": loadsheddingStageData?.capetown?.stage == 1,
    "text-green-300": loadsheddingStageData?.capetown?.stage == 0,
  });

  const eskomStages = classNames("font-satoshiBlack text-2xl", {
    "text-red-800": loadsheddingStageData?.eskom?.stage == 8,
    "text-red-500": loadsheddingStageData?.eskom?.stage == 7,
    "text-yellow-600": loadsheddingStageData?.eskom?.stage == 6,
    "text-yellow-500": loadsheddingStageData?.eskom?.stage == 5,
    "text-c2purple": loadsheddingStageData?.eskom?.stage == 4,
    "text-blue-500": loadsheddingStageData?.eskom?.stage == 3,
    "text-aqua-500": loadsheddingStageData?.eskom?.stage == 2,
    "text-aqua-200": loadsheddingStageData?.eskom?.stage == 1,
    "text-green-300": loadsheddingStageData?.eskom?.stage == 0,
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
      <div className='h-[18%] text-center flex items-center justify-center flex-col space-y-3 pb-3'>
        {/* <h1 className='font-satoshiBold text-3xl text-transparent bg-clip-text bg-gradient-to-r from-caqua via-cblue to-cpurple'> */}
        <span className='flex space-x-1 h-[50px] items-center pt-2'>
        <h1 className='font-satoshiBold text-3xl text-white'>CURRENT STAGES</h1>
        <Player
          src='https://assets2.lottiefiles.com/packages/lf20_cjy4zhdi.json'
          className='player w-[50px] h-[50px] '
          autoplay
          loop
          speed={0.8}
        />
        </span>
        <h1 className={capetownStages}>
          Cape Town: Stage: <span>{loadsheddingStageData?.capetown?.stage}</span>
        </h1>
        <h1 className={eskomStages}>
          Eskom: Stage: <span>{loadsheddingStageData?.eskom?.stage}</span>
        </h1>
      </div>
      <div className='h-[41%] flex flex-col justify-center items-center'>
        {/* <h1 className='font-satoshiBold text-center text-2xl text-transparent bg-clip-text bg-gradient-to-r from-caqua via-cblue to-cpurple'> */}
        <h1 className='font-satoshiBold text-center text-2xl text-white pt-6 pb-2'>
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
        <h1 className='font-satoshiBold text-center text-2xl text-white pb-2 '>
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
