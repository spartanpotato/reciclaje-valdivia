"use client";

import { Box, Button, FormControl, FormLabel, Input, Heading, Text, Link, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/navigation"; 

export default function SignIn() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState(null); 
  const router = useRouter();

  // Logica para ingreso
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Entrando como:", { user, password });
    setUserType("user"); 
    router.push("/"); 
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
              <FormLabel>Usuario</FormLabel>
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
