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
      <h1 className='text-white font-extrabold font-Inter tracking-wide text-4xl text-center md:text-7xl'>
        STRUGGLING TO PLAN YOUR GAMING
      </h1>
      <h1 className='text-white font-Inter font-extralight tracking-wide text-5xl text-center md:text-7xl'>
        SESSIONS AROUND{" "}
      </h1>
      <h1 className='font-extrabold font-Inter text-4xl animate-pulse text-transparent bg-clip-text bg-gradient-to-r from-caqua via-cblue to-cpurple py-4 md:text-8xl'>
        LOADSHEDDING ?
      </h1>
      <div className='flex w-full h-auto items-center justify-center pt-10 flex-col md:flex-row '>
        <Link href='/plan/create'>
          <button className='relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 w-[10rem] h-[3rem] overflow-hidden text-sm font-medium text-gray-900 rounded-full group bg-gradient-to-br from-cpurple to-caqua  hover:text-white dark:text-white '>
            NEW PLAN
            <div className='relative left-[6px] top-[1px] transition-all duration-200 group-hover:text-cpurple'>
              {arrowIcon}
            </div>
          </button>
        </Link>
        <Link href='/plans'>
          <button className='relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 w-[10rem] h-[3rem] overflow-hidden text-sm font-medium text-gray-900 rounded-full group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white '>
            <span className='relative px-5 py-2.5 transition-all ease-in duration-200 w-[9.5rem] h-[2.5rem] bg-white dark:bg-gray-900 rounded-full group-hover:bg-opacity-0'>
              SAVED PLANS
            </span>
          </button>
        </Link>
      </div>
    </div>
  );
}

export default IndexMain;
