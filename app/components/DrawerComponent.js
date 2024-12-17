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
import { useRef, useState, useEffect } from "react";
import ListComments from "./Comentarios/ListComments";
import CrearComentario from "./Comentarios/CrearComentario";
import CrearReporte from "./Reporte/CrearReporte";
import EditarPunto from "./puntos/EditarPunto";
import ReportSeeButton from "./Reporte/VerReporte";
import ReportInPoint from "./Reporte/ReportePunto";

// Componente : Sidebar en el mapa al apretar un punto
const DrawerComponent = ({ isOpen, onClose, currentValue, array, onUpdate }) => {
  const [comentarios, setComentarios] = useState([]); 
  const [usuario, setUsuario] = useState("");
  const [comentario, setComentario] = useState();
  const [cambio, setCambio] = useState(true); // Trigger para actualizaciones
  const { btnOpen } = useRef();
  const [isOpenSesamoe, setOpenSesamoe] = useState(false);
  const [currentArray, setCurrentArray] = useState([]);

  // Función para capitalizar y reemplazar los guiones bajos por barras
  const capitalizeAndFormat = (text) => {
    return text
      .replace(/_/g, "/") // Reemplaza "_" por "/"
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitaliza cada palabra
      .join(" ");
  };

  // Refresca los datos de comentarios y tipos
  useEffect(() => {
    if (!currentValue || !currentValue.tipos) return;

    const fetchData = async () => {
      try {
        const response = await fetch(`http://172.233.25.94:54321/comentarios/${currentValue.id}`);
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();
        setComentarios(data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    const tiposArray = Object.entries(currentValue.tipos)
      .filter(([key]) => key !== "id_tipo")
      .map(([key, value]) => ({ key, value }));
    setCurrentArray(tiposArray);

    fetchData();
  }, [cambio, currentValue]);

  // Llama a esta función para actualizar datos al editar un punto
  const handleUpdate = () => {
    setCambio(!cambio); // Cambia el trigger para refrescar el `useEffect`
    if (onUpdate) onUpdate(); // Notifica al componente padre
  };

  return (
    <>
      <Drawer finalFocusRef={btnOpen} isOpen={isOpen} placement="right" onClose={onClose} size={"lg"}>
        <DrawerOverlay />
        <DrawerContent className="Drawer" fontSize={"xl"} background={"green.100"}>
          <DrawerCloseButton />

          <DrawerHeader fontSize={"3xl"}>
            {currentValue.direccion}
            <EditarPunto 
              onUpdate={handleUpdate} // Actualiza después de editar
              admin={usuario}
              item={currentValue}
            />
            <ReportSeeButton setOpenSesamoe={setOpenSesamoe} />
          </DrawerHeader>

          <DrawerBody>
            <DrawerHeader>
              <Text fontSize="2xl" fontWeight="bold" mb={2} mt={2}>
                Permite reciclar:
              </Text>
            </DrawerHeader>
            <DrawerBody>
              <UnorderedList>
                {currentArray.map((info) => (
                  info.value && <ListItem key={info.key}>{capitalizeAndFormat(info.key)}</ListItem>
                ))}
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
                comentario={comentario}
                setComentario={setComentario}
                idItem={currentValue.id}
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
              <CrearReporte idItem={currentValue.id} />
              <Button variant="solid" size={"lg"} mr={3} onClick={onClose}>
                Volver
              </Button>
              <ReportInPoint />
            </Flex>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <ReportInPoint isOpen={isOpenSesamoe} setOpen={setOpenSesamoe} idPoint={currentValue.id} />
    </>
  );
};

export default DrawerComponent;
