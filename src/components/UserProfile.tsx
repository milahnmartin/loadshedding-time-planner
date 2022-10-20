import Image from "next/image";
import { useState } from "react";
import ProfileModal from "./ProfileModal";
function UserProfile(props: any) {
  const [showmodal, setShowmodal] = useState(false);
  const handleShowModal = () => {
    setShowmodal((prev) => !prev);
  };

  return (
    <div className='rounded-full h-fit flex items-center justify-center relative border-2 border-cblue'>
      <Image
        id='profile-img'
        onClick={handleShowModal}
        src={props.src}
        width={50}
        height={50}
        className='rounded-full cursor-pointer hover:scale-95 transition-all duration-200'
      />
      {showmodal && <ProfileModal />}
    </div>
  );
}

export default UserProfile;
