import { useQuery } from "@tanstack/react-query";
import supabase from "@utils/supabase-config";
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
  const newlabelcolor = classNames(
    "text-white text-1xl rounded-full flex items-center justify-start p-2 mb-2",
    {
      "bg-orange-500": LabelType.authorized,
      "bg-purple": LabelType.invited,
      "bg-cblue": LabelType.invitedPending,
    }
  );

  const { data: displayName, error, isLoading } = useFetchDisplayName(props.data);

  if (error) {
    return <div className='text-red-700 p-4 rounded-full'>error</div>;
  }
  return (
    <div className={newlabelcolor}>
      <h1 className='mx-2 font-satoshiBold w-[90%] text-center'>
        {isLoading ? "LOADING" : displayName}
      </h1>
      <AiOutlineCloseCircle
        className='cursor-pointer relative top-[1px] hover:animate-spin w-fit'
        onClick={() => props.cb(props.data)}
        size={20}
      />
    </div>
  );
}

export default RedLabel;
function useFetchDisplayName(uuid: string) {
  return useQuery(
    ["redlabel", uuid],
    async () => {
      const { data, error } = await supabase
        .from("user_info")
        .select("user_email")
        .eq("user_id", uuid);

      if (!data || error) {
        return null;
      }
      return data[0]?.user_email;
    },
    { refetchOnWindowFocus: false, staleTime: Infinity }
  );
}
