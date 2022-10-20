import Image from "next/image";
import Link from "next/link";
import Logo from "../pages/assets/Logov3.png";
function Footer() {
  return (
    <div className='w-full h-full flex flex-col justify-end items-center text-white space-y-14 mb-14'>
      <div className='w-[75%] flex flex-col items-center font-roboto space-y-10 md:flex-row md:justify-start md:space-y-0'>
        <div className='flex flex-col items-center w-[75%] space-y-5'>
          <h1 className='font-extrabold'>SOCIAL MEDIA</h1>
          <h1 className='font-light'>Twitter</h1>
          <h1 className='font-light'>Instagram</h1>
          <h1 className='font-light'>LinkedIn</h1>
        </div>
        <div className='flex flex-col items-center w-[75%] space-y-5'>
          <h1 className='font-extrabold'>NAVIGATE</h1>
          <h1 className='font-light hover:font-bold hover:animate-pulse'>
            <Link href='/'>Home</Link>
          </h1>
          <h1 className='font-light hover:font-bold hover:animate-pulse'>
            <Link href='/plan/create'>Create New Plan</Link>
          </h1>
          <h1 className='font-light hover:font-bold hover:animate-pulse'>
            <Link href='/docs'>Docs</Link>
          </h1>
        </div>
        <div className='flex flex-col items-center w-[75%] space-y-5'>
          <h1 className='font-extrabold'>DOCS</h1>
          <h1 className='font-light'>Twitter</h1>
          <h1 className='font-light'>Instagram</h1>
          <h1 className='font-light'>LinkedIn</h1>
        </div>
      </div>
      <hr className='my-4 mx-auto w-[75%] h-1 bg-cblue rounded border-0 md:my-10'/>
      <div className='flex flex-col w-full items-center justify-center space-y-5 md:space-x-8 md:flex-row md:space-y-0'>
        <Image width={60} height={60} src={Logo} alt='Image Of Light' />
        <h1 className='font-roboto font-extrabold text-1xl tracking-wide text-center md:text-4xl'>
          LS GAMING PLANNER
        </h1>
      </div>
    </div>
  );
}

export default Footer;
