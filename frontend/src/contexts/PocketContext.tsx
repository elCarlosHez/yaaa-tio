import {
  createContext,
  useContext,
  useCallback,
  useState,
  useEffect,
  useMemo,
} from "react";
import PocketBase, {
  AuthModel,
  RecordAuthResponse,
  RecordModel,
} from "pocketbase";
import { useInterval } from "usehooks-ts";
import { jwtDecode } from "jwt-decode";
import ms from "ms";

const fiveMinutesInMs = ms("5 minutes");
const twoMinutesInMs = ms("2 minutes");

const PocketContext = createContext<IPocketProviderValues>(
  {} as IPocketProviderValues
);

interface IPocketProviderValues {
  register: (email: string, password: string) => Promise<RecordModel>;
  login: (
    email: string,
    password: string
  ) => Promise<RecordAuthResponse<RecordModel>>;
  logout: () => void;
  user: AuthModel;
  token: string;
  pb: PocketBase;
}

interface IPocketProvider {
  children: React.ReactNode;
}

export const PocketProvider = ({ children }: IPocketProvider) => {
  const pb = useMemo(() => new PocketBase(import.meta.env.VITE_API_URL), []);
  pb.autoCancellation(false);

  const [token, setToken] = useState(pb.authStore?.token);
  const [user, setUser] = useState<AuthModel>(pb.authStore?.model);

  useEffect(() => {
    return pb.authStore.onChange((token: string, model: AuthModel) => {
      setToken(token);
      setUser(model);
    });
  }, []);

  const register = useCallback(async (email: string, password: string) => {
    return await pb
      .collection("users")
      .create({ email, password, passwordConfirm: password });
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    return await pb.collection("users").authWithPassword(email, password);
  }, []);

  const logout = useCallback(() => {
    pb.authStore.clear();
  }, []);

  const refreshSession = useCallback(async () => {
    if (!pb.authStore.isValid) return;
    const decoded = jwtDecode(token);
    const tokenExpiration = decoded.exp;
    const expirationWithBuffer = (decoded?.exp ?? 0 + fiveMinutesInMs) / 1000;
    if (tokenExpiration ?? 0 < expirationWithBuffer) {
      await pb.collection("users").authRefresh();
    }
  }, [token]);

  useInterval(refreshSession, token ? twoMinutesInMs : null);

  return (
    <PocketContext.Provider
      value={{ register, login, logout, user, token, pb }}
    >
      {children}
    </PocketContext.Provider>
  );
};

export const usePocket = () => useContext(PocketContext);
