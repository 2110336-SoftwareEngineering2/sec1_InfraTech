import Image from 'next/image';
import React from 'react';

const Room = ({oppositeUser, onClick}) => {
  return <div className="text-center p-5 hover:bg-gray-100 cursor-pointer" onClick={onClick}>
    <Image
      src={"/avatar.svg"}
      width={36}
      height={36}
      layout="fixed"
      className="rounded-full"
    />
    <div>{oppositeUser}</div>
  </div>
}
export default Room;
