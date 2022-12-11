import ProfileModal from "@comps/navbar/ProfileModal";
import Image from "next/image";
import { useEffect, useState } from "react";
function UserProfile(props: any) {
  const [showmodal, setShowmodal] = useState(false);
  const handleShowModal = () => {
    setShowmodal((prev) => !prev);
  };
  useEffect(() => {
    const handleModalClickOutside = (e: any) => {
      if (!e) return;
      let nodeList = [...e.target!.classList];
      if (e.target?.id !== "profile-img" && !nodeList.includes("modal-data")) {
        setShowmodal(false);
      }
    };
    document.addEventListener("click", handleModalClickOutside);

    return () => document.removeEventListener("click", handleModalClickOutside);
  }, []);

  return (
    <div className='rounded-full h-fit flex items-center justify-center relative p-[2px] bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500'>
      <Image
        id='profile-img'
        onClick={handleShowModal}
        src={props.src}
        width={55}
        height={55}
        alt='profile img'
        className='rounded-full cursor-pointer hover:scale-95 transition-all duration-200'
      />
      {showmodal && <ProfileModal />}
    </div>
  );
}

export default UserProfile;
