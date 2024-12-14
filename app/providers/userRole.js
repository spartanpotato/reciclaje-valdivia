"use client";
import { createContext, useContext, useState } from "react";

const UserRoleContext = createContext();

export function UserRoleProvider({ children }) {
  const [userType, setUserType] = useState(null); // For user type/role
  const [userName, setUserName] = useState(null); // For user name
  const [userRut, setUserRut] = useState(null); // For rut

  return (
    <UserRoleContext.Provider value={{ userType, setUserType, userName, setUserName, userRut, setUserRut }}>
      {children}
    </UserRoleContext.Provider>
  );
}

export function useUserRole() {
  return useContext(UserRoleContext);
}

