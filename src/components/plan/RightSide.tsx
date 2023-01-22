import { useEffect, useState } from 'react';
import supabase from '@utils/supabase-config';
import type { Info } from '@lstypes/types';

type Props = {
  planInfo: Info;
};

function PlanInfo({ planInfo }: Props) {
  const plan_date = planInfo?.plan_createdAt.split('T')[0];
  const plan_owner = planInfo?.user_id;
  const plan_time = planInfo?.plan_createdAt.split('T')[1]!.split('.')[0];
  const ownerDisplayName = fetchPlanOwner(plan_owner);
  return (
    <div className="h-full w-3/12 flex flex-col p-4 items-center justify-start font-satoshi gap-4">
      <h1 className="text-white text-3xl font-satoshiBold">PLAN INFORMATION</h1>
     
      <div className="flex flex-col items-center justify-center w-full h-fit">
        <h1 className="text-red-700 text-3xl font-satoshiItalic">
          Plan Created By:
        </h1>
        <h1 className="text-white text-lg font-satoshi">
          {ownerDisplayName ? ownerDisplayName : plan_owner}
        </h1>
      </div>

      <div className="flex flex-col items-center justify-center w-full h-fit">
        <h1 className="text-red-700 text-3xl font-satoshiItalic">
          Plan Created When:
        </h1>
        <h1 className="text-white text-lg font-satoshi">
          {new Date(planInfo?.plan_createdAt).toLocaleString('en-ZA')}
        </h1>
      </div>
    </div>
  );
}

export default PlanInfo;

function fetchPlanOwner(planOwner: string) {
  const [owner, setOwner] = useState<string>(planOwner);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from('user_info')
        .select('user_email')
        .eq('user_id', planOwner);

      if (error || !data || data.length === 0) {
        console.log('DEV LOG - COULDNT FETCH PLAN OWNER');
        return;
      }

      const { user_email } = data[0] as { user_email: string };
      setOwner(user_email);
    })();
  }, [owner]);

  return owner;
}
