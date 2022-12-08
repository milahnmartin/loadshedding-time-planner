import classNames from "classnames";
import { AiOutlineCloseCircle } from "react-icons/ai";
enum LabelType {
  authorized,
  invited,
  invitedPending,
}

type LabelData = {
  data: string;
  args: LabelType;
  cb: (val: string) => void;
};

function RedLabel(props: LabelData) {
  const LabelColor = classNames(
    props.args === LabelType.authorized
      ? "text-white text-1xl rounded-full bg-orange-500 flex items-center justify-around px-2 py-2 mb-2"
      : props.args === LabelType.invited
      ? "text-white text-1xl rounded-full bg-cpurple flex items-center justify-around px-2 py-2 mb-2"
      : "text-white text-1xl rounded-full bg-cblue flex items-center justify-around px-2 py-2 mb-2"
  );

  return (
    <div className={LabelColor}>
      <h1 className='mx-2 font-satoshiBold'>{props.data}</h1>
      <AiOutlineCloseCircle
        className='cursor-pointer relative top-[1px] hover:animate-spin'
        onClick={() => props.cb(props.data)}
        size={20}
      />
    </div>
  );
}

export default RedLabel;
