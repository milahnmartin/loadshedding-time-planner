import TimeCalc from "@helpers/algorithm";
type Times = {
  bufferTimes: any[];
  availableTimes: any[];
  loadsheddingTimes: any[];
};

function TimeInformation() {
  const Times = new TimeCalc(["13:00-15:00"]).handleCalculation().times;
  return (
    <div className='h-full w-6/12 border-2 border-red-600 flex items-center justify-center'>
      <pre className='text-white font-sathosiBlack text-2xl'>
        {Times && JSON.stringify(Times)}
      </pre>
    </div>
  );
}

export default TimeInformation;
