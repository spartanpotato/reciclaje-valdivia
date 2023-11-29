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
  Text,
} from "@chakra-ui/react";
import { useRef } from "react";
import ListComments from "./Comentarios/ListComments";
import CrearComentario from "./Comentarios/CrearComentario";
import { useState,useEffect } from "react";

const DrawerComponent = ({ isOpen, onClose, currentValue, array }) => {
  const [comentarios, setComentarios] = useState([]);
  const [usuario, setUsuario] = useState("");
  const [comentario, setComnetario] = useState("");
  const [enRespuestaA, setEnRespuestaA] = useState("");
  const [cambio, setCambio] = useState(true);
  const { btnOpen } = useRef();
  console.log(currentValue);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/peticionGetIdApp?idApp=Reciclaje&idItem=" + currentValue.id);
      const data = await response.json();
      setComentarios(data);
    };
    fetchData();
  }, [cambio,currentValue]);

  return (
    <>
      <Drawer finalFocusRef={btnOpen} isOpen={isOpen} placement="right" onClose={onClose} size={"lg"}>
        <DrawerOverlay/>
        <DrawerContent className="Drawer" fontSize={"xl"} background={"green.100"}>
          <DrawerCloseButton />

          <DrawerHeader fontSize={"3xl"}>{currentValue.nombre}</DrawerHeader>

            <DrawerBody>
            <DrawerHeader>
              <Text fontSize="2xl" fontWeight="bold" mb={2} mt={2}>
                Permite reciclar:
              </Text>
            </DrawerHeader>

            <DrawerBody>
              <UnorderedList>
                {array.map((info) => {
                  const state = info.estado;
                  if (state === 1){
                  return(
                  <ListItem>{info.tipo}</ListItem>
                  )}})}
              </UnorderedList>
            </DrawerBody>


            <DrawerHeader>
              <Text fontSize="2xl" fontWeight="bold" mb={2} mt={4}>
                Comentarios:
              </Text>
            </DrawerHeader>

            <DrawerBody>
              <CrearComentario
                usuario={usuario}
                setUsuario={setUsuario}
                comentario={comentario}
                setComentario={setComnetario}
                idItem={currentValue.id}
                enRespuestaA={enRespuestaA}
                setEnRespuestaA={setEnRespuestaA}
                cambio={cambio}
                setCambio={setCambio}
              />
              <Box>
                <ListComments comentarios={comentarios} />
              </Box>   
            </DrawerBody>
            </DrawerBody>
            

          <DrawerFooter>
            <Button variant="solid" size={"lg"} mr={3} onClick={onClose}>
              Volver
            </Button>
          </DrawerFooter>

        </DrawerContent>
      </Drawer>
    </>
  );
};

export default DrawerComponent;