import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type z from "zod";
import type {
  personalDataSchema,
  addressFormSchema,
  loanFormSchema,
} from "~/lib/schemas";

export type FormData = z.infer<
  typeof personalDataSchema & typeof addressFormSchema & typeof loanFormSchema
>;

const initialFormData: FormData = {
  phone: "",
  firstName: "",
  lastName: "",
  gender: "",
  workplace: "",
  address: "",
  amount: 200,
  term: 10,
};

interface FormContextType {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  resetForm: () => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export function FormProvider({ children }: { children: ReactNode }) {
  const [formData, setFormData] = useState<FormData>(() => {
    const savedData = localStorage.getItem("loanFormData");
    return savedData ? JSON.parse(savedData) : initialFormData;
  });

  const updateFormData = (data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
    localStorage.setItem("loanFormData", JSON.stringify(formData));
  };

  const resetForm = () => {
    setFormData(initialFormData);
    localStorage.removeItem("loanFormData");
  };

  return (
    <FormContext.Provider value={{ formData, updateFormData, resetForm }}>
      {children}
    </FormContext.Provider>
  );
}

export function useFormContext() {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
}
