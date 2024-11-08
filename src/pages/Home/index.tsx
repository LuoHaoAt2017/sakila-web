import { useEffect, useState } from "react";

function Home() {
  const [minX, setMinX] = useState(0);

  useEffect(() => {
    setInterval(() => {
      setMinX(minX => (minX + 1) % 750)
    }, 20);
  }, []);

  return (
    <div className="flex flex-col justify-center">
      <svg style={{ border: '1px solid #aaa' }} width="400" height="400" viewBox={`${minX} ${0} 100 100`}>
        <image href="/mahjong/chun.svg" x={0} y={25} width={50} height={50}></image>
        <image href="/mahjong/xia.svg" x={100} y={25} width={50} height={50}></image>
        <image href="/mahjong/qiu.svg" x={200} y={25} width={50} height={50}></image>
        <image href="/mahjong/dong.svg" x={300} y={25} width={50} height={50}></image>
        <image href="/mahjong/ju.svg" x={400} y={25} width={50} height={50}></image>
        <image href="/mahjong/lan.svg" x={500} y={25} width={50} height={50}></image>
        <image href="/mahjong/mei.svg" x={600} y={25} width={50} height={50}></image>
        <image href="/mahjong/zu.svg" x={700} y={25} width={50} height={50}></image>
      </svg>
    </div>
  );
}

export default Home;
