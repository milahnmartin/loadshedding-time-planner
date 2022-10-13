import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase-config";
const ProfileIndex = () => {
  const [user, loading] = useAuthState(auth);

  return (
    <div>
      <h1>{user?.email}</h1>
      <Image
        className='rounded-full border-2 border-solid border-sky-600'
        src={user?.photoURL as string}
        width={200}
        height={200}
      />
    </div>
  );
};

export default ProfileIndex;
