import TimeDisplayLabel from "@comps/labels/TimeDisplayLabel";
import TimeCalc from "@helpers/algorithm";
import useFetchLoadsheddingStatus from "@hooks/useFetchLoadsheddingStatus";
import { useEffect, useState } from "react";
import { CiCircleInfo } from "react-icons/ci";
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
        <div className='flex w-full items-center justify-center text-center h-[20%] group'>
          <span className='flex items-center justify-center gap-2'>
            <pre>AVAILABLE TIMES</pre>
            <CiCircleInfo
              title='Available Times Show times where all users are not experiencing on loadshedding'
              className='hover:text-cblue transition-colors duration-500  cursor-pointer group-hover:animate-wiggle'
              size={25}
            />
          </span>
        </div>
        <div className='flex h-[80%] w-full border-2 items-center justify-center gap-2 flex-wrap content-center'>
          {data &&
            data.availableTimes.map((time: any) => (
              <TimeDisplayLabel data={time} variant='availible' />
            ))}
        </div>
      </div>
      <div className='w-full h-1/3 border-2'>
        <div className='flex w-full items-center justify-center text-center h-[20%] group'>
          <span className='flex items-center justify-center gap-2'>
            <pre>BUFFER TIMES</pre>
            <CiCircleInfo
              title='Buffer Times add 30 min before and after each available time'
              className='hover:text-yellow-500 transition-colors duration-500  cursor-pointer group-hover:animate-wiggle'
              size={25}
            />
          </span>
        </div>
        <div className='flex h-[80%] w-full border-2 items-center justify-center gap-2 flex-wrap content-center'>
          {data &&
            data.bufferTimes.map((time: any) => (
              <TimeDisplayLabel data={time} variant='buffer' />
            ))}
        </div>
      </div>
      <div className='w-full h-1/3 border-2'>
        <div className='flex w-full items-center justify-center text-center h-[20%] group'>
          <span className='flex items-center justify-center gap-2'>
            <pre>LS TIMES</pre>
            <CiCircleInfo
              title='All Users Active Loadshedding Times'
              className='hover:text-red-700 transition-colors duration-500  cursor-pointer group-hover:animate-wiggle'
              size={25}
            />
          </span>
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
