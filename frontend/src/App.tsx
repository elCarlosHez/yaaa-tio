import { BrowserRouter, Routes, Route } from "react-router-dom";

import { RequireAuth } from "./middlewares/RequireAuth";

import { LiveMatch } from "./pages/LiveMatch";
import { queryClient } from "./lib/QueryClient";
import { QueryClientProvider } from "react-query";
import { CreateMatch } from "./pages/CreateMatch";
import { Login } from "./pages/Login";

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route element={<RequireAuth />}>
            <Route path="/create-match" element={<CreateMatch />} />
            <Route path="/live-match/:id" element={<LiveMatch />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};
