import Firebase from '../../config/firebase';

const getRoomRef = roomId => Firebase.database().ref(`/chat/${roomId}`);
const getRoomIndexRef = userId => Firebase.database.ref(`/chat/index/${userId}`);

export const sendMessage = (sender, message, roomId) => {
  const roomRef = getRoomRef(roomId);
  roomRef.once("value").then(snapshot => {
    const currentLength = snapshot.val().length
    roomRef.update({length: currentLength+1, [currentLength]: {sender, message}});
  })
}

export const getMessage = (roomId, handler) => {
  const roomRef = getRoomRef(roomId);
  roomRef.on("value", snapshot => {
    handler(snapshot.val());
  })
}

