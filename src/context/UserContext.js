import React, { createContext, useState, useContext, useEffect } from "react";

const UserContext = createContext({});

export const UserWrapper = ({ children }) => {
  return <UserContext.Provider value={{}}>{children}</UserContext.Provider>;
};

export default UserWrapper;
export function useUser() {
  return useContext(UserContext);
}
