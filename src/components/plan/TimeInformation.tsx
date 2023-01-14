import TimeCalc from "@helpers/algorithm";
import useFetchLoadsheddingStatus from "@hooks/useFetchLoadsheddingStatus";
import { useEffect, useState } from "react";
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
  const [capteTownInfo, setCapeTownInfo] = useState({} as any);
  const [eskomInfo, setEskomInfo] = useState({} as any);
  const {
    data: stageData,
    isLoading,
    isFetching,
    refetch,
  } = useFetchLoadsheddingStatus();

  useEffect(() => {
    if (isFetching) return;
    (() => {
      const capeTownTimes = [] as string[];
      const eskomTimes = [] as string[];
      const capeTownStage = stageData.capetown.stage;
      const eskomStage = stageData.eskom.stage;
      const capeTownUsers = LSTimes.filter(
        (time: any) => time.stageRegion === "capetown"
      );
      const eskomUsers = LSTimes.filter((time: any) => time.stageRegion === "eskom");

      for (const cpUser of capeTownUsers) {
        const userStagesTimes = cpUser?.timeData[0]?.stages;
        capeTownTimes.push(...userStagesTimes[+capeTownStage + 1]);
      }
      for (const esUser of eskomUsers) {
        const userStagesTimes = esUser?.timeData[0]?.stages;
        eskomTimes.push(...userStagesTimes[+eskomStage + 1]);
      }
      setCapeTownInfo({
        times: capeTownTimes,
      });
      setEskomInfo({
        times: eskomTimes,
      });
    })();
  }, [isFetching, LSTimes, timeScope]);

  return (
    <div className='h-full w-6/12 border-2 text-white font-satoshi border-red-600 flex items-center justify-center flex-wrap content-start overflow-y-scroll'>
      {JSON.stringify(
        new TimeCalc(
          { capeTown: capteTownInfo, eskom: eskomInfo },
          { start: timeScope.start, end: timeScope.end, date: new Date(timeScope.date) }
        )
          .handleCapeTown()
          .handleEskom().times
      )}
    </div>
  );
}

export default TimeInformation;
