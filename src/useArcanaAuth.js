import { AppMode, AuthProvider } from "@arcana/auth";
import { useEffect, useState } from "react";

//Config
const appId = 20;

let auth;

function useArcanaAuth() {
  const [initialized, setInitialized] = useState(false);

  const initializeAuth = async () => {
    if (!auth) {
      auth = new AuthProvider(appId);
      await auth.init({ appMode: AppMode.NoUI, position: "right" });
      setInitialized(true);
    }
  }

  //Check isLoggedIn
  const isLoggedIn = async () => {
    if(initialized) {
      return await auth.isLoggedIn();
    }
  }

  //Social Login
  
  const login = async (socialType) => {
    if(initialized) {
      await auth.loginWithSocial(socialType);
    }
  }

  //Email Link/ Passwordless login
  const loginWithLink = async (email) => {
    if(initialized) {
      await auth.loginWithLink(email);
    }
  }

  //Getting user Accounts
  const getAccounts = async () => {
    if(initialized) {
      return await auth.provider.request({ method: "eth_accounts" });
    }
  }
  
  //Logout
  const logout = async () => {
    if(initialized) {
      return await auth.logout();
    }
  }

  return {
    initializeAuth,
    isLoggedIn,
    login,
    loginWithLink,
    getAccounts,
    logout,
    initialized,
  };
}

export default useArcanaAuth;