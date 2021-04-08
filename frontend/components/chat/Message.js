import Image from 'next/image';

const Message = ({profile, text, at, bySelf}) => {
  const date = new Date(at);
  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  const localeDateString = date.toLocaleString("en-US", dateOptions);

  return <div className={"flex flex-col my-4 " + (bySelf ? "justify-end items-end" : "")}>
      <div className={"flex " + (bySelf ? "justify-end" : "")} style={{maxWidth: "75%"}}>
        <div className="mr-2">
          <Image
            src={profile}
            width={36}
            height={36}
            layout="fixed"
            className="rounded-full"
          />
        </div>
        <div className={"flex flex-col " + (bySelf ? "align-end" : "")}>
          <div className="p-2 break-words flex-wrap bg-gray-200 rounded-xl">{text}</div>
        </div>
      </div>
    <div className="text-xs mt-1 text-gray-400">{at === undefined ? "" : localeDateString}</div>
  </div>
}

export default Message;
