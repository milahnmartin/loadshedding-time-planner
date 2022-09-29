function GreenLabel(props: any) {
  return (
    <div className='text-white text-1xl rounded-full bg-lime-500 flex items-center justify-center px-2 py-2 font-roboto font-bold'>
      <h1>{props?.data}</h1>
    </div>
  );
}

export default GreenLabel;
