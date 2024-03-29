import TimeDisplayLabel from '@comps/labels/TimeDisplayLabel';
import TimeCalc from '@helpers/algorithm';
import { useEffect, useState } from 'react';
import LottieLoadJson from '@assets/90918-charging-electricity.json';
import { CiCircleInfo } from 'react-icons/ci';
import Lottie from 'react-lottie-player';
import { Player } from '@lottiefiles/react-lottie-player';
import { v4 as uuidv4 } from 'uuid';
type Times = {
  bufferTimes: string[];
  availableTimes: string[];
  filteredTimes: string[];
};

type MyTimes = {
  timeData: { date: string; name: string; stages: string[][] };
  stageRegion: 'eskom' | 'capetown';
};

type Props = {
  LSTimes: MyTimes[];
  timeScope: {
    start: string;
    end: string;
    date: string;
    minPlanTime: number;
  };
  stageData: {
    data: any;
    stageDataLoading: boolean;
  };
};

function TimeInformation({ LSTimes, timeScope, stageData }: Props) {
  const [calcData, calcLoading] = useCalcTimes(
    LSTimes,
    timeScope,
    stageData.data,
    timeScope.minPlanTime
  );
  if (calcLoading || stageData.stageDataLoading || !calcData) {
    return (
      <div className="h-full w-6/12  flex items-center justify-center">
        <Lottie
          loop
          animationData={LottieLoadJson}
          play
          style={{ width: 400, height: 400 }}
        />
      </div>
    );
  }
  return (
    <div className="h-full w-6/12  flex-col text-white font-satoshi  flex items-center justify-center flex-wrap content-start overflow-y-scroll">
      <div className=" w-full h-1/3 ">
        <span className="flex space-x-1 h-[50px] text-center items-center justify-center pt-4">
          <h1 className="font-satoshiBold text-3xl text-white">
            PLAN INFORMATION
          </h1>
          <Player
            src="https://assets2.lottiefiles.com/packages/lf20_qv9hdeyy.json"
            className="player w-[50px] h-[50px] "
            autoplay
            loop
            speed={0.8}
          />
        </span>
        <div className="flex w-full items-center justify-center text-center h-[20%] group">
          <span className="flex items-center justify-center gap-2">
            <pre className="font-satoshiItalic">AVAILABLE TIMES</pre>
            <CiCircleInfo
              title="Available Times Show times where all users are not experiencing loadshedding"
              className="hover:text-cblue transition-colors duration-500  cursor-pointer group-hover:animate-wiggle"
              size={25}
            />
          </span>
        </div>
        <div className="h-[80%] w-full flex justify-center items-start flex-wrap content-start gap-1 p-1 overflow-y-scroll">
          {/* THIS IS AVAILABLE TIMES */}
          {calcData.availableTimes?.map((time: string) => (
            <TimeDisplayLabel key={uuidv4()} variant="availible" data={time} />
          ))}
        </div>
      </div>
      <div className="w-full h-1/3 ">
        <div className="flex w-full items-center justify-center text-center h-[20%] group">
          <span className="flex items-center justify-center gap-2">
            <pre className="font-satoshiItalic">BUFFER TIMES</pre>
            <CiCircleInfo
              title="Buffer Times add 30 min before and after each available time"
              className="hover:text-yellow-500 transition-colors duration-500  cursor-pointer group-hover:animate-wiggle"
              size={25}
            />
          </span>
        </div>
        <div className="h-[80%] w-full flex justify-center items-start flex-wrap content-start gap-1 p-1 overflow-y-scroll">
          {/* THS IS BUFFER TIMES */}
          {calcData.bufferTimes?.map((time: string) => (
            <TimeDisplayLabel key={uuidv4()} variant="buffer" data={time} />
          ))}
        </div>
      </div>
      <div className="w-full h-1/3 ">
        <div className="flex w-full items-center justify-center text-center h-[20%] group">
          <span className="flex items-center justify-center gap-2">
            <pre className="font-satoshiItalic">LOADSHEDDING TIMES</pre>
            <CiCircleInfo
              title="All Users Active Loadshedding Times"
              className="hover:text-red-700 transition-colors duration-500  cursor-pointer group-hover:animate-wiggle"
              size={25}
            />
          </span>
        </div>
        <div className="h-[80%] w-full flex justify-center items-start flex-wrap content-start gap-1 p-1 overflow-y-scroll">
          {/* THIS IS LS TIMES */}
          {calcData.filteredTimes?.map((time: string) => {
            if (!time) return null;
            return <TimeDisplayLabel key={uuidv4()} variant="ls" data={time} />;
          })}
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
  minPlanTime: number
) {
  const [data, setData] = useState<any>({});
  const [calcLoading, setcalcLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!stageData || !timescope || !times) return;
    (async () => {
      const calcInstance = new TimeCalc(
        times,
        timescope,
        stageData,
        minPlanTime
      );
      const { availableTimes, bufferTimes, filteredTimes }: Times =
        calcInstance.constructTimes();
      setData({ availableTimes, bufferTimes, filteredTimes });
      setcalcLoading(false);
    })();

    return () => console.log('WE DONE');
  }, [times, timescope, stageData]);
  return [data, calcLoading];
}
