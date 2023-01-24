import { useEffect, useState } from 'react';
import supabase from '@utils/supabase-config';
import type { Info } from '@lstypes/types';
import { Player } from "@lottiefiles/react-lottie-player";
type Props = {
  planInfo: Info;
};

function PlanInfo({ planInfo }: Props) {
  const plan_date = planInfo?.plan_createdAt.split('T')[0];
  const plan_owner = planInfo?.user_id;
  const plan_time = planInfo?.plan_createdAt.split('T')[1]!.split('.')[0];
  const ownerDisplayName = fetchPlanOwner(plan_owner);
  return (
    <div className="h-full w-3/12 flex flex-col pb-4 items-center justify-start font-satoshi gap-4">
      
      <span className='flex space-x-1 h-[50px] text-center items-center justify-center pt-4'>
        <h1 className='font-satoshiBold text-3xl text-white'>PLAN DETAILS</h1>
        <Player
          src='https://assets4.lottiefiles.com/packages/lf20_IMVScC.json'
          className='player w-[50px] h-[50px] '
          autoplay
          loop
          speed={0.8}
        />
        </span>
      <div className="flex flex-col items-center justify-center w-full h-fit">
        <h1 className="text-aqua-500 text-xl font-satoshiBold">
          PLAN CREATED BY:
        </h1>
        <h1 className="text-white text-lg font-satoshiItalic">
          {ownerDisplayName ? ownerDisplayName : plan_owner}
        </h1>
      </div>

      <div className="flex flex-col items-center justify-center w-full h-fit">
        <h1 className="text-aqua-500 text-xl font-satoshiBold">
          PLAN CREATION DATE:
        </h1>
        <h1 className="text-white text-lg font-satoshiItalic">
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
