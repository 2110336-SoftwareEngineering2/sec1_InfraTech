import Image from 'next/image';

const Message = ({profile, text, at, bySelf}) => {
  const date = new Date(at);
  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  const localeDateString = date.toLocaleString("en-US", dateOptions);

  console.log("render")

  return <div className={"flex flex-col mt-4 w-1/4" + (bySelf ? "justify-end items-end" : "")}>
      <div className={"flex " + (bySelf ? "justify-end" : "")}>
        <div className="mr-2">
          <Image
            src={profile}
            width={36}
            height={36}
            layout="fixed"
            className="rounded-full"
          />
        </div>
        <div className={"flex flex-col w-auto " + (bySelf ? "align-end" : "")}>
          <div className="p-2 bg-gray-200 rounded-xl">{text}</div>
        </div>
      </div>
    <div className="text-xs mt-1 text-gray-400">{at === undefined ? "" : localeDateString}</div>
  </div>
}

export default Message;
