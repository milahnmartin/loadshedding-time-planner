import Image from "next/image";
import close from "../pages/assets/close.png";
function RedLabel(props: any) {
  const removeTime = (e: any) => {
    const newUsers = props?.state?.users.filter(
      (item: string, index: number) => index !== Number(e.target.id)
    );
    props?.state?.setUsers(newUsers);
  };

  return (
    <div
      id='bubbled-red-label-container'
      className='text-white text-1xl rounded-full bg-red-500 flex items-center justify-center px-2 py-2 font-roboto font-bold'
    >
      <h1 className='mx-2'>{props.data}</h1>
      <Image
        onClick={removeTime}
        id={props.pKey}
        className='cursor-pointer '
        src={close}
        width={20}
        height={20}
      />
    </div>
  );
}

export default RedLabel;
