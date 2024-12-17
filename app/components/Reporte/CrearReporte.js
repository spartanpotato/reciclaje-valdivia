import "@/app/globals.css";
import { 
  Input, // Componente de entrada de texto.
  Button, // Componente de botón.
  Textarea, // Componente de área de texto.
  Menu, // Componente de menú desplegable (Dropdown menu).
  MenuButton, // Botón que activa el menú.
  MenuList, // Lista de elementos del menú.
  Box, // Componente de contenedor flexible.
  useDisclosure 
} from "@chakra-ui/react";
import { useState } from "react";
import { useUserRole } from "@/app/providers/userRole";
// Componente: Botón que permite hacer un reporte a un punto especifico


const CrearReporte = ({
    idItem, // Punto de reciclaje al que está asociado el reporte
  }) => { 
    const [reporte, setReporte] = useState("");
    const [estado, setEstado] = useState("pendiente"); // Estado inicial del reporte
    const [cambio, setCambio] = useState(false); 
    const { isOpen, onOpen, onClose } = useDisclosure(); // Controlar la apertura y cierre del menú
    const {userType, userName, userRut} = useUserRole(); // Obtener el userType del contexto
    // Función para enviar la solicitud POST a la API
    const sendRequest = async () => {
      try {
        const response = await fetch(`http://172.233.25.94:54321/reportes`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            estado: estado,
            id_punto: idItem,
            rut: userRut,
            detalles: reporte
          }),
        });
    
        if (!response.ok) {
          throw new Error("Fallo al crear el reporte");
        }

        console.log("Se creo un reporte!");
        alert("Se envió el reporte con exito!");
      } catch (error) {
        console.error("Error al crear el reporte:", error);
        alert("Hubo un error al crear un reporte");
      }

    };

    // Función para manejar el envío del formulario (TEMPORAL)
    const handleSubmit = async (e) => {
        e.preventDefault();
        await sendRequest(); // Llama a la función simulada
        setReporte(""); // Limpia el campo del reporte
        setCambio(() => !cambio); // Invierte el valor de cambio para forzar una actualización
    };

    if (userType == "guest" || userType == null) {
      return null;
    }
    // OBS: xs (extra small), sm (small), md (medium), lg (large), y xl (extra large).
    return (
        <>
          <Menu isOpen={isOpen} onClose={onClose} size={"md"}>
            <MenuButton onClick={onOpen} as={Button} mb={4} color="#b81052">
            Reportar
            </MenuButton>
            
            <MenuList className="CrearReportes">
                <form onSubmit={handleSubmit}>
                    <Box textAlign={"center"}>
                        <Textarea // Area donde se ingresa el texto del reporte
                            className="ReportInput" 
                            placeholder="Escribe tu reporte aquí" 
                            value={reporte} onChange={(e) => setReporte(e.target.value)} 
                            height="300px"
                            width="300px"
                        />
                        <Button type="submit">Enviar</Button>
                    </Box>
                </form>
            </MenuList>

          </Menu>
        </>
      );

    };

export default CrearReporte;