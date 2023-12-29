import { QueryClient, QueryClientProvider } from "@tanstack/svelte-query";
import App from "./App.svelte";

const queryClient: QueryClient = new QueryClient();

const app = new App({
  target: document.getElementById("app")!,
  props: {
    queryClient,
  },
});

export default app;
