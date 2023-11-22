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
import CrearComentario from "./Comentarios/CrearComentario";
import { useState,useEffect } from "react";

const DrawerComponent = ({ isOpen, onClose, currentValue, array }) => {
  const [comentarios, setComentarios] = useState([]);
  const [idApp, setIdApp] = useState("");
  const [idItem, setIdItem] = useState("");
  const [usuario, setUsuario] = useState("");
  const [comentario, setComnetario] = useState("");
  const [enRespuestaA, setEnRespuestaA] = useState("");
  const { btnOpen } = useRef();
  console.log(currentValue);


  const handleSubmit = (e) => {
    e.preventDefault();
    const fetchData = async () => {
      // Query : idApp
      const response = await fetch("/api/peticionGetIdApp?idApp=Reciclaje&idItem=" + currentValue.id);
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

            <CrearComentario
            usuario={usuario}
            setUsuario={setUsuario}
            comentario={comentario}
            setComentario={setComnetario}
            idItem={currentValue.id}
            enRespuestaA={enRespuestaA}
            setEnRespuestaA={setEnRespuestaA}
            />

            <Box>
              <Text fontSize="xxl" fontWeight="bold" mb={4}>
                Comentarios
              </Text>

              <form onSubmit={handleSubmit}>
                <Button type="submit">Ver comentarios</Button>
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
