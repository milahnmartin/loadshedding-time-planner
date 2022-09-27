import Image from "next/image";
import Logo from "../pages/assets/Light-bulb.png";
function Navbar() {
  return (
    <div className='h-[5rem] flex place-items-center'>
      <div className='h-auto w-[50%] flex items-center justify-start pl-5'>
        <Image height={30} width={30} src={Logo} alt='Image of Lightbulb' />
        <h1 className='font-rajad text-white text-3xl tracking-wide ml-2'>
          LS GAME PLANNER
        </h1>
      </div>
      <div className='h-auto w-[50%] flex items-center justify-end pr-5'>
        <h1 className='font-light text-white text-3xl tracking-wide ml-5'>
          Right Side
        </h1>
      </div>
    </div>
  );
}

export default Navbar;
