import Image from 'next/image';
import React from 'react';

const Message = ({message, avatar, at, bySelf}) => {
  return (
    <div className={"flex " + (bySelf ? "justify-end" : "")}>
      <div className={"flex " + (bySelf ? "justify-end" : "")} style={{flexBasis: "75%"}}>
        <div className="mr-2">
          <Image
            src={avatar}
            width={36}
            height={36}
            layout="fixed"
            className="rounded-full"
          />
        </div>
        <div className={"flex flex-col " + (bySelf ? "align-end" : "")}>
          <div className="p-2 bg-gray-200 rounded-xl">{message}</div>
          <div className="text-xs mt-1 text-gray-400">{at.toLocaleString()}</div>
        </div>
      </div>
    </div>
  )
}

export default Message;
