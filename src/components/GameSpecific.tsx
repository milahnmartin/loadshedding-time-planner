import DataControllers from "./DataControllers";

function GameSpecific() {
  return (
    <div className='w-full h-full flex items-center justify-center flex-col space-y-7'>
      <h1 className='text-white text-4xl mb-5'>Start Adding New Players !</h1>
      <DataControllers />
    </div>
  );
}

export default GameSpecific;
