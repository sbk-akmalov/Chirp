import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import queryClient from "./config/queryClient.ts";
import AppContainer from "./components/AppContainer.tsx";
import { ThemeProvider } from "./contexts/theme-provider.tsx";
import { Toaster } from "./components/ui/toaster.tsx";
import Auth from "./pages/Auth.tsx";
import Home from "./pages/Home.tsx";
import Search from "./pages/Search.tsx";
import Notifications from "./pages/Notifications.tsx";
import Messages from "./pages/Messages.tsx";
import Bookmarks from "./pages/Bookmarks.tsx";
import Profile from "./pages/Profile.tsx";
import Details from "./pages/Details.tsx";
import Settings from "./pages/Settings.tsx";
import NotFound from "./pages/NotFound.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route element={<AppContainer />}>
        <Route index element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
        <Route path="/:username" element={<Profile />} />
        <Route path="/:username/status/:id" element={<Details />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/*" element={<NotFound />} />
      </Route>
      <Route path="/auth" element={<Auth />} />
    </Route>
  )
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
);
