import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase-config";

const TeamProfile = () => {
  const [user, loading] = useAuthState(auth);
  return (
    <div className='p-5 w-full h-full flex items-center flex-col'>
      <div className='w-full flex flex-col items-center justify-start'></div>
    </div>
  );
};

export default TeamProfile;
