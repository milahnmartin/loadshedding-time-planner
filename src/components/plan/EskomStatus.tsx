import useFetchLoadsheddingStatus from "@hooks/useFetchLoadsheddingStatus";
function EskomStatus() {
  const {
    data: loadsheddingStageData,
    error: loadsheddingStageError,
    isLoading: loadsheddingStageLoading,
    isFetching: loadsheddingStageFetching,
    refetch: loadsheddingStageRefetch,
  } = useFetchLoadsheddingStatus();
  return (
    <div className='flex flex-col border-2 h-full w-3/12'>
      <div className='h-[20%] text-center flex items-center justify-center flex-col space-y-4 p-2 border-2 border-red-700'>
        <h1 className='text-white font-satoshiBlack text-2xl'>Current Stages:</h1>
        <h1 className='font-satoshi text-white text-xl'>
          Cape Town: Stage: <span>{loadsheddingStageData?.capetown?.stage}</span>
        </h1>
        <h1 className='font-satoshi text-white text-xl'>
          Eskom: Stage: <span>{loadsheddingStageData?.eskom?.stage}</span>
        </h1>
      </div>
      <div className='border-2 border-pink-600 h-[40%] flex flex-col justify-center items-center'>
        <h1>CAPE TOWN UPCOMING EVENTS</h1>
      </div>
      <div className='border-2 border-pink-600 h-[40%] flex flex-col justify-center items-center'>
        <h1>ESKOM UPCOMING EVENTS</h1>
      </div>
    </div>
  );
}

export default EskomStatus;
