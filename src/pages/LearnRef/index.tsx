import { useRef, useState } from 'react';
import { Select, Button } from 'antd';

export const Example1 = () => {
  const fruits = useRef([]);
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      fruits.current = [{
        label: '橘子',
        value: '1',
      }, {
        label: '苹果',
        value: '2',
      }, {
        label: '桃子',
        value: '3',
      }];
      console.log('水果派对');
      setLoading(false);
    }, 1500);
  }

  console.log('水果派对', fruits.current);

  return <div className='flex gap-4'>
    <Button loading={loading} onClick={handleClick}>Fetch</Button>
    <Select mode='tags' className='w-64' options={fruits.current} />
  </div>
}

export default Example1;