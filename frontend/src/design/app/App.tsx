import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";

export default function App() {
  useEffect(() => router.subscribe(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }), []);

  return <RouterProvider router={router} />;
}
