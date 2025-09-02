import type { Route } from "./+types/home";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FormProvider } from "~/forms/context/FormContext";
import PersonalDataForm from "./form/personal";
import AddressForm from "./form/address";
import LoanForm from "./form/loan";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Loan Application" },
    { name: "description", content: "Apply for a loan in 3 simple steps" },
  ];
}

export async function clientLoader() {
  return {
    message: "Welcome to the Loan Application!",
    timestamp: new Date().toISOString(),
  };
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();
  const action = formData.get("action");

  return {
    success: true,
    action,
    timestamp: new Date().toISOString(),
  };
}

enum FormStep {
  INTRO = 'intro',
  PERSONAL = 'personal',
  ADDRESS = 'address',
  LOAN = 'loan'
}

export default function Home() {
  const [currentStep, setCurrentStep] = useState<FormStep>(FormStep.INTRO);
  
  const startApplication = () => {
    setCurrentStep(FormStep.PERSONAL);
  };
  
  const goToStep = (step: FormStep) => {
    setCurrentStep(step);
  };
  
  const renderCurrentStep = () => {
    switch (currentStep) {
      case FormStep.INTRO:
        return (
          <div className="container mx-auto py-10 text-center">
            <h1 className="text-3xl font-bold mb-6">Loan Application</h1>
            <p className="mb-8">Complete our simple 3-step application process to apply for a loan.</p>
            
            <div className="mb-10 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="border rounded-lg p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-3">Step 1: Personal Information</h2>
                <p>Provide your basic personal details including phone number, name, and gender.</p>
              </div>
              
              <div className="border rounded-lg p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-3">Step 2: Address & Workplace</h2>
                <p>Tell us about your workplace and residential address.</p>
              </div>
              
              <div className="border rounded-lg p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-3">Step 3: Loan Parameters</h2>
                <p>Select your desired loan amount and repayment term.</p>
              </div>
            </div>
            
            <Button onClick={startApplication} size="lg">
              Start Application
            </Button>
          </div>
        );
      
      case FormStep.PERSONAL:
        return (
          <div className="container mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Step 1: Personal Information</h1>
              <div className="text-sm text-gray-500">Step 1 of 3</div>
            </div>
            <PersonalDataForm
              onNext={() => goToStep(FormStep.ADDRESS)}
            />
          </div>
        );
      
      case FormStep.ADDRESS:
        return (
          <div className="container mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Step 2: Address & Workplace</h1>
              <div className="text-sm text-gray-500">Step 2 of 3</div>
            </div>
            <AddressForm
              onBack={() => goToStep(FormStep.PERSONAL)}
              onNext={() => goToStep(FormStep.LOAN)}
            />
          </div>
        );
      
      case FormStep.LOAN:
        return (
          <div className="container mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Step 3: Loan Parameters</h1>
              <div className="text-sm text-gray-500">Step 3 of 3</div>
            </div>
            <LoanForm
              onBack={() => goToStep(FormStep.ADDRESS)}
              onComplete={() => goToStep(FormStep.INTRO)}
            />
          </div>
        );
      
      default:
        return null;
    }
  };
  
  return (
    <FormProvider>
      {renderCurrentStep()}
    </FormProvider>
  );
}
