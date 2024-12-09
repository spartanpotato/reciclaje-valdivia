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
  Flex,
} from "@chakra-ui/react";
import { useRef } from "react";
import ListComments from "./Comentarios/ListComments";
import CrearComentario from "./Comentarios/CrearComentario";
import { useState,useEffect } from "react";
import CrearReporte from "./Reporte/CrearReporte";

// Define el componente DrawerComponent y su estado utilizando:
// useState =  un hook de React que permite añadir estado a un componente funcional.
// useRef = hook de React que permite crear una referencia mutable que persiste durante 
// todo el ciclo de vida del componente.
const DrawerComponent = ({ isOpen, onClose, currentValue, array }) => {
  // comentarios : Estado que almacena una lista de comentarios.
  // setComentarios : Función para actualizar el estado "comentarios".
  // useState([]) : Se usa para inicializar el estado "comentarios" con un array vacío.
  const [comentarios, setComentarios] = useState([]); 
  const [usuario, setUsuario] = useState("");
  const [comentario, setComnetario] = useState("");
  const [enRespuestaA, setEnRespuestaA] = useState("");
  const [cambio, setCambio] = useState(true);
  const [reporte, setReporte] = useState("");
  const { btnOpen } = useRef();
  console.log(currentValue);

  // Permite realizar efectos secundarios en componentes funcionales, como obtener datos, 
  // suscribirse a servicios, o manipular el DOM.
  // Aquí se usa para obtener datos cuando cambio o currentValue cambian.
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/peticionGetIdApp?idApp=Reciclaje&idItem=" + currentValue.id);
      const data = await response.json();
      setComentarios(data);
    };
    fetchData();
  }, [cambio,currentValue]);

  // define la estructura y el contenido del componente DrawerComponent, que es una sideBar (drawer).
  // <Drawer> :  Componente principal del sideBar
  // <DrawerOverlay> : Crea una superposición detrás del drawer para oscurecer el contenido de fondo.
  // <DrawerContent> : Contenedor principal del contenido del drawer.
  // <DrawerCloseButton> : Botón para cerrar el drawer.
  // <DrawerHeader> : Encabezado del drawer. Muestra el nombre del currentValue
  // <DrawerBody>: Cuerpo del drawer. Contiene el contenido principal del drawer.
  // <Text> : Componente del texto de Chakra UI
  // <UnorderedList> : Lista desordenada. <ListItem> : Elementos de la lista
  // <CrearComentario> : Componente para crear un nuevo comentario.
  // <ListComments> : Muestra la lista de comentarios.
  // <Box> : Contenedor que envuelve el componente ListComments.
  // <DrawerFooter> : Pie de página del drawer. Contiene un botón para cerrar el drawer.
  // <Button> : Crea un botón.
  
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
                <ListComments comentarios={comentarios} cambio={cambio} setCambio={setCambio} />
                </Box>   
              </DrawerBody>

            </DrawerBody>

          <DrawerFooter>
            <Flex justify="space-between" width="100%">
              <CrearReporte
                  usuario={usuario}
                  setUsuario={setUsuario}
                  reporte={reporte}
                  setReporte={setReporte}
                  idItem={currentValue.id}
                  cambio={cambio}
                  setCambio={setCambio}
                />
              <Button variant="solid" size={"lg"} mr={3} onClick={onClose}>
                Volver
              </Button>
            </Flex>

          </DrawerFooter>

        </DrawerContent>
      </Drawer>
    </>
  );
};

export default DrawerComponent;