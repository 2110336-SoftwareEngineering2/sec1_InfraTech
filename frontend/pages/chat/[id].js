import React, { useEffect, useState } from 'react';

import useUser from '../../lib/useUser';
import { AppLayout } from '../../components/common';
import { Button, Empty, Input, List } from 'antd';
import Link from 'next/link'

import { snapshotToArray, sendMessage, getMessages, getRoom } from '../api/chat';
import Room from '../../components/chat/room';
import Message from '../../components/chat/message';
import { useRouter } from 'next/router';

const Chat = () => {
  const router = useRouter();
  const { id } = router.query;

  const { user, mutateUser } = useUser({});

  const [messages, setMessages] = useState([])

  const [rooms, setRooms] = useState([]);
  const [selectedRoomIndex, setSelectedRoomIndex] = useState();

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
      const rooms = snapshotToArray(snapshot);
      const selectedRoomIndex = rooms.findIndex(room => room.roomId === id);
      if (selectedRoomIndex < 0 && rooms.length) {
        router.push("/chat/" + rooms[0].roomId);
      } else {
        setRooms(snapshotToArray(snapshot));
        setSelectedRoomIndex(selectedRoomIndex);
      }
    });
  }, [user, id])

  useEffect(() => {
    if (noRoomAvailable || selectedRoomIndex === undefined) return;
    getMessages(rooms[selectedRoomIndex].roomId, snapshot => {
      setMessages(snapshotToArray(snapshot).map(msg => ({
        message: msg.message,
        avatar: "/avatar.svg",
        bySelf: msg.sender === user.userId,
        at: new Date(msg.at),
      })));
    });
  }, [noRoomAvailable, selectedRoomIndex])

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
        <div className="flex h-screen bg-white mx-8 mt-8 items-end">
          <div className="flex flex-col overflow-y-scroll h-full">
            {rooms.map((room, index) => <Room key={index} oppositeUser={room.oppositeUserId} selected={id === room.roomId} roomId={room.roomId}/>)}
          </div>

          <div className="flex flex-col flex-grow h-full pl-4">
            <div className="flex-grow overflow-y-scroll p-4">
              <List
                dataSource={messages}
                itemLayout="vertical"
                renderItem={(item) => <Message {...item} />}
              />
            </div>

            {/* Chat control system */}
            <div className="flex my-4 mr-4">
              <Input value={messageInput} onChange={onMessageInputChange} onKeyDown={messageInputKeyDown}></Input>
              <Button type="primary" onClick={onSendBtnClick}>Send</Button>
            </div>
          </div>
        </div>
      }
    </AppLayout>
  );
};

export default Chat;
