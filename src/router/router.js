import Home from "../paes/Home";
import Bar from "../paes/Bar";
import Bubble from "../paes/Bubble";
import Cloud from "../paes/Cloud";
import Tree from "../paes/Tree";
import { createBrowserRouter } from "react-router-dom";
import Root from "../paes/Root";

const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/bar",
        element: <Bar />,
      },
      {
        path: "/bubble",
        element: <Bubble />,
      },
      {
        path: "/cloud",
        element: <Cloud />,
      },
      { path: "/Tree", element: <Tree /> },
    ],
  },
]);

export default router;
