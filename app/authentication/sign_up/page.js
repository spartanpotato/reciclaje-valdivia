"use client";

import { 
  Box, 
  Button, 
  FormControl, 
  FormLabel, 
  Input, 
  Heading, 
  Text, 
  Link, 
  VStack 
} from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/navigation"; 

export default function SignUp() {
  const [rut, setRut] = useState("");
  const [user, setUser] = useState("");
  const [phoneNum, setPhoneNum] = useState();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  /*
  // Logica para registros temporal
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    console.log("Registrando:", { username, password });
    router.push("/authentication/sign_in");
  };
  */

  // Logica para registros con api
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
  
    const newUser = {
      rut,
      nombre,
      admin,
      contrasena,
      numerotelefono,
    };
  
    try {
      // Enviar data a api
      const response = await fetch("http://172.233.25.94:54321/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
  
      // Recibir respuesta
      if (response.ok) {
        const data = await response.json();
        console.log("Usuario creado:", data);
        router.push("/authentication/sign_in");
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.detail || "Algo salió mal"}`);
      }
    } catch (error) {
      console.error("Error al crear usuario:", error);
      alert("Error de conexión. Intenta nuevamente.");
    }
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
          Registrarse
        </Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl id="rut" isRequired>
              <FormLabel>Rut</FormLabel>
              <Input 
                type="text" 
                value={rut} 
                onChange={(e) => setRut(e.target.value)} 
                placeholder="Rut" 
                focusBorderColor="green.500"
              />
            </FormControl>
            <FormControl id="username" isRequired>
              <FormLabel>Nombre de usuario</FormLabel>
              <Input 
                type="text" 
                value={user} 
                onChange={(e) => setUser(e.target.value)} 
                placeholder="Nombre de usuario" 
                focusBorderColor="green.500"
              />
            </FormControl>
            <FormControl id="phoneNum" isRequired>
              <FormLabel>Numero de telefono</FormLabel>
              <Input 
                type="text" 
                value={phoneNum} 
                onChange={(e) => setPhoneNum(e.target.value)} 
                placeholder="numero de telefono" 
                focusBorderColor="green.500"
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Contraseña</FormLabel>
              <Input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Crear contraseña" 
                focusBorderColor="green.500"
              />
            </FormControl>
            <FormControl id="confirmPassword" isRequired>
              <FormLabel>Confirmar Contraseña</FormLabel>
              <Input 
                type="password" 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
                placeholder="Repetir contraseña" 
                focusBorderColor="green.500"
              />
            </FormControl>
            <Button type="submit" colorScheme="green" width="full">
              Crear Cuenta
            </Button>
          </VStack>
        </form>
        <Text mt={4} textAlign="center">
          ¿Ya tienes una cuenta?{" "}
          <Link color="green.500" href="/authentication/sign_in">
            Ingresar
          </Link>
        </Text>
      </Box>
    </Box>
  );
}

