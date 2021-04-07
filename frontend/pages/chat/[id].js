import React, { useCallback, useEffect, useState } from 'react';

import useUser from '../../lib/useUser';
import { AppLayout } from '../../components/common';
import { Button, Empty, Input, List } from 'antd';
import Link from 'next/link';

import { subscribeMessages, subscribeRoomList, pushMessage, snapshotToArray } from '../api/chat';
import Room from '../../components/chat/Room';
import Message from '../../components/chat/Message';
import MessageInput from '../../components/chat/MessageInput';
import { useRouter } from 'next/router';
import MessageView from '../../components/chat/MessageView';

const Chat = () => {
  const router = useRouter();
  const { id } = router.query;

  const { user, mutateUser } = useUser({ redirectTo: '/login' });

  const [ messages, setMessages ] = useState([]);

  const [ roomList, setRoomList ] = useState([]);
  const [ selectedRoom, setSelectedRoom ] = useState({});

  // subscribe to room list and select room by query.id
  useEffect(() => {
    if (user === null) return;

    subscribeRoomList(user.userId, snapshot => {
      const roomList = snapshotToArray(snapshot);
      setRoomList(roomList);

      const selectedRoom = roomList.find(room => room.roomId === id);
      setSelectedRoom(selectedRoom);

      if (selectedRoom === undefined && roomList.length) {
        router.push(`/chat/${roomList[0].roomId}`).then();
      }
    });
  }, [user, id]);

  return (
    <AppLayout user={user} mutateUser={mutateUser}>
      {!roomList.length ? (
        <div className="flex flex-col min-h-screen bg-white mx-8 mt-8 py-12 px-12">
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="Chat Room is Empty"
          />
          <Link href="/browse">
            <Button type="primary">Start New Chat</Button>
          </Link>
        </div> ) : (
        <div className="flex h-screen bg-white mx-8 mt-8 items-end">
          <div className="flex flex-col overflow-y-scroll h-full min-w-min">
            {roomList.map((room, index) => <Room key={index} room={room}/>)}
          </div>
          {selectedRoom === undefined ? (
            <></>
          ) : (
            <div className="flex flex-col flex-grow h-full pl-4">
              <MessageView selectedRoom={selectedRoom}/>
              <MessageInput userId={user.userId} roomId={selectedRoom.roomId}/>
            </div>
          )}
        </div>
      )}
    </AppLayout>
  );
};

export default Chat;
