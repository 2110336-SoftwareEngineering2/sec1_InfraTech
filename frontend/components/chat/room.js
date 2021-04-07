import Image from 'next/image';

import Link from 'next/link'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { USER_TYPE } from '../../config/UserType.config';
import axios from 'axios';
import { API_HOST } from '../../config/config';
import useUser from '../../lib/useUser';
import { Loading } from '../common';

const Room = ({room}) => {
  const { user, _ } = useUser({});

  const [ oppositeUserInfo, setOppositeUserInfo] = useState(undefined);

  useEffect(() => {
    if (user === null) return;
    switch(user.type) {
      case USER_TYPE.TRAINEE:
        axios.get(`${API_HOST}/trainer/${room.oppositeUserId}`).then(res => setOppositeUserInfo(res.data));
    }
  }, [user, room.oppositeUserId])

  return <Link href={`/chat/${room.roomId}`}>
    <div className={"text-center p-5 cursor-pointer bg-grey hover:bg-gray-100"}>
    {
      oppositeUserInfo === undefined ? (
        <Loading/>
      ) : (
        <div>
          <Image
            src={oppositeUserInfo.profileImageUrl}
            width={36}
            height={36}
            layout="fixed"
            className="rounded-full"
          />
          <div>{oppositeUserInfo.firstname} {oppositeUserInfo.lastname}</div>
        </div>
      )
    }
    </div>
  </Link>
}
export default Room;
