import TimeDisplayLabel from "@comps/labels/TimeDisplayLabel";
import TimeCalc from "@helpers/algorithm";
import useFetchLoadsheddingStatus from "@hooks/useFetchLoadsheddingStatus";
import { useEffect, useState } from "react";
type Times = {
  bufferTimes: any[];
  availableTimes: any[];
  loadsheddingTimes: any[];
};

type MyTimes = {
  timeData: { date: string; name: string; stages: string[][] };
  stageRegion: "eskom" | "capetown";
};

type Props = {
  LSTimes: MyTimes[];
  timeScope: {
    start: string;
    end: string;
    date: string;
  };
};

function TimeInformation({ LSTimes, timeScope }: Props) {
  const { data: stageData } = useFetchLoadsheddingStatus();
  const [data, setData] = useState<any | null>(null);
  useEffect(() => {
    if (!stageData || !LSTimes || !timeScope) return;
    const [availableTimes, bufferTimes, loadsheddingTimes] = new TimeCalc(
      LSTimes,
      timeScope,
      stageData
    ).constructTimes();
    setData({ availableTimes, bufferTimes, loadsheddingTimes });
  }, [stageData, LSTimes, timeScope]);
  return (
    <div className='h-full w-6/12 border-2 flex-col text-white font-satoshi border-red-600 flex items-center justify-center flex-wrap content-start overflow-y-scroll'>
      <div className='w-full h-1/3 border-2'>
        <div className='flex w-full items-center justify-center text-center h-[20%]'>
          <pre>AVAILABLE TIMES</pre>
        </div>
        <div className='flex h-[80%] w-full border-2 items-center justify-center gap-2 flex-wrap content-center'>
          {data &&
            data.availableTimes.map((time: any) => (
              <TimeDisplayLabel data={time} variant='availible' />
            ))}
        </div>
      </div>
      <div className='w-full h-1/3 border-2'>
        <div className='flex w-full items-center justify-center text-center h-[20%]'>
          <pre>BUFFER TIMES</pre>
        </div>
        <div className='flex h-[80%] w-full border-2 items-center justify-center gap-2 flex-wrap content-center'>
          {data &&
            data.bufferTimes.map((time: any) => (
              <TimeDisplayLabel data={time} variant='buffer' />
            ))}
        </div>
      </div>
      <div className='w-full h-1/3 border-2'>
        <div className='flex w-full items-center justify-center text-center h-[20%]'>
          <pre>LS TIMES</pre>
        </div>
        <div className='flex h-[80%] w-full border-2 items-center justify-center gap-2 flex-wrap content-center'>
          {data &&
            data.loadsheddingTimes.map((time: any) => (
              <TimeDisplayLabel data={time} variant='ls' />
            ))}
        </div>
      </div>
    </div>
  );
}

export default TimeInformation;
