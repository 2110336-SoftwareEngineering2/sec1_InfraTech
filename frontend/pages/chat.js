import React, { useState } from 'react';

import useUser from '../lib/useUser';
import { AppLayout } from '../components/common';
import { Button, Input, List } from 'antd';
import Image from 'next/image';

function ChatItem({message, avatar, at, bySelf}) {
  return (
    <div className={"flex " + (bySelf ? "justify-end" : "")}>
      <div className={"flex " + (bySelf ? "justify-end" : "")} style={{flexBasis: "75%"}}>
        <div className="mr-2">
          <Image
            src={avatar}
            width={36}
            height={36}
            layout="fixed"
            className="rounded-full"
          />
        </div>
        <div className={"flex flex-col " + (bySelf ? "align-end" : "")}>
          <div className="p-2 bg-gray-200 rounded-xl">{message}</div>
          <div className="text-xs mt-1 text-gray-400">{at.toLocaleString()}</div>
        </div>
      </div>
    </div>
  )
}

const Chat = () => {
  const { user, mutateUser } = useUser({});

  const [messageInput, setMessageInput] = useState("")

  const [messages, setMessages] = useState([
    {
      message: "hello world",
      avatar: "/avatar.svg",
      at: new Date(),
      bySelf: true
    },
    {
      message: "สวัสดีคนไทย",
      avatar: "/avatar.svg",
      at: new Date(),
      bySelf: false
    },
    {
      message: "O_O",
      avatar: "/avatar.svg",
      at: new Date(),
      bySelf: true
    }
  ])

  const sendMessage = () => {
    console.log(messageInput, user)
  }

  const onMessageInputChange = (e) => {
    setMessageInput(e.target.value);
  }

  const messageInputKeyDown = (e) => {
    if (e.keyCode === 13) sendMessage()
  }

  return (
    <AppLayout user={user} mutateUser={mutateUser}>
      <div className="min-h-screen bg-white mx-8 mt-8 py-12 px-12">
        <div className="text-3xl font-bold">Chat</div>
        <div className="text-2xl font-bold my-6">Chomtana Chanjaraswichai</div>
        
        <List
          dataSource={messages}
          itemLayout="vertical"
          renderItem={(item) => <ChatItem {...item} />}
        />

        {/* Chat control system */}
        <div className="flex mt-4">
          <Input value={messageInput} onChange={onMessageInputChange} onKeyDown={messageInputKeyDown}></Input>
          <Button type="primary" onClick={sendMessage}>Send</Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default Chat;
