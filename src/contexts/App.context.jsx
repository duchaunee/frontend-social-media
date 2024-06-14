/* eslint-disable react/prop-types */
import { createContext, useLayoutEffect, useState } from "react";
import {
  clearAccessTokenToSession,
  getAccessTokenToSession,
} from "../utils/auth";
import { userApi } from "../apis";
import { useQuery } from "@tanstack/react-query";
// import * as firebaseConfig from "../firebaseConfig/firebase.config"; //khai báo để file khởi chạy --> tạo ra instance các hàm firebase khi chạy app, nếu import ở các file khác thì nó lấy ra file này từ cache chứ không chạy lại file nữa

const initialAppContext = {
  isAuthentication: Boolean(getAccessTokenToSession()),
  // isAuthentication: false,
  setIsAuthentication: () => null,
  user: null,
  overlayPostId: null, //null hoặc chứa id post
};
export const AppContext = createContext(initialAppContext);

export const AppProvider = ({ children }) => {
  const [isAuthentication, setIsAuthentication] = useState(
    initialAppContext.isAuthentication
  );
  const [overlayPostId, setOverlayPostId] = useState(
    initialAppContext.overlayPostId
  );

  const { data, isSuccess, isError } = useQuery({
    queryKey: ["getMe"],
    queryFn: () => userApi.getMe(),
  });
  const user = data?.user;
  // console.log("user: ", user);

  useLayoutEffect(() => {
    if (isSuccess) {
      setIsAuthentication(true);
    } else if (isError) {
      clearAccessTokenToSession(); //cái này mà mất mạng phát là bị logout à =))))))))))
      setIsAuthentication(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // if (!data) return;

  return (
    <AppContext.Provider
      value={{
        isAuthentication,
        setIsAuthentication,
        user,
        overlayPostId,
        setOverlayPostId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
