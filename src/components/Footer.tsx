function Footer() {
  return (
    <div className='w-full h-full flex flex-col justify-end items-center text-white space-y-14 mb-14'>
      <div className='w-[75%] flex flex-col items-center font-roboto space-y-10 md:flex-row md:justify-start md:space-y-0'>
        <div className='flex flex-col items-center w-[75%] space-y-5'>
          <h1 className='font-extrabold'>SOCIAL MEDIA</h1>
          <h1 className='font-light'>Twitter</h1>
          <h1 className='font-light'>Instagram</h1>
          <h1 className='font-light'>LinkedIn</h1>
        </div>
        <div className='flex flex-col items-center w-[75%] space-y-5'>
          <h1 className='font-extrabold'>INSTRUCTIONS</h1>
          <h1 className='font-light'>Twitter</h1>
          <h1 className='font-light'>Instagram</h1>
          <h1 className='font-light'>LinkedIn</h1>
        </div>
        <div className='flex flex-col items-center w-[75%] space-y-5'>
          <h1 className='font-extrabold'>DOCS</h1>
          <h1 className='font-light'>Twitter</h1>
          <h1 className='font-light'>Instagram</h1>
          <h1 className='font-light'>LinkedIn</h1>
        </div>
      </div>
      <hr className='text-white bg-white w-[75%]' />
      <h1 className='font-roboto font-extrabold text-1xl tracking-wide text-center md:text-4xl'>
        LOADSHEDDING GAMING PLANNER
      </h1>
    </div>
  );
}

export default Footer;
