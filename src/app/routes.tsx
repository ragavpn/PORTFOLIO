import { createBrowserRouter } from "react-router";
import Root from "./Root";
import ProjectDetail from "./components/ProjectDetail";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { path: ":slug", Component: ProjectDetail },
    ],
  },
]);
