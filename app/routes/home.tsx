import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function clientLoader() {
  return {
    message: "Welcome to SPA mode!",
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

export default function Home() {
  return <Welcome />;
}
