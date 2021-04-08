import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import Message from './Message';
import { read, snapshotToArray, subscribeMessages } from '../../pages/api/chat';
import useUser from '../../lib/useUser';
import { ChatContext } from '../../pages/chat/[id]';

const MessageView = () => {
  const { user, } = useUser({ redirectTo: '/login' });
  const selectedRoom = useContext(ChatContext)

  const [ messages, setMessages ] = useState([]);

  const ending = useRef(null);

  useEffect(() => {
    if (user === null || selectedRoom === undefined) return;

    subscribeMessages(selectedRoom.roomId, snapshot => {
      setMessages(snapshotToArray(snapshot));
    });
  }, [selectedRoom?.roomId, user]);

  useEffect(() => {
    ending.current?.scrollIntoView();
  }, [messages])


  const renderListItem = useCallback((message, index) => {
    if (user === null || selectedRoom === undefined) return;
    if (message.sender === user.userId) {
      return <Message key={index} bySelf={true} text={message.text} at={message.at} profile={user.profileImageUrl}/>
    } else {
      return <Message key={index} bySelf={false} text={message.text} at={message.at} profile={selectedRoom.oppositeUser.profile}/>
    }
  }, [user, selectedRoom]);

  return <div className="flex-grow overflow-y-scroll p-4">
    {messages.map(renderListItem)}
    <div ref={ending}></div>
  </div>
}
export default MessageView;
