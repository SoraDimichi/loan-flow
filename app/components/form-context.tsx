import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { z } from "zod";

const formSchema = z.object({
  phone: z.string(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  gender: z.string(),
  workplace: z.string(),
  address: z.string().min(1),
  amount: z.number().min(200).max(1000),
  term: z.number().min(10).max(30),
});

export type FormData = z.infer<typeof formSchema>;

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

  useEffect(() => {
    localStorage.setItem("loanFormData", JSON.stringify(formData));
  }, [formData]);

  const updateFormData = (data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const resetForm = () => {
    setFormData(initialFormData);
    if (typeof window !== "undefined") {
      localStorage.removeItem("loanFormData");
    }
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
