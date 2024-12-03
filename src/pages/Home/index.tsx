import { memo, useMemo, useState } from "react";
import { Button, Input } from 'antd';

// 定义 userInfo 的类型    
interface UserInfo {
  username: string;
  password: string;
}

// 你应该只将 memo 用作为性能优化。
// 如果你的代码没有 memo 就无法运行，首先找出潜在问题并进行修复。
const Greeting = memo(function Ring({ userInfo }: { userInfo: UserInfo }) {
  console.log('---child is render---');
  return <ul>
    <li>this is ring</li>
    <li>{userInfo.username}</li>
    <li>{userInfo.password}</li>
  </ul>
});


export default function Home() {
  const [counter, setCounter] = useState(0);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const userInfo = useMemo(() => ({ username, password }), [username, password]);

  const handleClick = () => {
    setCounter(counter + 1);
  }
  console.log('---parent is render---');

  return (
    <div>
      <span>{counter + 1}</span>
      <Input value={username} onChange={(evt) => setUsername(evt.target.value)} />
      <Input value={password} onChange={(evt) => setPassword(evt.target.value)} />
      <Button onClick={handleClick}>Hello</Button>
      <Greeting userInfo={userInfo} />
    </div>
  );
}