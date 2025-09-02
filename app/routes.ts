import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("address", "routes/address.tsx"),
  route("loan", "routes/loan.tsx"),
] satisfies RouteConfig;
