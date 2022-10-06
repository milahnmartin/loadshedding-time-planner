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
      <Link href='/game/create'>
        <button className='py-4 px-10 font-bold text-white bg-gradient-to-r from-primary to-secondary rounded-lg hover:from-secondary hover:to-primary'>
          START PLANNING
        </button>
      </Link>
    </div>
  );
}

export default IndexMain;
