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
      <div className='h-3/12 text-center flex items-center justify-center flex-col'>
        <h1 className='font-satoshi text-white'>
          Cape Town: Stage: <span>{loadsheddingStageData?.capetown?.stage}</span>
        </h1>
        <h1 className='font-satoshi text-white'>
          Eskom: Stage: <span>{loadsheddingStageData?.eskom?.stage}</span>
        </h1>
      </div>
      <div></div>
      <div></div>
    </div>
  );
}

export default EskomStatus;
