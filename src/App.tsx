import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ConfigProvider } from 'antd';
import Home from "@/pages/Home";
import About from "@/pages/About";
import MyHook from "@/pages/MyHook";
import LearnRef from "@/pages/LearnRef";
import RenderProps from "@/pages/RenderProps";

const basename = import.meta.env.VITE_BASE_PATH;

export default function App() {

  // 动态路由的雏形
  const children = [
    {
      path: "home",
      element: <Home />,
    },
    {
      path: "about",
      element: <About />,
    },
    {
      path: "render",
      element: <RenderProps />,
    },
    {
      path: "ref",
      element: <LearnRef />,
    },
    {
      path: "hook",
      element: <MyHook />,
    },
  ];
  return (<ConfigProvider theme={{
    token: {
      borderRadius: 1
    }
  }}>
    <BrowserRouter basename={basename}>
      <Routes>
        {children.map((item) => (
          <Route key={item.path} path={item.path} element={item.element} />
        ))}
      </Routes>
    </BrowserRouter>
  </ConfigProvider>);
}
