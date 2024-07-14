import React, { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  //const [user, setUser] = useState({id:1, role:"admin"}) // Reemplazar por una consulta el servidor
  const [user, setUser] = useState(null);

  const login = (userCredentials) => setUser(userCredentials);
  const logout = () => setUser(null);

  const isLogged = () => !!user;
  const hasRole = (role) => user?.role === role;

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isLogged,
        hasRole,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
