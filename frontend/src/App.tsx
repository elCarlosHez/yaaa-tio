import { BrowserRouter, Routes, Route } from "react-router-dom";

import { RequireAuth } from "./middlewares/RequireAuth";

import { LiveMatch } from "./pages/LiveMatch";
import { queryClient } from "./lib/QueryClient";
import { QueryClientProvider } from "react-query";
import { CreateMatch } from "./pages/CreateMatch";
import { Login } from "./pages/Login";
import { CssBaseline } from "@mui/material";
import { Home } from "./pages/home/Home";
import { AppBarLayout } from "./layouts/ApBarLayout";
import { Profile } from "./pages/profile/Profile";

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route element={<RequireAuth />}>
            <Route element={<AppBarLayout />}>
              <Route path="/home" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
            <Route path="/create-match" element={<CreateMatch />} />
            <Route path="/live-match/:id" element={<LiveMatch />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};
