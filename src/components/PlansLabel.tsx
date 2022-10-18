const PlansLabel = () => {
  return (
    <div className='flex flex-col bg-slate-400 w-[30%] h-[30%] rounded-sm text-white font-sans'>
      <div className='h-[85%] w-full flex flex-col items-center justify-evenly border-2'>
        <h1>Game ID: 876-3566-2345-245</h1>
        <h1>Loadshedding Times: 12:00-15:00</h1>
        <h1>Users:</h1>
      </div>
      <div className='h-[15%] flex w-full justify-center'>
        <button className='w-full p-2 text-white font-bold bg-sky-500 rounded-sm border-none tracking-wide transition-color duration-300 hover:bg-primary'>
          VIEW PLAN
        </button>
      </div>
    </div>
  );
};

export default PlansLabel;
