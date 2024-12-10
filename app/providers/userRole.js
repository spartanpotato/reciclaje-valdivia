"use client";
import { createContext, useContext, useState } from "react";

const UserRoleContext = createContext();

export function UserRoleProvider({ children }) {
  const [userType, setUserType] = useState(null); 

  return (
    <UserRoleContext.Provider value={{ userType, setUserType }}>
      {children}
    </UserRoleContext.Provider>
  );
}

export function useUserRole() {
  return useContext(UserRoleContext);
}
