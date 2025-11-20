// @ts-nocheck
import { useState, useEffect } from "react";
import { useToken } from "./useToken.js";
import { useNavigate } from "react-router-dom";

export const useUser = () => {
  const navigate = useNavigate();
  const [token] = useToken();

  if (token) {
    const userPayload = () => {
      // atob fn decodes an encoded string
      const parsedPayload = JSON.parse(atob(splitToken));
      return parsedPayload;
    };

    // parse the token to get the payload (user info)
    const splitToken = token.split(".")[1];
    // set user in state
    const [user, setUser] = useState(userPayload);

    // load the payload(user) everytime window changes so that the token is visible all times,
    // ---this tells the browser that the user using the token is who they say they are, this allows this user to stay logged in for a certain amount of time.
    useEffect(() => {
      setUser(userPayload);
    }, [token]);
    return [user];
  } else return [{ fname: "", lname: "", username: "", email: "", password: "", image: " " }];
};
