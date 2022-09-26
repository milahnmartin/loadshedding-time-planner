import { NextPage } from "next";
import { useRouter } from "next/router";
const IdPage: NextPage = () => {
  const {
    query: { id },
  } = useRouter();
  return <div className='text-white text-4xl font-bold text-center pt-10'>{id}</div>;
};

export default IdPage;
