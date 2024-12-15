"use client"; // Asegura que este código se ejecute en el cliente

import { useEffect, useState } from "react";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation"; // Usamos useRouter para manejar la redirección

const LoginRedirectButton = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  // Verificar si el usuario está autenticado al montar el componente
  useEffect(() => {
    const userSession = localStorage.getItem("isAuthenticated");

    // Si el valor no está presente o no es "true", el usuario no está autenticado
    if (userSession === "true") {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  // Función que maneja la redirección al login
  const handleRedirect = () => {
    // Si no está autenticado, redirigimos al login
    if (!isAuthenticated) {
      router.push("/authentication/sign_in"); // Aquí "/login" es la ruta del componente de inicio de sesión
    }
    else {
      // Si está autenticado, cerramos la sesión
      localStorage.setItem("isAuthenticated", "false");
      setIsAuthenticated(false);
      //Recargar la pagina
      window.location.reload();
    }
  };

  return (
    <Button 
      colorScheme={isAuthenticated ? "red" : "green"} 
      onClick={handleRedirect}
    >
      {isAuthenticated ? "Cerrar sesión" : "Iniciar sesión"}
    </Button>
  );
};

export default LoginRedirectButton;
