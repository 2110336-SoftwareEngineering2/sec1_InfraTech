import { Button, Input } from 'antd';
import { useCallback, useState } from 'react';
import { pushMessage } from '../../pages/api/chat';

const MessageInput = ({ userId, roomId }) => {
  const [value, setValue] = useState("");

  const updateValue = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  const submit = useCallback(() => {
    pushMessage(userId, value, roomId);
    setValue("");
  }, [userId, value, roomId]);

  return <div className="flex my-4 mr-4">
    <Input value={value} onChange={updateValue} onPressEnter={submit}></Input>
    <Button type="primary" onClick={submit}>Send</Button>
  </div>
}
export default MessageInput;