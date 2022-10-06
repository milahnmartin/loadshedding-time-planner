function DocsContent() {
  return (
    <div className='h-full w-full'>
      <div className='flex h-[90%] border-2 border-white border-solid'>
        <div className='flex flex-col space-y-2 w-1/3 p-2 border-primary border-solid border-2 font-roboto text-white text-2xl'>
          <h1>FIRST THING</h1>
          <h1>FIRST THING</h1>
          <h1>FIRST THING</h1>
          <h1>FIRST THING</h1>
        </div>
        <div className='flex w-2/3 overflow-scroll'>
          <div className='flex'></div>
        </div>
      </div>
    </div>
  );
}

export default DocsContent;
