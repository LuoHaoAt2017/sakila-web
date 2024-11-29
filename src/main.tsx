import React, { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { Spin } from 'antd';
import "./index.css";

const App = React.lazy(() => {
  // 可以加载配置
  return new Promise<{ default: React.ComponentType }>((resolve) => {
    setTimeout(() => {
      resolve(import('./App.tsx'));
    }, 3000);
  });
});

createRoot(document.getElementById("root")!).render(<StrictMode>
  <Suspense fallback={<Spin fullscreen tip='登录认证中...'></Spin>}>
    <App />
  </Suspense>
</StrictMode>);