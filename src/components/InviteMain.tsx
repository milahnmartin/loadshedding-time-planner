import InviteLabel from "@comps/labels/InviteLabel";
import Head from "next/head";
const InviteMain = () => {
  return (
    <div className='h-screen w-screen overflow-y-scroll'>
      <Head>
        <title>LS Planner / Invites</title>
      </Head>

      <div className='flex min-h-[90vh] max-h-fit w-full flex-wrap content-center items-center justify-center overflow-y-scroll gap-2 py-4'>
        <InviteLabel />
        <InviteLabel />
        <InviteLabel />
        <InviteLabel />
      </div>
    </div>
  );
};

export default InviteMain;
