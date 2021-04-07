import Image from 'next/image';

const Message = ({ room, message }) => {
  const { sender, text, at } = message;
  const { oppositeUser } = room;

  const bySelf = oppositeUser.id !== sender;

  return <div className={"flex mt-4 " + (bySelf ? "justify-end" : "")}>
      <div className={"flex " + (bySelf ? "justify-end" : "")} style={{flexBasis: "75%"}}>
        <div className="mr-2">
          <Image
            src={oppositeUser.profile}
            width={36}
            height={36}
            layout="fixed"
            className="rounded-full"
          />
        </div>
        <div className={"flex flex-col " + (bySelf ? "align-end" : "")}>
          <div className="p-2 bg-gray-200 rounded-xl">{text}</div>
          <div className="text-xs mt-1 text-gray-400">{at ? at.toLocaleString() : ""}</div>
        </div>
      </div>
    </div>
}

export default Message;
