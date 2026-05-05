import { FeatureRegistry } from "@core/registries/featureRegistry";
import { QueryClient } from "@tanstack/react-query";

export const featureRegistry = new FeatureRegistry();
export const queryClient = new QueryClient();
