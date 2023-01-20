type Props = {
  planInfo: any;
};

function PlanInfo({ planInfo, ...props }: Props) {
  const plan_date = planInfo?.plan_createdAt.split("T")[0];
  const plan_owner = planInfo?.user_id;
  const plan_time = planInfo?.plan_createdAt.split("T")[1].split(".")[0];
  return (
    <div className='h-full w-3/12 flex flex-col'>
      <div className='flex flex-wrap text-white content-center'>
        <h1>Plan Owner</h1>
        <h1>{plan_owner}</h1>
      </div>
      <div>
        <h1>
          Plan Date: {plan_date} @ {plan_time}
        </h1>
      </div>
    </div>
  );
}

export default PlanInfo;
