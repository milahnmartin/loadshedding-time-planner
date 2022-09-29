import Image from "next/image";
import close from "../pages/assets/close.png";
function RedLabel(props: any) {
  const handleRemoveTime = (e: any) => {
    props.RemoveData(e.target.id);
  };
  return (
    <div className='text-white text-1xl rounded-full bg-red-500 flex items-center justify-center px-2 py-2 font-roboto font-bold'>
      <h1 className='mx-2'>{props.data}</h1>
      <Image
        id={props.pKey}
        onClick={handleRemoveTime}
        className='cursor-pointer '
        src={close}
        width={20}
        height={20}
      />
    </div>
  );
}

export default RedLabel;
