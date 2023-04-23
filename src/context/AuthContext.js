import React, { createContext, useState, useContext } from "react";
const AuthContext = createContext({});

export const AuthWrapper = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthWrapper;
export function useAuth() {
  return useContext(AuthContext);
}
