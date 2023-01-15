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
    <div className='h-full w-6/12 p-2 border-2 text-white font-satoshi border-red-600 flex items-center justify-center flex-wrap content-start overflow-y-scroll'>
      {JSON.stringify(LSTimes, null, 2)}
      <pre className='text-white text-2xl'>{JSON.stringify(timeScope, null, 2)}</pre>
      <pre className='text-white text-2xl'>{JSON.stringify(stageData, null, 2)}</pre>

      {data &&
        data.availableTimes.map((time: any) => (
          <TimeDisplayLabel data={time} variant='availible' />
        ))}
      {data &&
        data.bufferTimes.map((time: any) => (
          <TimeDisplayLabel data={time} variant='buffer' />
        ))}

      <span className='flex gap-2 items-center justify-center'>
        {data &&
          data.loadsheddingTimes.map((time: any) => (
            <TimeDisplayLabel data={time} variant='ls' />
          ))}
      </span>
    </div>
  );
}

export default TimeInformation;
