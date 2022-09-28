import Image from "next/image";
import Link from "next/link";
import Logo from "../pages/assets/Light-bulb.png";
function Navbar() {
  return (
    <div className='h-[5rem] flex place-items-center'>
      <div className='h-auto w-[50%] flex items-center justify-start pl-5'>
        <Image height={30} width={30} src={Logo} alt='Image of Lightbulb' />
        <h1 className='hidden font-rajad text-white text-3xl tracking-wide ml-2 md:inline'>
          LS GAME PLANNER
        </h1>
      </div>
      <div className='h-auto w-[50%] flex items-center justify-end pr-5'>
        <h1 className='font-bold text-white text-1xl tracking-wide ml-5'>
          <Link href='#'>DOCS</Link>
        </h1>
        <h1 className='font-bold text-white text-1xl tracking-wide ml-5'>
          <Link href='#'>INSTRUCTION</Link>
        </h1>
      </div>
    </div>
  );
}

export default Navbar;
