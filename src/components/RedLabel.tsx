import Image from "next/image";
import close from "../pages/assets/close.png";
function RedLabel(props: any) {
  return (
    <div
      id='bubbled-red-label-container'
      className='text-white text-1xl rounded-full bg-red-500 flex items-center justify-center px-2 py-2 font-Inter font-bold mb-2'
    >
      <h1 className='mx-2'>{props.data}</h1>
      <Image
        onClick={() => props.cb(props.data)}
        className='cursor-pointer'
        src={close}
        width={20}
        height={20}
      />
    </div>
  );
}

export default RedLabel;
