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

export const snapshotToArray = (snapshot) => Object.values(snapshot).slice(0, snapshot.length);

export const sendMessage = (sender, message, roomId) => {
  pushData(getRoomRef(roomId), {sender, message, at: new Date()})
}

export const getMessages = (roomId, handler) => {
  onValue(getRoomRef(roomId), handler);
}

export const createRoom = (trainee, trainer) => {
  const roomId = `${trainee.id}-${trainer.id}`;
  const roomRef = getRoomRef(roomId);

  getOnce(roomRef).then(snapshot => {
    if (snapshot === null) {
      const traineeRoomIndex = getRoomIndexRef(trainee.id)
      const trainerRoomIndex = getRoomIndexRef(trainer.id)

      pushData(traineeRoomIndex, {
        roomId,
        oppositeUser: {
          name: trainer.name,
          profile: trainer.profile,
        }
      });
      pushData(trainerRoomIndex, {
        roomId,
        oppositeUser: {
          name: trainee.name,
          profile: trainee.profile,
        }
      });

      roomRef.set({
        length: 0,
      }).then();
    }
  })

  return roomId;
}

export const getRoom = (userId, handler) => {
  onValue(getRoomIndexRef(userId), handler);
}