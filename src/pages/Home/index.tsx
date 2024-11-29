import React, { useRef, lazy, Suspense } from "react";
import { Button } from 'antd';

const MarkdownPreview = lazy(function load() {
  // 调用接口获取数据，根据数据来决定加载哪一个组件
  return new Promise<{ default: React.ComponentType}>(function (resolve) {
    setTimeout(() => {
      resolve(import('@/components/MarkdownPreview'));
    }, 3000);
  });
});

export default function Home() {
  const containerRef = useRef();

  const handleOpen = () => {

  }

  return (
    <div ref={containerRef}>
      <Button onClick={handleOpen}>Hello</Button>
      <Suspense fallback={<div>Loading...</div>}>
        <MarkdownPreview />
      </Suspense>
    </div>
  );
}