import Link from "next/link";
function IndexMain() {
  const arrowIcon = (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={1.5}
      stroke='currentcolor'
      className='w-6 h-6'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3'
      />
    </svg>
  );
  return (
    <div className='px-5 border-solid border-red-900 h-full flex justify-start items-center flex-col space-y-9 mt-[9rem]'>
      <h1 className='text-white font-bold text-4xl text-center md:text-7xl'>
        STRUGGLING TO PLAN YOUR GAMING
      </h1>
      <h1 className='text-white font-extralight text-5xl text-center md:text-7xl'>
        SESSIONS AROUND{" "}
      </h1>
      <h1 className='font-extrabold text-4xl animate-pulse text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-primary to-amber-300 py-4 md:text-8xl'>
        LOADSHEDDING ?
      </h1>
      <div className='flex w-full h-auto items-center justify-center pt-10 space-y-5 flex-col md:flex-row md:space-x-5 md:space-y-0'>
        <Link href='/game/create'>
          <button className='flex items-center justify-center py-4 px-10 w-[15rem] h-[3.5rem] font-bold text-white bg-primary rounded-lg transition-all duration-700 ease-in-out hover:bg-sky-700'>
            <div className='mr-5'>NEW PLAN</div>
            <div className='relative top-[1px]'>{arrowIcon}</div>
          </button>
        </Link>
        <Link href='/plans'>
          <button className='py-4 px-10 w-[15rem] h-[3.5rem] font-bold border-2 border-primary text-white rounded-lg transition-all duration-700 ease-in-out hover:bg-sky-700 hover:border-white'>
            SAVED PLANS
          </button>
        </Link>
      </div>
    </div>
  );
}

export default IndexMain;
