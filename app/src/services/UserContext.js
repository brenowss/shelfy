import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import api from "./api";

const Context = createContext();

const UserProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [activeUser, setActiveUser] = useState(null);
  const [success, setSuccess] = useState(false);
  const [wrongCredentials, setWrongCredentials] = useState(false);
  const [existentEmail, setExistentEmail] = useState(false);

  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem("token");
      const user = await AsyncStorage.getItem("user");
      if (token && user) {
        setAuthenticated(true);
        setActiveUser(JSON.parse(user));
      } else {
        setAuthenticated(false);
      }
    })();

    return () => setExistentEmail(false);
  }, [authenticated]);

  function handleLogin(data) {
    api
      .post("/auth", data)
      .then((res) => {
        AsyncStorage.setItem("token", JSON.stringify(res.data.token));
        AsyncStorage.setItem("user", JSON.stringify(res.data.user));
        setAuthenticated(true);

        setWrongCredentials(false);
      })
      .catch(
        (error) => error.response.status === 401 && setWrongCredentials(true)
      );
  }

  function handleLogout() {
    setAuthenticated(false);
    AsyncStorage.removeItem("token");
    AsyncStorage.removeItem("user");
  }

  function handleRegister(data) {
    api
      .post("/users", data)
      .then((res) => {
        res.status === 200 && setSuccess(true);
        setTimeout(() => {
          handleLogin(data);
        }, 600);
      })
      .catch(
        (error) => error.response.status === 409 && setExistentEmail(true)
      );
  }

  async function handleFavoriteChange(book_id) {
    const oldUser = await AsyncStorage.getItem("user");
    const parsedUser = JSON.parse(oldUser);
    parsedUser.favorite_book = book_id;
    AsyncStorage.setItem("user", JSON.stringify(parsedUser));
    setActiveUser(parsedUser);
  }

  return (
    <Context.Provider
      value={{
        authenticated,
        activeUser,
        wrongCredentials,
        existentEmail,
        success,
        setSuccess,
        setExistentEmail,
        handleLogin,
        handleLogout,
        handleRegister,
        handleFavoriteChange,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { Context, UserProvider };
