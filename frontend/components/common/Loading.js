import { Spin } from 'antd';

const Loading = () => (
  <div className='min-h-screen bg-white mx-8 mt-8 flex justify-center pt-40'>
    <Spin size='large' />
  </div>
)

export default Loading;