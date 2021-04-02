import React, { useState, useEffect } from 'react';

import useUser from '../lib/useUser';
import { AppLayout } from '../components/common';
import TrainerListItem from '../components/TrainerListItem';
import FilterTrainerList from '../components/FilterTrainerList';
import { List } from 'antd';
import { TrainerSortBy, TrainerSortType } from '../config/FilterTrainer.config';
import { API_HOST } from '../config/config';
import axios from 'axios';

function ChatItem({message, avatar, bySelf}) {
  return (
    <div className={"flex " + (bySelf ? "justify-end" : "")}>
      <div className={"flex " + (bySelf ? "justify-end" : "")} style={{flexBasis: "75%"}}>
        <div></div>
        <div className="p-2 bg-gray-200 rounded-xl">{message}</div>
      </div>
    </div>
  )
}

const Chat = () => {
  const { user, mutateUser } = useUser({});
  const [messages, setMessages] = useState([
    {
      message: "hello world",
      avatar: "/avatar.svg",
      bySelf: true
    },
    {
      message: "สวัสดีคนไทย",
      avatar: "/avatar.svg",
      bySelf: false
    },
    {
      message: "O_O",
      avatar: "/avatar.svg",
      bySelf: true
    }
  ])

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
      </div>
    </AppLayout>
  );
};

export default Chat;
