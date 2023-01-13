import TimeCalc from "@helpers/algorithm";
type Times = {
  bufferTimes: any[];
  availableTimes: any[];
  loadsheddingTimes: any[];
};

type Props = {
  LSTimes: {
    capetown: any[];
    eskom: any[];
  };
  timeScope: {
    start: string;
    end: string;
  };
};

function TimeInformation({ LSTimes, timeScope }: Props) {
  const Times = new TimeCalc(
    {
      capeTown: ["13:00-15:00", "15:00-17:00"],
      eskom: ["15:00-17:00", "13:00-15:00", "10:00-12:00"],
    },
    {
      start: timeScope.start,
      end: timeScope.end,
    }
  ).times;
  return (
    <div className='h-full w-6/12 border-2 border-red-600 flex items-center justify-center flex-wrap content-start overflow-y-scroll'>
      <pre className='text-rose-800 font-sathosiBlack text-2xl border-2'>
        {Times && JSON.stringify(Times, null, 2)}
      </pre>
      <pre className='text-white '>{JSON.stringify(LSTimes, null, 2)}</pre>
    </div>
  );
}

export default TimeInformation;
