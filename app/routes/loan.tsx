import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
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
import { useFormContext } from "~/components/form-context";
import { submitLoanApplication } from "~/lib/api";
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

export default function LoanForm() {
  const navigate = useNavigate();
  const { formData, updateFormData, resetForm } = useFormContext();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const form = useForm<z.infer<typeof loanFormSchema>>({
    resolver: zodResolver(loanFormSchema),
    defaultValues: {
      amount: formData.amount || 200,
      term: formData.term || 10,
    },
  });

  async function onSubmit(values: z.infer<typeof loanFormSchema>) {
    try {
      updateFormData(values);
      const completeFormData = {
        ...formData,
        ...values,
      };

      await submitLoanApplication(completeFormData);
      setShowModal(true);
    } catch (error) {
      form.setError("root.serverError", { message: "something went wrong" });
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

  function handleStartNew() {
    setShowModal(false);
    resetForm();
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
                <FormLabel>Loan amount - {value || 200}$</FormLabel>
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

          <div className="flex flex-col mt-auto">
            <FormMessage className="col-span-2 p-1 text-right">
              {form.formState.errors.root?.serverError.message}
            </FormMessage>
            <div className="flex justify-between">
              <Button
                className="grid-row-start-2"
                type="button"
                variant="outline"
                onClick={handleBack}
              >
                Back
              </Button>
              <Button
                className="grid-row-start-2"
                type="submit"
                disabled={form.formState.isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>
            </div>
          </div>
        </form>
      </Form>
      <Dialog open={showModal} onOpenChange={handleStartNew}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Application Submitted Successfully!</DialogTitle>
            <DialogDescription>
              Congratulations, {formData.lastName} {formData.firstName}. You
              have been approved for {formData.amount}$ for a period of
              {formData.term} days.
            </DialogDescription>
          </DialogHeader>
          <div className=" flex justify-end">
            <Button onClick={handleStartNew}>Start New Application</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
