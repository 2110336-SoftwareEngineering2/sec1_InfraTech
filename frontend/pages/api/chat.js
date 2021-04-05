import Firebase from '../../config/firebase';
import { v4 as UUID } from 'uuid';

const getRoomRef = roomId => Firebase.database().ref(`/chat/${roomId}`);
const getRoomIndexRef = userId => Firebase.database().ref(`/chat/index/${userId}`);

const getOnce = async (ref) => (await ref.once("value")).val();

const onValue = (ref, handler) => ref.on("value", snapshot => {
  if (!snapshot.val()) return;
  handler(snapshot.val())
});

const pushData = (ref, data) => {
  getOnce(ref).then(snapshot => {
    if (snapshot === null) {
      ref.set({ length: 1, 0: data }).then()
    } else {
      const length = snapshot.length;
      ref.update({ length: length + 1, [length]: data }).then()
    }
  })
}

const isRoomExists = (userIdA, userIdB) => {

}

export const snapshotToArray = (snapshot) => Object.values(snapshot).slice(0, snapshot.length);

export const sendMessage = (sender, message, roomId) => {
  pushData(getRoomRef(roomId), {sender, message, at: new Date()})
}

export const getMessages = (roomId, handler) => {
  onValue(getRoomRef(roomId), handler);
}

export const createRoom = (userIdA, userIdB) => {
  const roomId = UUID();

  const roomIndexRefA = getRoomIndexRef(userIdA)
  const roomIndexRefB = getRoomIndexRef(userIdB)
  const roomRef = getRoomRef(roomId);

  pushData(roomIndexRefA, { roomId, oppositeUserId: userIdB });
  pushData(roomIndexRefB, { roomId, oppositeUserId: userIdA });

  roomRef.set({
    length: 0,
  }).then();

  return roomId;
}

export const getRoom = (userId, handler) => {
  onValue(getRoomIndexRef(userId), handler);
}