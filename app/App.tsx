import { Navigate } from "react-router";
import { HashRouter, Routes, Route } from "react-router";
import Home from "./routes/home";
import { FormProvider, useFormContext } from "@/components/form-context";
import LoanForm from "./routes/loan";
import AddressForm from "./routes/address";

function Router() {
  const { formData } = useFormContext();

  return (
    <Routes>
      <Route index element={<Home />} />
      <Route
        path="/address"
        element={
          !formData.firstName ||
          !formData.lastName ||
          !formData.phone ||
          !formData.gender ? (
            <Navigate to="/" />
          ) : (
            <AddressForm />
          )
        }
      />
      <Route
        path="/loan"
        element={
          !formData.firstName ||
          !formData.lastName ||
          !formData.phone ||
          !formData.gender ? (
            <Navigate to="/" />
          ) : !formData.workplace || !formData.address ? (
            <Navigate to="/address" />
          ) : (
            <LoanForm />
          )
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default function App() {
  return (
    <FormProvider>
      <HashRouter>
        <Router />
      </HashRouter>
    </FormProvider>
  );
}
