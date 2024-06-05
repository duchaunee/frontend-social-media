/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import {
  clearAccessTokenToSession,
  getAccessTokenToSession,
} from "../utils/auth";
import { userApi } from "../apis";

const initialAppContext = {
  isAuthentication: Boolean(getAccessTokenToSession()),
  // isAuthentication: false,
  setIsAuthentication: () => null,
  user: null,
};
export const AppContext = createContext(initialAppContext);

export const AppProvider = ({ children }) => {
  const [isAuthentication, setIsAuthentication] = useState(
    initialAppContext.isAuthentication
  );
  const [user, setUser] = useState(initialAppContext.user);

  const getMe = async () => {
    try {
      const currentUser = await userApi.getMe();
      if (currentUser.sucess) {
        setUser(currentUser.user);
        setIsAuthentication(true);
      }
    } catch (e) {
      setUser(null);
      clearAccessTokenToSession(); //cái này mà mất mạng phát là bị logout à =))))))))))
      setIsAuthentication(false);
    }
  };

  useEffect(() => {
    getMe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AppContext.Provider
      value={{
        isAuthentication,
        setIsAuthentication,
        user,
        setUser,
        getMe,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
