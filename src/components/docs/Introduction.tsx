function Introduction() {
  return (
    <div className='flex flex-col h-fit w-fit p-6'>
      <h1 className='text-transparent bg-clip-text bg-gradient-to-r from-caqua via-cblue to-cpurple font-satoshiBold text-2xl'>
        What is LS PLANNER?
      </h1>
      <p className='text-white font-satoshi text-lg pb-6'>
        LS PLANNER is a tool that makes it simple and easy to schedule meetings and gaming
        sessions around loadshedding.
      </p>
      <h1 className='text-transparent bg-clip-text bg-gradient-to-r from-caqua via-cblue to-cpurple font-satoshiBold text-2xl'>
        How does LS PLANNER work?
      </h1>
      <p className='text-white font-satoshi text-lg pb-6'>
        Users set their loadshedding location. LS PLANNER then automatically tracks their
        loadshedding schedule through an API. The user then creates a "plan" where they
        can choose a date, start and end time and invite other users or teams to their
        plan. Other users then accept the invite and get added to the "plan". LS PLANNER
        then compares all the users on the "plan's" loadshedding times and then shows all
        available times where nobody on the "plan" has loadshedding in the chosen
        timeframe.
      </p>
      <h1 className='text-transparent bg-clip-text bg-gradient-to-r from-caqua via-cblue to-cpurple font-satoshiBold text-2xl'>
        Why use LS PLANNER?
      </h1>
      <p className='text-white font-satoshi text-lg pb-6'>
        There is nothing more frustrating than trying to do something productive or
        playing some games with friends just for loadshedding to end it. It is predicted
        that loadshedding will continue till 2027 if not longer. LS PLANNER can't do
        anything about that, but we can make it easier for you to schedule meetings and
        gaming sessions with friends.
      </p>
    </div>
  );
}

export default Introduction;
