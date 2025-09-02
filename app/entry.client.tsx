import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { RouterProvider, createHashRouter } from "react-router";
import Root from "./root";
import Home from "./routes/home";
import { clientLoader as homeLoader } from "./routes/home";

const router = createHashRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: homeLoader,
      },
    ],
  },
]);

function hydrate() {
  let rootElement = document.getElementById("root");

  if (!rootElement) {
    rootElement =
      document.getElementById("app") ||
      document.querySelector("main") ||
      document.body;
  }

  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  );
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", hydrate);
} else {
  hydrate();
}
