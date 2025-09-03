import { SelectItem } from "@/components/ui/select";
import {
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormControl } from "@/components/ui/form";

import { ErrorBoundary, useErrorBoundary } from "react-error-boundary";
import { useCallback, useEffect, useState } from "react";
import { fetchWorkplaceCategories } from "~/lib/api";

function WorkplaceCategoriesSelectContent() {
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { showBoundary } = useErrorBoundary();

  const fetchCategories = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await fetchWorkplaceCategories();
      setCategories(data);
    } catch (err) {
      console.error("Failed to fetch categories:", err);
      showBoundary(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, []);

  const message = isLoading
    ? "Loading categories..."
    : "Select your workplace from the list";

  return (
    <>
      <FormControl className="w-full">
        <SelectTrigger>
          <SelectValue placeholder={message} />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {categories.map((category) => (
          <SelectItem key={category} value={category} disabled={isLoading}>
            {category}
          </SelectItem>
        ))}
      </SelectContent>
    </>
  );
}

function FallbackComponent() {
  const { resetBoundary } = useErrorBoundary();

  return (
    <div>
      Error loading categories.
      <button
        onClick={(e) => {
          e.preventDefault();
          resetBoundary();
        }}
        className="ml-2 text-blue-500 hover:underline"
      >
        Retry
      </button>
    </div>
  );
}

function WorkplaceCategoriesSelectContentBoundaried() {
  const [key, setKey] = useState(0);

  return (
    <ErrorBoundary
      key={key}
      fallback={<FallbackComponent />}
      onReset={() => setKey((k) => k + 1)}
    >
      <WorkplaceCategoriesSelectContent />
    </ErrorBoundary>
  );
}

export default WorkplaceCategoriesSelectContentBoundaried;
