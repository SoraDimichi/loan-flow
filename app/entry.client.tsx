import { HydratedRouter } from "react-router/dom";
import { startTransition } from "react";
import { hydrateRoot } from "react-dom/client";

import { FormProvider } from "~/forms/context/FormContext";

startTransition(() => {
  hydrateRoot(
    document,
    <FormProvider>
      <HydratedRouter />
    </FormProvider>,
  );
});
