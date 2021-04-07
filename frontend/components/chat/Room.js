import { useEffect, useState } from 'react';

import Link from 'next/link'
import Image from 'next/image';
import { useRouter } from 'next/router';

import { Spin } from 'antd';

const Room = ({room}) => {
  const router = useRouter();
  const currentRoomId  = router.query.id;

  return <Link href={`/chat/${room.roomId}`}>
    <div className={`text-center p-5 cursor-pointer w-52 ${currentRoomId === room.roomId ? 'border-l-8 border-room' : 'hover:bg-gray-100'}`}>
    {
      room === undefined ? (
        <Spin/>
      ) : (
        <div>
          <Image
            src={room.oppositeUser.profile}
            width={36}
            height={36}
            layout="fixed"
            className="rounded-full"
          />
          <div>{room.oppositeUser.name}</div>
        </div>
      )
    }
    </div>
  </Link>
}
export default Room;
