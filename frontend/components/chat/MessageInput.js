import { Button, Input } from 'antd';
import { useCallback, useContext, useState } from 'react';
import { pushMessage } from '../../pages/api/chat';
import useUser from '../../lib/useUser';
import { ChatContext } from '../../pages/chat/[id]';

const MessageInput = () => {
  const { user, } = useUser({});
  const selectedRoom = useContext(ChatContext);

  const [ value, setValue ] = useState("");

  const updateValue = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  const submit = useCallback(() => {
    pushMessage(user.userId, selectedRoom.oppositeUser.id, value, selectedRoom.roomId);
    setValue("");
  }, [user, selectedRoom, value]);

  return <div className="flex my-4 mr-4">
    <Input value={value} onChange={updateValue} onPressEnter={submit}></Input>
    <Button type="primary" onClick={submit}>Send</Button>
  </div>
}
export default MessageInput;