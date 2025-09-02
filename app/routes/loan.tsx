import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Slider } from "@/components/ui/slider";
import { useFormContext } from "~/forms/context/FormContext";
import { submitLoanApplication } from "~/forms/utils/api";
import type { Route } from "./+types/home";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const loanFormSchema = z.object({
  amount: z.number().min(200).max(1000),
  term: z.number().min(10).max(30),
});

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Loan Parameters - Loan Application" },
    { name: "description", content: "Select your loan amount and term" },
  ];
}

export default function LoanForm() {
  const navigate = useNavigate();
  const { formData, updateFormData, resetForm } = useFormContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [apiResponse, setApiResponse] = useState<any>(null);

  useEffect(() => {
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.phone ||
      !formData.gender ||
      !formData.workplace ||
      !formData.address
    ) {
      navigate("/address");
    }
  }, [formData, navigate]);

  const form = useForm<z.infer<typeof loanFormSchema>>({
    resolver: zodResolver(loanFormSchema),
    defaultValues: {
      amount: formData.amount || 200,
      term: formData.term || 10,
    },
  });

  async function onSubmit(values: z.infer<typeof loanFormSchema>) {
    try {
      setIsSubmitting(true);

      updateFormData(values);

      const completeFormData = {
        ...formData,
        ...values,
      };

      const response = await submitLoanApplication(completeFormData);

      setApiResponse(response);
      setShowModal(true);
    } catch (error) {
      console.error("Error submitting application:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleBack() {
    const values = form.getValues();
    updateFormData(values);

    navigate("/address");
  }

  function handleCloseModal() {
    setShowModal(false);
  }

  function handleStartNew() {
    resetForm();
    setShowModal(false);
    navigate("/");
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-[320px] h-[560px] flex flex-col rounded-md  space-y-2 max-w-3xl mx-auto p-4 border-1 border-white"
        >
          <h1 className="text-2xl font-bold mb-6">Loan Parameters</h1>

          <FormField
            control={form.control}
            name="amount"
            render={({ field: { value, onChange } }) => (
              <FormItem>
                <FormLabel>Loan amount - ${value || 200}</FormLabel>
                <FormControl>
                  <Slider
                    min={200}
                    max={1000}
                    step={100}
                    defaultValue={[value || 200]}
                    onValueChange={(vals) => {
                      onChange(vals[0]);
                    }}
                  />
                </FormControl>
                <FormDescription>
                  Adjust the loan amount by sliding.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="term"
            render={({ field: { value, onChange } }) => (
              <FormItem>
                <FormLabel>Loan term - {value || 10} days</FormLabel>
                <FormControl>
                  <Slider
                    min={10}
                    max={30}
                    step={1}
                    defaultValue={[value || 10]}
                    onValueChange={(vals) => {
                      onChange(vals[0]);
                    }}
                  />
                </FormControl>
                <FormDescription>Adjust the term by sliding.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="mt-auto flex justify-between">
            <Button type="button" variant="outline" onClick={handleBack}>
              Back
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </Button>
          </div>
        </form>
      </Form>
      <Dialog open={showModal} onOpenChange={handleCloseModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Application Submitted Successfully!</DialogTitle>
            <DialogDescription>
              Your loan application has been received and is being processed.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
              <code>{JSON.stringify(apiResponse, null, 2)}</code>
            </pre>
          </div>
          <div className=" flex justify-end">
            <Button onClick={handleStartNew}>Start New Application</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
