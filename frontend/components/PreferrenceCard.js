const PreferrenceCard = ({}) => {
  return (
    <div
      className={'w-60 h-72 items-between rounded-md border-2 border-black-500'}
    >
      <div className="w-60 h-60 ">
        <img alt="example" src="a.jpg" class="object-contain h-60 w-60 " />
      </div>

      <div className=" w-60 h-12 flex justify-center items-center ">
        <span className="text-sm">Strength</span>
      </div>
    </div>
  );
};

export default PreferrenceCard;
