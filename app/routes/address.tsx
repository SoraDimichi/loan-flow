import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { addressFormSchema } from "@/lib/schemas";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Select } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useFormContext } from "@/components/form-context";
import WorkplaceCategoriesSelect from "~/components/workplace-select-content";


export default function AddressForm() {
  const navigate = useNavigate();
  const { formData, updateFormData } = useFormContext();

  const form = useForm<z.infer<typeof addressFormSchema>>({
    resolver: zodResolver(addressFormSchema),
    defaultValues: {
      workplace: formData.workplace,
      address: formData.address,
    },
  });

  function onSubmit(values: z.infer<typeof addressFormSchema>) {
    updateFormData(values);
    navigate("/loan");
  }

  function handleBack() {
    const values = form.getValues();
    updateFormData(values);
    navigate("/");
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-[320px] h-[560px] flex flex-col rounded-md  space-y-2 max-w-3xl mx-auto p-4 border-1 border-white"
      >
        <h1 className="text-2xl font-bold mb-6">Address and Workplace</h1>

        <FormField
          control={form.control}
          name="workplace"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Workplace</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <WorkplaceCategoriesSelect />
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Residential Address</FormLabel>
              <FormControl>
                <Input
                  placeholder="100 Flushcombe Road, Albury, Spain 2148"
                  type="text"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="mt-auto flex justify-between">
          <Button type="button" variant="outline" onClick={handleBack}>
            Back
          </Button>
          <Button type="submit">Next</Button>
        </div>
      </form>
    </Form>
  );
}
