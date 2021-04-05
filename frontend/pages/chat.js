import React, {  useEffect, useState } from 'react';

import useUser from '../lib/useUser';
import { AppLayout } from '../components/common';
import { Button, Divider, Empty, Input, List } from 'antd';
import Link from 'next/link'

import { snapshotToArray, sendMessage, getMessages, getRoom } from './api/chat';
import Room from '../components/chat/room';
import Message from '../components/chat/message';

const Chat = () => {
  const { user, mutateUser } = useUser({});

  const [messages, setMessages] = useState([])

  const [rooms, setRooms] = useState([]);
  const [selectedRoomIndex, setSelectedRoomIndex] = useState(0);

  const [messageInput, setMessageInput] = useState("");

  const noRoomAvailable = !rooms.length;

  const onSendBtnClick = () => {
    sendMessage(user.userId, messageInput, rooms[selectedRoomIndex].roomId)
    setMessageInput("")
  }

  const onMessageInputChange = (e) => {
    setMessageInput(e.target.value);
  }

  const messageInputKeyDown = (e) => {
    if (e.keyCode === 13) onSendBtnClick()
  }

  useEffect(() => {
    if (!user) return;

    getRoom(user.userId, snapshot => {
      setRooms(snapshotToArray(snapshot));
    });

    if (noRoomAvailable) return;
    getMessages(rooms[selectedRoomIndex].roomId, snapshot => {
      setMessages(snapshotToArray(snapshot).map(msg => ({
        message: msg.message,
        avatar: "/avatar.svg",
        bySelf: msg.sender === user.userId,
        at: msg.at,
      })));
    });
  }, [user])

  return (
    <AppLayout user={user} mutateUser={mutateUser}>
      {noRoomAvailable ?
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
        <div className="min-h-screen bg-white mx-8 mt-8 py-12 px-12">
          {rooms.map((room, index) => <Room key={index} oppositeUser={room.oppositeUserId} onClick={() => setSelectedRoomIndex(index)} />)}

          <Divider />

          <div className="text-2xl font-bold my-6">{rooms[selectedRoomIndex].oppositeUserId}</div>

          <List
            dataSource={messages}
            itemLayout="vertical"
            renderItem={(item) => <Message {...item} />}
          />

          {/* Chat control system */}
          <div className="flex mt-4">
            <Input value={messageInput} onChange={onMessageInputChange} onKeyDown={messageInputKeyDown}></Input>
            <Button type="primary" onClick={onSendBtnClick}>Send</Button>
          </div>
        </div>
      }
    </AppLayout>
  );
};

export default Chat;
