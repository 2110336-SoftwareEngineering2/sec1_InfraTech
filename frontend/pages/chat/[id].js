import React, { useCallback, useEffect, useState } from 'react';

import useUser from '../../lib/useUser';
import { AppLayout } from '../../components/common';
import { Button, Empty, Input, List } from 'antd';
import Link from 'next/link';

import { subscribeMessages, subscribeRoomList, pushMessage, snapshotToArray } from '../api/chat';
import Room from '../../components/chat/room';
import Message from '../../components/chat/message';
import { useRouter } from 'next/router';

const Chat = () => {
  const router = useRouter();
  const { id } = router.query;

  const { user, mutateUser } = useUser({ redirectTo: '/login' });

  const [ messages, setMessages ] = useState([]);

  const [ roomList, setRoomList ] = useState([]);
  const [ selectedRoom, setSelectedRoom] = useState({});

  const [messageInput, setMessageInput] = useState("");

  const sendMessage = useCallback(() => {
    pushMessage(user.userId, messageInput, selectedRoom.roomId);
    setMessageInput("");
  }, [user, selectedRoom, messageInput]);

  const updateMessageInput = useCallback((e) => {
    setMessageInput(e.target.value);
  }, []);

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

  // subscribe to messages for selected room
  useEffect(() => {
    if (selectedRoom === undefined) return;

    subscribeMessages(selectedRoom.roomId, snapshot => {
      setMessages(snapshotToArray(snapshot));
    })
  }, [selectedRoom])

  return (
    <AppLayout user={user} mutateUser={mutateUser}>
      {!roomList.length ?
        <div className="flex flex-col min-h-screen bg-white mx-8 mt-8 py-12 px-12">
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="Chat Room is Empty"
          />
          <Link href="/browse">
            <Button type="primary">Start New Chat</Button>
          </Link>
        </div>
        :
        <div className="flex h-screen bg-white mx-8 mt-8 items-end">
          <div className="flex flex-col overflow-y-scroll h-full">
            {roomList.map((room, index) => <Room key={index} room={room}/>)}
          </div>

          <div className="flex flex-col flex-grow h-full pl-4">
            <div className="flex-grow overflow-y-scroll p-4">
              <List
                dataSource={messages}
                itemLayout="vertical"
                renderItem={(message) => <Message room={selectedRoom} message={message} />}
              />
            </div>

            {/* Chat control system */}
            <div className="flex my-4 mr-4">
              <Input value={messageInput} onChange={updateMessageInput} onPressEnter={sendMessage}></Input>
              <Button type="primary" onClick={sendMessage}>Send</Button>
            </div>
          </div>
        </div>
      }
    </AppLayout>
  );
};

export default Chat;
