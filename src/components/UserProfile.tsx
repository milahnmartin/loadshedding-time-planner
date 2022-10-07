import Image from "next/image";
import { useState } from "react";
import ProfileModal from "./ProfileModal";
function UserProfile(props: any) {
  const [showmodal, setShowmodal] = useState(false);
  const handleShowModal = () => {
    setShowmodal((prev) => !prev);
  };

  return (
    <div className='rounded-full flex items-center justify-center ml-5 relative'>
      <Image
        id='profile-img'
        onClick={handleShowModal}
        src={props.src}
        width='45'
        height='45'
        className='rounded-full cursor-pointer hover:scale-110 transition transform duration-200 ease-out'
      />
      {showmodal && <ProfileModal />}
    </div>
  );
}

export default UserProfile;
