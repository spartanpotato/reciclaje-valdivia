import "@/app/globals.css";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  ListItem,
  UnorderedList,
  Box,
  Input,
  Text,
} from "@chakra-ui/react";
import { useRef } from "react";
import ListComments from "./Comentarios/ListComments";
import { useState,useEffect } from "react";

const DrawerComponent = ({ isOpen, onClose, currentValue, array }) => {
  const [comentarios, setComentarios] = useState([]);
  const [idApp, setIdApp] = useState("");
  const [idItem, setIdItem] = useState("");
  const { btnOpen } = useRef();
  console.log(currentValue);


  const handleSubmit = (e) => {
    e.preventDefault();
    const fetchData = async () => {
      // Query : idApp
      const response = await fetch("/api/peticionGetIdApp?idApp=" + idApp + "&idItem=" + idItem);
      const data = await response.json();
      console.log(data);
      setComentarios(data);
    };
    fetchData();
  };


  return (
    <>
      <Drawer finalFocusRef={btnOpen} isOpen={isOpen} placement="right" onClose={onClose} size={"md"}>
        <DrawerOverlay />
        <DrawerContent fontSize={"1.5vw"} background={"green.100"}>
          <DrawerCloseButton />
          <DrawerHeader fontSize={"2vw"}>{currentValue.nombre}</DrawerHeader>
          <DrawerBody>

            <DrawerHeader fontSize={"1.75vw"} alignContent={"center"}>
              <ul>
                <li>Permite reciclar:</li>
              </ul>
            </DrawerHeader>

            <UnorderedList>
              {array.map((info) => {
                const state = info.estado;
                if (state === 1){
                return(
                <ListItem>{info.tipo}</ListItem>
                )}})}
            </UnorderedList>

            <Box>
              <Text fontSize="xxl" fontWeight="bold" mb={4}>
                Comentarios
              </Text>

              <form onSubmit={handleSubmit}>
                <Input placeholder="Buscar por idApp" mb={4} onChange={(e) => setIdApp(e.target.value)} value={idApp} />
                <Input placeholder="Buscar por idItem" mb={4} onChange={(e) => setIdItem(e.target.value)} value={idItem} />
                <Button type="submit">Buscar</Button>
              </form>

              <Box>
                <Text fontSize="xl" fontWeight="bold" mb={4} color="red.500">
                  {comentarios.message && <Text>{comentario.message}</Text>}
                </Text>
                <ListComments comentarios={comentarios} />
              </Box>
              
            </Box>

          </DrawerBody>

          <DrawerFooter>
            <Button variant="solid" colorScheme={"teal"} color={"black"} mr={3} onClick={onClose}>
              Volver
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default DrawerComponent;
