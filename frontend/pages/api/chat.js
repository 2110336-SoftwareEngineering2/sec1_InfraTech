import Firebase from '../../config/firebase';
import { v4 as UUID } from 'uuid';

const getRoomRef = roomId => Firebase.database().ref(`/chat/${roomId}`);
const getRoomIndexRef = userId => Firebase.database().ref(`/chat/index/${userId}`);

const getOnce = async (ref) => (await ref.once("value")).val();
const onValue = (ref, handler) => ref.on("value", snapshot => handler(snapshot.val()));

const pushData = (ref, data) => {
  getOnce(ref).then(snapshot => {
    const length = snapshot.length;
    if (length === undefined) {
      ref.set({ length: 1, 0: data }).then()
    } else {
      ref.update({ length: length + 1, [length]: data }).then()
    }
  })
}

export const snapshotToArray = (snapshot) => Object.values(snapshot).slice(0, snapshot.length);

export const sendMessage = (sender, message, roomId) => {
  pushData(getRoomRef(roomId))
}

export const getMessages = (roomId, handler) => {
  onValue(getRoomRef(roomId), handler);
}

export const createRoom = (userIdA, userIdB) => {
  const roomId = UUID();

  const roomIndexRefA = getRoomIndexRef(userIdA)
  const roomIndexRefB = getRoomIndexRef(userIdB)
  const roomRef = getRoomRef(roomId);

  pushData(roomIndexRefA, { roomId, oppositeUser: userIdB });
  pushData(roomIndexRefB, { roomId, oppositeUser: userIdA });

  roomRef.set({
    length: 0,
  }).then();
}

export const getRoom = (userId, handler) => {
  onValue(getRoomIndexRef(userId), handler);
}