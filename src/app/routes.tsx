import { createBrowserRouter } from "react-router";
import Root from "./Root";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: () => null }, // Empty component because Root renders everything for now
    ],
  },
]);
