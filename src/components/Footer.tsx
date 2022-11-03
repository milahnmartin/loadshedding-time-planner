import Image from "next/image";
import Link from "next/link";
import Logo from "../pages/assets/Logov3.png";
function Footer() {
  return (
    <div className='w-full h-full flex flex-col '>
      <div className='w-full h-[40%] flex items-end justify-center'>
        <span className='relative h-fit w-fit p-4'>
          <Image
            className='cursor-pointer'
            height={200}
            width={200}
            src={Logo}
            alt='Image of Logo'
          />
          <span className='animate-ping w-full h-full rounded-full -top-1 -left-0 bg-gradient-to-t from-cpurple via-caqua to-cblue blur-lg absolute opacity-20'></span>
        </span>
      </div>
      <div className='flex flex-col items-center justify-end w-full h-[55%] text-white'>
        <div className='w-[75%] flex flex-col items-center font-Inter space-y-10 md:flex-row md:justify-start md:space-y-0'>
          <div className='flex flex-col items-center w-[75%] space-y-5'>
            <h1 className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-c2aqua via-c2blue to-c2purple'>
              SOCIAL MEDIA
            </h1>
            <h1 className='font-black hover:font-bold hover:animate-pulse'>
              <Link href='/'>Discord</Link>
            </h1>
            <h1 className='font-black hover:font-bold hover:animate-pulse'>
              <Link href='/'>Twitter</Link>
            </h1>
            <h1 className='font-black hover:font-bold hover:animate-pulse'>
              <Link href='/'>Instagram</Link>
            </h1>
          </div>
          <div className='flex flex-col items-center w-[75%] space-y-5'>
            <h1 className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-c2aqua via-c2blue to-c2purple'>
              NAVIGATE
            </h1>
            <h1 className='font-black hover:font-bold hover:animate-pulse'>
              <Link href='/'>Home</Link>
            </h1>
            <h1 className='font-black hover:font-bold hover:animate-pulse'>
              <Link href='/plan/create'>Create New Plan</Link>
            </h1>
            <h1 className='font-black hover:font-bold hover:animate-pulse'>
              <Link href='/docs'>Docs</Link>
            </h1>
          </div>
          <div className='flex flex-col items-center w-[75%] space-y-5'>
            <h1 className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-c2aqua via-c2blue to-c2purple'>
              CONTACT
            </h1>
            <h1 className='font-black hover:font-bold hover:animate-pulse'>
              <Link href='/'>loadsheddingplanner@gmail.com</Link>
            </h1>
            <h1 className='font-black hover:font-bold hover:animate-pulse'>
              <Link href='/'>Discord</Link>
            </h1>
            <h1 className='font-black hover:font-bold hover:animate-pulse'>
              <Link href='/'>Twitter</Link>
            </h1>
          </div>
        </div>
        <hr className='my-4 mx-auto w-[75%] h-1 bg-gradient-to-r from-c2aqua via-c2blue to-c2purple rounded md:my-10' />
        <div className='flex flex-col w-full items-center justify-center space-y-5 md:space-x-8 md:flex-row md:space-y-0'>
          <Image width={60} height={60} src={Logo} alt='Image Of Light' />
          <h1 className='font-Inter font-bold text-2xl tracking-widest text-center'>
            &#169; LS TIME PLANNER 2022
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Footer;
