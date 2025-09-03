import { useRouteError, isRouteErrorResponse } from "react-router";
import { HashRouter, Routes, Route } from "react-router";
import Home from "./routes/home";
import { FormProvider } from "./components/form-context";
import LoanForm from "./routes/loan";
import AddressForm from "./routes/address";

function RouterErrorBoundary() {
  const error = useRouteError();

  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}

export default function App() {
  return (
    <FormProvider>
      <HashRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/address" element={<AddressForm />} />
          <Route path="/loan" element={<LoanForm />} />
          <Route path="*" element={<RouterErrorBoundary />} />
        </Routes>
      </HashRouter>
    </FormProvider>
  );
}
