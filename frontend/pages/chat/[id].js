import React, { createContext, useEffect, useState } from 'react';

import useUser from '../../lib/useUser';
import { AppLayout } from '../../components/common';
import { Button, Empty } from 'antd';
import Link from 'next/link';

import { read, subscribeRoomList } from '../api/chat';
import Room from '../../components/chat/Room';
import MessageInput from '../../components/chat/MessageInput';
import { useRouter } from 'next/router';
import MessageView from '../../components/chat/MessageView';
import { USER_TYPE } from '../../config/UserType.config';
import RoomList from '../../components/chat/RoomList';

const roomComparator = (pairA, pairB) => {
  const lastUpdateA = new Date(pairA[1].lastUpdate);
  const lastUpdateB = new Date(pairB[1].lastUpdate);
  if (lastUpdateA < lastUpdateB) {
    return 1;
  } else {
    return -1;
  }
}

export const ChatContext = createContext({});

const Chat = () => {
  const router = useRouter();
  const { id } = router.query;

  const { user, mutateUser } = useUser({ redirectTo: '/login' });

  const [ roomList, setRoomList ] = useState([]);
  const [ selectedRoom, setSelectedRoom ] = useState(undefined);

  // subscribe to room list and select room by query.id
  useEffect(() => {
    if (user === null || !id) return;

    subscribeRoomList(user.userId, snapshot => {
      const roomList = Object.entries(snapshot).sort(roomComparator).map(pair => ({
        roomId: pair[0],
        ...pair[1],
      }));

      if (snapshot[id] === undefined && roomList.length) {
        router.push(`/chat/${roomList[0].roomId}`).then();
        return;
      }

      setRoomList(roomList);
      setSelectedRoom({
        ...snapshot[id],
        roomId: id,
      });
    });
  }, [user, id]);

  return (
    <AppLayout user={user} mutateUser={mutateUser} fitScreen={true}>
      <ChatContext.Provider value={selectedRoom}>
      <div className="flex h-full">
      {!roomList.length ? (
        <div className="flex flex-col flex-grow bg-white mx-8 mt-8 py-12 px-12" >
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="Chat Room is Empty"
          />
          {user?.type === USER_TYPE.TRAINEE ? (
            <Link href="/browse">
              <Button type="primary">Start New Chat</Button>
            </Link>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <div className="flex flex-grow bg-white mx-8 mt-8 items-start">
          <RoomList roomList={roomList}/>
          <div className="flex flex-col flex-grow h-full pl-4">
            <MessageView/>
            <MessageInput/>
          </div>
        </div>
      )}
      </div>
      </ChatContext.Provider>
    </AppLayout>
  );
};

export default Chat;
