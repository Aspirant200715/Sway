import { useState, useEffect } from "react";
import axiosInstance from "../axiosCalls/axios";
import AuthContext from "./authContext";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    axiosInstance
      .get("/users/me")
      .then((response) => {
        setUser(response.data);
      })
      .catch((err) => {
        if (err.response?.status === 401) {
          setUser(null);
        } else {
          console.log(err);
        }
      })
      .finally(() => {
        setLoader(false);
      });
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loader, setLoader }}>
      {children}
    </AuthContext.Provider>
  );
};
