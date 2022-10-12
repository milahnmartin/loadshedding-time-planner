import Link from "next/link";
function IndexMain() {
  return (
    <div className='px-5 border-solid border-red-900 h-full flex justify-start items-center flex-col space-y-9 mt-[8rem]'>
      <h1 className='text-white font-bold text-4xl text-center md:text-7xl'>
        STRUGGLING TO PLAN YOUR GAMING
      </h1>
      <h1 className='text-white font-extralight text-5xl text-center md:text-7xl'>
        SESSIONS AROUND{" "}
      </h1>
      <h1 className='font-extrabold text-4xl animate-pulse text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-primary to-amber-300 py-4 md:text-8xl'>
        LOADSHEDDING ?
      </h1>
      <div className='flex w-full h-auto items-center justify-center space-y-5 flex-col md:flex-row md:space-x-5 md:space-y-0'>
        <Link href='/game/create'>
          <button className='py-4 px-10 w-[15rem] h-[4rem] font-bold text-white bg-primary rounded-lg transition-all duration-500 ease-in-out hover:bg-sky-700'>
            NEW PLAN
          </button>
        </Link>
        <Link href='/plans'>
          <button className='py-4 px-10 w-[15rem] h-[4rem] font-bold border-2 border-primary text-white rounded-lg transition-all duration-300 ease-in-out hover:bg-sky-600 hover:border-white'>
            SAVED PLANS
          </button>
        </Link>
      </div>
    </div>
  );
}

export default IndexMain;
