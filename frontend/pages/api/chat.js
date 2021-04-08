import Firebase from '../../config/firebase';

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

export const snapshotToArray = (snapshot) => Object.values(snapshot).slice(0, snapshot.length);

export const pushMessage = (sender, receiver, text, roomId) => {
  pushData(getRoomRef(roomId), {sender, text, at: new Date()});

  getRoomIndexRef(sender).child(roomId).update({
    lastUpdate: new Date().toLocaleString(),
  }).then();
  getRoomIndexRef(receiver).child(roomId).update({
    lastUpdate: new Date().toLocaleString(),
  }).then();
}

export const createRoom = (trainee, trainer) => {
  const roomId = `${trainee.id}-${trainer.id}`;
  const roomRef = getRoomRef(roomId);

  getOnce(roomRef).then(snapshot => {
    if (snapshot === null) {
      getRoomIndexRef(trainee.id).update({
        [roomId]: {
          oppositeUser: {
            id: trainer.id,
            name: trainer.name,
            profile: trainer.profile,
          },
          lastUpdate: new Date().toLocaleString(),
        }
      }).then();
      getRoomIndexRef(trainer.id).update({
        [roomId]: {
          oppositeUser: {
            id: trainee.id,
            name: trainee.name,
            profile: trainee.profile,
          },
          lastUpdate: new Date().toLocaleString(),
        }
      }).then();

      roomRef.set({
        length: 0,
      }).then();
    }
  })

  return roomId;
}

export const read = (userId, roomId) => {
  getRoomIndexRef(userId).child(roomId).update({
    unread: 0,
  }).then();
}

export const subscribeRoomList = (userId, handler) => {
  onValue(getRoomIndexRef(userId), handler);
}

export const subscribeMessages = (roomId, handler) => {
  onValue(getRoomRef(roomId), handler);
}