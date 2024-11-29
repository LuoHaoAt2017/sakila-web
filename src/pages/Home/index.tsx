import { memo, useState } from "react";
import { Button } from 'antd';

const Greeting = memo(function Ring() {
  console.log('---child is render---');
  return <div>this is ring</div>
});


export default function Home() {
  const [counter, setCounter] = useState(0);

  const handleClick = () => {
    setCounter(counter + 1);
  }
  console.log('---parent is render---');
  return (
    <div>
      <span>{counter + 1}</span>
      <Button onClick={handleClick}>Hello</Button>
      <Greeting />
    </div>
  );
}