import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
const IdPage: NextPage = () => {
  const {
    query: { id },
  } = useRouter();
  return (
    <>
      <Head>
        <title>Eskom Gaming Calc - #{id}</title>
      </Head>
      <div className='text-white text-4xl font-bold text-center pt-10'>{id}</div>
    </>
  );
};

export default IdPage;
