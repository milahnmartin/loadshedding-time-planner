function GreenLabel(props: any) {
  return (
    <div className='text-white text-1xl rounded-full bg-lime-500 flex items-center justify-center px-4 py-2 font-Inter font-black'>
      <pre>{props.data}</pre>
    </div>
  );
}

export default GreenLabel;
