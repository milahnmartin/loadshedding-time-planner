import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase-config";

const TeamProfile = () => {
  const [user, loading] = useAuthState(auth);
  return (
    <div className='p-5 w-full h-full flex items-center flex-col'>
      <div className='w-full flex flex-col items-center justify-start'>
        <h1 className='font-extrabold mb-5 text-4xl animate-pulse text-transparent bg-clip-text bg-gradient-to-r from-caqua via-cblue to-cpurple pt-4 md:text-6xl'>
          TEAM SETTINGS
        </h1>
      </div>
    </div>
  );
};

export default TeamProfile;
