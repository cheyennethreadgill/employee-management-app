import { useState } from "react";

// Define the type for setToken function
type SetTokenType = (newToken: string) => void;

// get token from frontend
export const useToken = (): [string, SetTokenType] => {
  // get token that's in local storage in state
  const initialToken = (): string => {
    const g = localStorage.getItem("token") || "";
    return g;
  };

  const [token, setInternalToken] = useState<string>(initialToken); // Explicitly specify the type as string

  // then set the token that is passed in from frontend via signup or login page
  const setToken: SetTokenType = (newToken: string) => {
    localStorage.setItem("token", newToken);
    // then reset the token that's in storage above
    setInternalToken(newToken);
    console.log(`Initial Token: ${token}`);
    console.log(`Token passed from user: ${newToken}`);
  };

  return [token, setToken];
};
