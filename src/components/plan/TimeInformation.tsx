import useFetchLoadsheddingStatus from "@hooks/useFetchLoadsheddingStatus";
type Times = {
  bufferTimes: any[];
  availableTimes: any[];
  loadsheddingTimes: any[];
};

type Props = {
  LSTimes: any[];
  timeScope: {
    start: string;
    end: string;
    date: string;
  };
};

function TimeInformation({ LSTimes, timeScope }: Props) {
  const { data: stageData } = useFetchLoadsheddingStatus();
  // const [bufferTimes, availableTimes, loadsheddingTimes] = new TimeCalc(
  //   LSTimes,
  //   timeScope,
  //   {
  //     cpt: stageData?.capetown,
  //     esk: stageData?.eskom,
  //   }
  // ).constructTimes();
  return (
    <div className='h-full w-6/12 border-2 text-white font-satoshi border-red-600 flex items-center justify-center flex-wrap content-start overflow-y-scroll'>
      {JSON.stringify(LSTimes, null, 2)}
      <pre className='text-white text-2xl'>{JSON.stringify(timeScope, null, 2)}</pre>
      <pre className='text-white text-2xl'>{JSON.stringify(stageData, null, 2)}</pre>
    </div>
  );
}

export default TimeInformation;
