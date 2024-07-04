import { BrowserRouter, Routes, Route } from "react-router-dom";

import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { RequireAuth } from "./middlewares/RequireAuth";

import { PocketProvider } from "./contexts/PocketContext";
import { LiveMatch } from "./pages/LiveMatch";
import { queryClient } from "./lib/QueryClient";
import { QueryClientProvider } from "react-query";

export const App = () => {
  return (
    <PocketProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route index element={<SignUp />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route element={<RequireAuth />}>
              <Route path="/live-match" element={<LiveMatch />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </PocketProvider>
  );
};
