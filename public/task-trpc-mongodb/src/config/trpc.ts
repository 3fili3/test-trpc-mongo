import { createReactQueryHooks } from "@trpc/react";
import { AppRouter } from "../../../../app/index";

export const trpc = createReactQueryHooks<AppRouter>();