import { useQuery } from "@tanstack/react-query";
import supabase from "@utils/supabase-config";
import classNames from "classnames";
import { useState } from "react";
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
  const [userDisplayName, setUserDisplayName] = useState<string | null>(null);

  const LabelColor = classNames(
    props.args === LabelType.authorized
      ? "text-white text-1xl rounded-full bg-orange-500 flex items-center justify-start px-2 py-2 mb-2"
      : props.args === LabelType.invited
      ? "text-white text-1xl rounded-full bg-cpurple flex items-center justify-start px-2 py-2 mb-2"
      : "text-white text-1xl rounded-full bg-cblue flex items-center justify-start px-2 py-2 mb-2"
  );

  const { data: displayName, error, isLoading } = useFetchDisplayName(props.data);

  return (
    <div className={LabelColor}>
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
