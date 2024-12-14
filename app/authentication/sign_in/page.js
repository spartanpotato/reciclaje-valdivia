"use client";

import { Box, Button, FormControl, FormLabel, Input, Heading, Text, Link, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/navigation"; 
import { useUserRole } from "@/app/providers/userRole";

export default function SignIn() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const {userType, setUserType, userName, setUserName, userRut, setUserRut} = useUserRole();
  const router = useRouter();
  /*
  // Logica para ingreso temporal
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Entrando como:", { user, password });
    if(user === "admin"){
      setUserType("admin");
    }
    else{
      setUserType("user"); 
    }
    router.push("/"); 
  };
  */
  // Logica de ingreso cuando este implementada la api
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Entrando como:", { user, password });
  
    try {
      // Enviar data a la api
      const response = await fetch("http://172.233.25.94:54321/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rut: user,
          contrasena: password,
        }),
      });
  
      // Recibir respuesta de la api
      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
  
        // Cambiar tipo de usuario si el login funciona
        if (data.admin == true) {
          setUserType("admin");
          localStorage.setItem("isAdmin","true");
        } else {
          setUserType("user");
        }
        setUserName(data.nombre);
        setUserRut(data.rut);
        localStorage.setItem("isAuthenticated", "true");
        router.push("/"); 
      } else {
        const errorData = await response.json();
        console.error("Error de autenticación:", errorData.detail);
      }
    } catch (error) {
      console.error("Error de conexión:", error.message);
    }
  };
  

  // Logica para ignreso visita
  const handleGuestLogin = () => {
    console.log("Entrando como visita");
    setUserType("guest"); 
    router.push("/"); 
  };

  return (
    <Box 
      minH="100vh" 
      display="flex" 
      justifyContent="center" 
      alignItems="center" 
      bg="gray.100" 
      px={4}
    >
      <Box 
        bg="white" 
        p={8} 
        rounded="lg" 
        shadow="lg" 
        width={{ base: "100%", sm: "400px" }}
      >
        <Heading as="h1" size="lg" mb={4} textAlign="center">
          Ingresar
        </Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl id="user" isRequired>
              <FormLabel>Rut usuario</FormLabel>
              <Input 
                type="text" 
                value={user} 
                onChange={(e) => setUser(e.target.value)} 
                placeholder="Ingresar usuario" 
                focusBorderColor="green.500"
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Contraseña</FormLabel>
              <Input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Ingresar contraseña" 
                focusBorderColor="green.500"
              />
            </FormControl>
            <Button type="submit" colorScheme="green" width="full">
              Entrar
            </Button>
          </VStack>
        </form>
        <Text mt={4} textAlign="center">
          No tienes una cuenta?{" "}
          <Link color="green.500" href="/authentication/sign_up">
            Registrarse
          </Link>
        </Text>
        <Button 
          mt={4} 
          variant="outline" 
          colorScheme="green" 
          width="full" 
          onClick={handleGuestLogin}  
        >
          Continuar como Visitante
        </Button>
      </Box>
    </Box>
  );
}
