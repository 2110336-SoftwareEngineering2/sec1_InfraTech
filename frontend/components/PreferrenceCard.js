import { useState } from 'react';
const PreferrenceCard = ({}) => {
  const [click, setClick] = useState(false);
  return (
    <div
      className={`w-60 h-72 items-between rounded-md border-2 border-black-500 ${
        click ? 'ring-4 ring-indigo-300' : ''
      }`}
      onClick={() => {
        setClick(!click);
      }}
    >
      <div className="w-full h-0 text-right items-start relative ">
        {click ? (
          <CheckCircleOutlined
            style={{
              position: 'absolute',
              color: '#08c',
              fontSize: '1rem',
              top: '5px',
              right: '5px',
            }}
          />
        ) : (
          <></>
        )}
      </div>

      <div className="w-60 h-60 ">
        <img alt="example" src="a.jpg" class="object-contain h-60 w-60 " />
      </div>

      <div className=" w-60 h-12 flex justify-center items-center ">
        <span className="text-sm">Strength</span>
      </div>
    </div>
  );
};
