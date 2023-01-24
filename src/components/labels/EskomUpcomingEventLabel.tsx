import classNames from "classnames";
type Props = {
  stage: number;
  stage_start_timestamp: string;
};

function EskomUpcomingEventLabel({ stage, stage_start_timestamp }: Props) {
  const time = stage_start_timestamp.toString().slice(11, 16).toString();
  const date = stage_start_timestamp.toString().slice(0, 10).toString();
  const stageClassnames = classNames("font-satoshiBold text-lg", {
    "text-red-800": stage == 8,
    "text-red-500": stage == 7,
    "text-yellow-600": stage == 6,
    "text-yellow-500": stage == 5,
    "text-c2purple": stage == 4,
    "text-blue-500": stage == 3,
    "text-aqua-500": stage == 2,
    "text-aqua-200": stage == 1,
    "text-green-300": stage == 0,
  });
  return (
    <span className={stageClassnames}>
      Stage {stage} @ {date} - {time}
    </span>
  );
}

export default EskomUpcomingEventLabel;
