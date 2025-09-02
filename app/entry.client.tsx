import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { RouterProvider, createHashRouter } from "react-router";
import Root from "./root";
import PersonalDataForm from "./pages/home";
import AddressForm from "./pages/address";
import LoanForm from "./pages/loan";

const router = createHashRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        index: true,
        element: <PersonalDataForm />,
      },
      {
        path: "address/",
        element: <AddressForm />,
      },
      {
        path: "loan/",
        element: <LoanForm />,
      },
    ],
  },
]);

function hydrate() {
  let rootElement = document.getElementById("root") || document.body;

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
