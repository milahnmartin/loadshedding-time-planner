import useFetchLoadsheddingStatus from "@hooks/useFetchLoadsheddingStatus";
import classNames from "classnames";

function EskomStatus() {
  const {
    data: loadsheddingStageData,
    error: loadsheddingStageError,
    isLoading: loadsheddingStageLoading,
    isFetching: loadsheddingStageFetching,
    refetch: loadsheddingStageRefetch,
  } = useFetchLoadsheddingStatus();
  const capetownStages = classNames("font-satoshiBold text-white text-xl", {
    "text-red-700": loadsheddingStageData?.capetown?.stage == 4,
    "text-yellow-400": loadsheddingStageData?.capetown?.stage == 3,
    "text-yellow-300": loadsheddingStageData?.capetown?.stage == 2,
    "text-yellow-200": loadsheddingStageData?.capetown?.stage == 1,
    "text-green-400": loadsheddingStageData?.capetown?.stage == 0,
  });

  const eskomStages = classNames("font-satoshiBold text-white text-xl", {
    "text-red-700": loadsheddingStageData?.eskom?.stage == 4,
    "text-yellow-400": loadsheddingStageData?.eskom?.stage == 3,
    "text-yellow-300": loadsheddingStageData?.eskom?.stage == 2,
    "text-yellow-200": loadsheddingStageData?.eskom?.stage == 1,
    "text-green-400": loadsheddingStageData?.eskom?.stage == 0,
  });

  if (loadsheddingStageLoading)
    return (
      <div className='flex flex-col border-2 h-full w-3/12'>
        <div className='h-[20%] text-center flex items-center justify-center flex-col space-y-4 p-2 border-2 border-red-700'>
          <h1 className='text-white font-satoshiBlack text-2xl'>Current Stages:</h1>
          <h1 className='font-satoshi text-white text-xl'>CHECKING STAGES</h1>
        </div>
        <div className='border-2 border-pink-600 h-[40%] flex flex-col justify-center items-center'>
          <h1 className='text-white font-satoshiItalic'>CAPE TOWN UPCOMING EVENTS</h1>
          <h1>LOADING</h1>
        </div>
        <div className='border-2 border-pink-600 h-[40%] flex flex-col justify-center items-center'>
          <h1 className='text-white font-satoshiItalic'>ESKOM UPCOMING EVENTS</h1>
          <h1>LOADING</h1>
        </div>
      </div>
    );
  return (
    <div className='flex flex-col border-2 h-full w-3/12'>
      <div className='h-[20%] text-center flex items-center justify-center flex-col space-y-4 p-2 border-2 border-red-700'>
        <h1 className='text-white font-satoshiBlack text-2xl'>Current Stages:</h1>
        <h1 className={capetownStages}>
          Cape Town: Stage: <span>{loadsheddingStageData?.capetown?.stage}</span>
        </h1>
        <h1 className={eskomStages}>
          Eskom: Stage: <span>{loadsheddingStageData?.eskom?.stage}</span>
        </h1>
      </div>
      <div className='border-2 border-pink-600 h-[40%] flex flex-col justify-center items-center'>
        <h1 className='text-white font-satoshiItalic'>CAPE TOWN UPCOMING EVENTS</h1>
        {loadsheddingStageData?.capetown?.next_stages?.map((info: unknown) => {
          return <pre className='text-white font-satoshi'>{JSON.stringify(info)}</pre>;
        })}
      </div>
      <div className='border-2 border-pink-600 h-[40%] flex flex-col justify-center items-center'>
        <h1></h1> <h1 className='text-white font-satoshiItalic'>ESKOM UPCOMING EVENTS</h1>
        {loadsheddingStageData?.eskom?.next_stages?.map((info: unknown) => {
          return <pre className='text-white font-satoshi'>{JSON.stringify(info)}</pre>;
        })}
      </div>
    </div>
  );
}

export default EskomStatus;
