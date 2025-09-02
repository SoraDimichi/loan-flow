import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";
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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFormContext } from "~/forms/context/FormContext";
import { fetchWorkplaceCategories } from "~/forms/utils/api";
import type { Route } from "./+types/home";

const addressFormSchema = z.object({
  workplace: z.string().min(1, "Workplace is required"),
  address: z.string().min(1, "Residential address is required"),
});

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Address Information - Loan Application" },
    {
      name: "description",
      content: "Enter your address and workplace information",
    },
  ];
}

export default function AddressForm() {
  const navigate = useNavigate();
  const { formData, updateFormData } = useFormContext();
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const form = useForm<z.infer<typeof addressFormSchema>>({
    resolver: zodResolver(addressFormSchema),
    defaultValues: {
      workplace: formData.workplace,
      address: formData.address,
    },
  });

  useEffect(() => {
    const getCategories = async () => {
      try {
        setIsLoading(true);
        const data = await fetchWorkplaceCategories();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getCategories();
  }, []);

  useEffect(() => {
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.phone ||
      !formData.gender
    ) {
      navigate("/");
    }
  }, [formData, navigate]);

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
        className="space-y-8 max-w-3xl mx-auto py-10"
      >
        <h1 className="text-2xl font-bold mb-6">Address and Workplace</h1>

        <FormField
          control={form.control}
          name="workplace"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Workplace</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your workplace from the list" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {isLoading ? (
                    <SelectItem value="loading" disabled>
                      Loading categories...
                    </SelectItem>
                  ) : (
                    categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
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

        <div className="flex justify-between">
          <Button type="button" variant="outline" onClick={handleBack}>
            Back
          </Button>
          <Button type="submit">Next</Button>
        </div>
      </form>
    </Form>
  );
}
