import Image from "next/image";
import { useEffect } from "react";
import close from "../pages/assets/close.png";
function RedLabel(props: any) {
  const handleRemoveTime = (pValue: string) => {
    props.onClick(pValue);
  };

  useEffect(() => {
    const labelContainer = document.getElementById("bubbled-red-label-container");
    labelContainer?.addEventListener("click", (e: any) => {
      console.log(e.target);
      handleRemoveTime(e.currentTarget?.innerText);
    });
    return () => {
      labelContainer?.removeEventListener("click", (e) => {
        console.log("REMOVED LISTENER");
      });
    };
  }, []);

  return (
    <div
      id='bubbled-red-label-container'
      className='text-white text-1xl rounded-full bg-red-500 flex items-center justify-center px-2 py-2 font-roboto font-bold'
    >
      <h1 className='mx-2'>{props.data}</h1>
      <Image
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
