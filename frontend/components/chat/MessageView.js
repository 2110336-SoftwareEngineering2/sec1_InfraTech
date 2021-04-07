import React, { useCallback, useEffect, useRef, useState } from 'react';
import Message from './Message';
import { snapshotToArray, subscribeMessages } from '../../pages/api/chat';
import useUser from '../../lib/useUser';

const MessageView = ({selectedRoom}) => {
  const { user, _ } = useUser({ redirectTo: '/login' });
  const [ messages, setMessages ] = useState([]);

  const ending = useRef(null);

  useEffect(() => {
    if (selectedRoom === undefined) return;

    subscribeMessages(selectedRoom.roomId, snapshot => {
      setMessages(snapshotToArray(snapshot));
    })
  }, [selectedRoom]);

  useEffect(() => {
    ending.current?.scrollIntoView();
  }, [messages])

  const renderListItem = useCallback((message, index) => {
    if (user === null) return <></>
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
