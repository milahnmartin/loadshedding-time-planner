import TimeDisplayLabel from "@comps/labels/TimeDisplayLabel";
import TimeCalc from "@helpers/algorithm";
import { useEffect, useState } from "react";
import { CiCircleInfo } from "react-icons/ci";
type Times = {
  bufferTimes: string[];
  availableTimes: string[];
  filteredTimes: string[];
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
  stageData: {
    data: any;
    stageDataLoading: boolean;
  };
};

const controller = new AbortController();

function TimeInformation({ LSTimes, timeScope, stageData }: Props) {
  console.log("RENDER", stageData);
  const [calcData, calcLoading] = useCalcTimes(
    LSTimes,
    timeScope,
    stageData.data,
    controller
  );
  if (calcLoading || stageData.stageDataLoading || !calcData) {
    return (
      <div className='h-full w-6/12 border-2 flex-col text-white font-satoshi border-red-600 flex items-center justify-center flex-wrap content-start overflow-y-scroll'>
        <pre className='text-white text-sm font-satoshiBold'>
          {JSON.stringify(stageData, null, 2)}
        </pre>
        <pre>{JSON.stringify(calcLoading)}</pre>
        <pre>{JSON.stringify(calcData)}</pre>
      </div>
    );
  }
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
          {/* THIS IS AVAILABLE TIMES */}
          {calcData.availableTimes?.map((time: string) => (
            <TimeDisplayLabel variant='availible' data={time} />
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
          {/* THS IS BUFFER TIMES */}
          {calcData.bufferTimes?.map((time: string) => (
            <TimeDisplayLabel variant='buffer' data={time} />
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
          {/* THIS IS LS TIMES */}
          {calcData.filteredTimes?.map((time: string) => (
            <TimeDisplayLabel variant='ls' data={time} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default TimeInformation;

function useCalcTimes(
  times: any[],
  timescope: any,
  stageData: any,
  controller: AbortController
) {
  const [data, setData] = useState<any>({});
  const [calcLoading, setcalcLoading] = useState<boolean>(true);
  console.log("USECALC HIT");
  5;
  useEffect(() => {
    if (!stageData || !timescope || !times) return;
    (async () => {
      const calcInstance = new TimeCalc(times, timescope, stageData);
      const { availableTimes, bufferTimes, filteredTimes }: Times =
        await calcInstance.constructTimes(controller.signal);
      setData({ availableTimes, bufferTimes, filteredTimes });
      setcalcLoading(false);
    })();

    return () => controller.abort();
  }, [times, timescope, stageData]);
  return [data, calcLoading];
}
