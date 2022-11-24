import classNames from "classnames";
import { AiOutlineCloseCircle } from "react-icons/ai";
type LabelData = {
  data: string;
  args: boolean;
  cb: (val: string) => void;
};

function RedLabel(props: LabelData) {
  const LabelColor = classNames(
    props.args
      ? "text-white text-1xl rounded-full bg-orange-500 flex items-center justify-center px-2 py-2 font-Inter font-bold mb-2"
      : "text-white text-1xl rounded-full bg-cpurple flex items-center justify-center px-2 py-2 font-Inter font-bold mb-2"
  );

  return (
    <div id='bubbled-red-label-container' className={LabelColor}>
      <h1 className='mx-2'>{props.data}</h1>
      <AiOutlineCloseCircle
        className='cursor-pointer relative top-[1px] hover:animate-spin'
        onClick={() => props.cb(props.data)}
        size={20}
      />
    </div>
  );
}

export default RedLabel;
