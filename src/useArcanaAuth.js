import { AppMode, AuthProvider } from "@arcana/auth";
import { useEffect, useState } from "react";

//Config
const appAdd = '---';

let auth = new AuthProvider(appAdd);

function useArcanaAuth() {
  const [initialized, setInitialized] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const initializeAuth = async () => {
    await auth.init({ appMode: AppMode.Full, position: "right" });
    setInitialized(true);
  };

  //Social Login

  const login = async (socialType) => {
    if (initialized) {
      await auth.loginWithSocial(socialType);
      setLoggedIn(true);
    }
  };

  //Email Link/ Passwordless login
  const loginWithLink = async (email) => {
    if (initialized) {
      await auth.loginWithLink(email);
      setLoggedIn(true);
    }
  };

  //Getting user Accounts
  const getAccounts = async () => {
    if (initialized) {
      return await auth.provider.request({ method: "eth_accounts" });
    }
  };

  //Logout
  const logout = async () => {
    if (initialized && loggedIn) {
      await auth.logout();
      setLoggedIn(false);
    }
  };

  useEffect(() => {
    const checkLogin = async () => {
      await auth.init();
      if (await auth.isLoggedIn()) {
        setLoggedIn(true);
      }
    };
    checkLogin();
  }, []);

  return {
    initializeAuth,
    loggedIn,
    login,
    loginWithLink,
    getAccounts,
    logout,
    initialized,
  };
}

export default useArcanaAuth;