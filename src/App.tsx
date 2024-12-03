import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Behavior from "@/pages/Behavior";

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
      path: "behavior",
      element: <Behavior />,
    },
  ];
  return (
    <BrowserRouter basename={basename}>
      <Routes>
        {children.map((item) => (
          <Route key={item.path} path={item.path} element={item.element} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}
