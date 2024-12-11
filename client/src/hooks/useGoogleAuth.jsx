import { useState, useMemo, useCallback } from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { userAuthApi } from "../apis/process";

export const useGoogleAuth = () => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const baseUrl = import.meta.env.VITE_BACKEND_URL;
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  const handleLogin = useCallback(
    async (response) => {
      const res = await userAuthApi(response);
      if (res) {
        localStorage.setItem("user", JSON.stringify(res));
        setUser(res);
      }
    },
    [baseUrl]
  );

  const logout = useCallback(() => {
    localStorage.removeItem("user");
    setUser(null);
  }, []);

  const GoogleAuthButton = useMemo(
    () => () =>
      (
        <GoogleOAuthProvider clientId={clientId}>
          <GoogleLogin
            onSuccess={handleLogin}
            onError={(err) => console.log(err)}
          />
        </GoogleOAuthProvider>
      ),
    [clientId, handleLogin]
  );

  return { user, logout, GoogleAuthButton };
};
