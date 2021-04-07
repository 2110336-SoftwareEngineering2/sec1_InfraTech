import { createRoom } from '../../pages/api/chat';
import { Button } from 'antd';
import useUser from '../../lib/useUser';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';

const DirectMessageButton = ({trainer}) => {
  const router = useRouter();
  const { user, _ } = useUser({});
  const [ isLoading, setLoading ] = useState(false);

  const clickHandler = useCallback(() => {
    const roomId = createRoom({
      id: user.userId,
      name: `${user.firstname} ${user.lastname}`,
      profile: user.profileImageUrl,
    }, {
      id: trainer.userId,
      name: `${trainer.firstname} ${trainer.lastname}`,
      profile: trainer.profileImageUrl,
    });
    setLoading(true);
    setTimeout(() => router.push("/chat/" + roomId).then(), 1000)
  }, [user, trainer])

  return <Button onClick={clickHandler} loading={isLoading}>Direct Message</Button>
}
export default DirectMessageButton;