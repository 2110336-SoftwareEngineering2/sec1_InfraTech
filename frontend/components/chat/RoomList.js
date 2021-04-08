import Room from './Room';
import React from 'react';

const RoomList = ({roomList}) => {
  return <div className="flex flex-col overflow-y-scroll h-full min-w-min">
    {roomList.map((room, index) => <Room key={index} room={room}/>)}
  </div>
}
export default RoomList;