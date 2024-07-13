import { BrowserRouter, Routes, Route } from "react-router-dom";

import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { RequireAuth } from "./middlewares/RequireAuth";

import { PocketProvider } from "./contexts/PocketContext";
import { LiveMatch } from "./pages/LiveMatch";
import { queryClient } from "./lib/QueryClient";
import { QueryClientProvider } from "react-query";
import { CreateMatch } from "./pages/CreateMatch";

export const App = () => {
  return (
    <PocketProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route index element={<SignUp />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route element={<RequireAuth />}>
              <Route path="/create-match" element={<CreateMatch />} />
              <Route path="/live-match/:id" element={<LiveMatch />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </PocketProvider>
  );
};
