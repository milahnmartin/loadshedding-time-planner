import DataControllers from "./DataControllers";

function GameSpecific() {
  return (
    <div className='w-full h-full flex items-center justify-start flex-col pt-10'>
      <h1 className='font-extrabold text-4xl animate-pulse text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-primary to-amber-300 md:text-7xl'>
        Start Adding New Players !
      </h1>
      <DataControllers />
    </div>
  );
}

export default GameSpecific;
