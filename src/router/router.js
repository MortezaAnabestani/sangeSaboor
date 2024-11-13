import Home from "../paes/Home";
import Bar from "../paes/Bar";
import Bubble from "../paes/Bubble";
import Cloud from "../paes/Cloud";
import Tree from "../paes/Tree";
import { createBrowserRouter } from "react-router-dom";
import Root from "../paes/Root";
import TextFrequency from "../paes/TextFrequency";

const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      {
        path: "/termFrequency",
        element: <Home />,
      },
      {
        path: "/termFrequency/bar",
        element: <Bar />,
      },
      {
        path: "/termFrequency/bubble",
        element: <Bubble />,
      },
      {
        path: "/termFrequency/cloud",
        element: <Cloud />,
      },
      { path: "/termFrequency/tree", element: <Tree /> },
      {
        path: "/termFrequency/chart",
        element: <TextFrequency />,
      },
    ],
  },
]);

export default router;
