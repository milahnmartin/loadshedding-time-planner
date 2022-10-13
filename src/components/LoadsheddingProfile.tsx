import Image from "next/image";
import Logo from "../pages/assets/Light-bulb.png";
const LoadsheddingProfile = () => {
  return (
    <div className='p-5 flex items-center flex-col border-2 borde-solid border-white w-full h-full relative'>
      <Image
        className='opacity-5 absolute'
        layout='fill'
        src={Logo}
        alt='Image of Lightbulb'
      />
      <h1 className='text-center font-extrabold mb-5 text-4xl animate-pulse text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-primary to-amber-300 py-4 md:text-8xl'>
        Loadshedding Information
      </h1>
    </div>
  );
};

export default LoadsheddingProfile;
