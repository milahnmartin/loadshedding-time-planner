import Link from "next/link";
function IndexMain() {
  return (
    <div className='border-solid border-red-900 h-full flex justify-start items-center flex-col space-y-9 mt-[8rem]'>
      <h1 className='text-white font-bold text-7xl text-center'>
        STRUGGLING TO PLAN YOUR GAMING
      </h1>
      <h1 className='text-white font-extralight text-7xl text-center'>
        SESSIONS AROUND{" "}
      </h1>
      <h1 className='font-extrabold text-8xl animate-pulse text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-primary to-amber-300 py-4'>
        LOADSHEDDING ?
      </h1>
      <button className='py-4 px-10 font-bold text-white bg-gradient-to-r from-primary to-secondary rounded-lg hover:from-secondary hover:to-primary'>
        <Link href='/game/create'>START PLANNING</Link>
      </button>
    </div>
  );
}

export default IndexMain;
