import Image from 'next/image';
import React from 'react';
import { useRouter } from 'next/router';

const Room = ({oppositeUser, roomId, selected}) => {
  const router = useRouter();

  const onClickHandler = () => {
    router.push("/chat/" + roomId)
  }

  return <div className={"text-center p-5 cursor-pointer " + (selected ? "bg-indigo-900 text-white": "hover:bg-gray-100")} onClick={onClickHandler}>
    <Image
      src={"https://www.aceshowbiz.com/images/photo/john_cena.jpg"}
      width={36}
      height={36}
      layout="fixed"
      className="rounded-full"
    />
    <div>Somlux Kamsing</div>
    {/* <div>{oppositeUser}</div> */}
  </div>
}
export default Room;
