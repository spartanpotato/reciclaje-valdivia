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
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  // Logica para registros
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    console.log("Registrando:", { username, password });
    router.push("/authentication/sign_in");
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
            <FormControl id="username" isRequired>
              <FormLabel>Usuario</FormLabel>
              <Input 
                type="text" 
                value={user} 
                onChange={(e) => setUser(e.target.value)} 
                placeholder="Nombre de usuario" 
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

