import classNames from "classnames";
type Props = {
  stage: number;
  stage_start_timestamp: string;
};

function EskomUpcomingEventLabel({ stage, stage_start_timestamp }: Props) {
  const time = stage_start_timestamp.toString().slice(11, 16).toString();
  const date = stage_start_timestamp.toString().slice(0, 10).toString();
  const stageClassnames = classNames("font-satoshiBold text-lg", {
    "text-red-200": stage == 8,
    "text-red-300": stage == 7,
    "text-red-400": stage == 6,
    "text-red-500": stage == 5,
    "text-orange-700": stage == 4,
    "text-orange-600": stage == 3,
    "text-amber-600": stage == 2,
    "text-amber-400": stage == 1,
    "text-green-500": stage == 0,
  });
  return (
    <span className={stageClassnames}>
      Stage {stage} @ {date} - {time}
    </span>
  );
}

export default EskomUpcomingEventLabel;
