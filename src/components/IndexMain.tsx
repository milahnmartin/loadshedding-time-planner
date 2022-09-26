function IndexMain() {
  return (
    <div className='border-[5px] border-solid border-red-900 h-full flex justify-center items-center flex-col'>
      <h1 className='text-white font-mono text-4xl'>
        Struggling to Plan Gaming Sessions Around{" "}
        <span className='animate-pulse text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-black'>
          Loadshedding
        </span>{" "}
        ?
      </h1>
      <h2 className='text-gray-300 font-mono font-bold'>That stops today !</h2>
      <button className='py-4 px-10 font-mono text-white bg-gradient-to-r from-primary to-secondary rounded-lg'>
        CONTINUE
      </button>
    </div>
  );
}

export default IndexMain;
