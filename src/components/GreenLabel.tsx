type LabelProps = {
  data: string;
};

const GreenLabel = ({ data }: LabelProps) => {
  return (
    <div className='text-white text-1xl rounded-full bg-cblue flex items-center justify-center px-4 py-2 font-Inter font-black'>
      <pre>{data}</pre>
    </div>
  );
};

export default GreenLabel;
