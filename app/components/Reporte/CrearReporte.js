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
    // EL ID CAMBIARÁ DESPUES, CAMBIAR ID DEL PUNTO
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
            id_punto: idItem, // EL ID CAMBIARÁ DESPUES, CAMBIAR ID DEL PUNTO
            rut: userRut,
            detalles: reporte
          }),
        });
    
        if (response.ok) {
          const data = await response.json();
          console.log("Reporte creado:", data);
          alert("Reporte creado exitosamente");
          onClose();
        } else {
          const errorData = await response.json();
          console.error("Error en la solicitud:", errorData);
          alert(`Error: ${JSON.stringify(errorData.detail) || "Algo salió mal"}`);
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
        alert(`Error en la solicitud: ${JSON.stringify(error.message)}`);
      }
    };
    // // Función simulada para enviar la solicitud (TEMPORAL)
    // const sendRequest = async () => {
    //     // Simula el envío de la solicitud sin hacer nada
    //     console.log("Datos ingresados:");
    //     console.log("Usuario:", usuario);
    //     console.log("Reporte:", reporte);
    //     console.log("ID del ítem:", idItem);
    //     onClose();
    //     alert("Comentario procesado localmente (no enviado)");
    // };

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
                        <Input // Sección donde se ingresa el nombre del usuario que hace el reporte
                            className="ReportInput" 
                            placeholder="Usuario" 
                            value={userName}
                            readOnly 
                        />
                        <Textarea // Area donde se ingresa el texto del reporte
                            className="ReportInput" 
                            placeholder="Reporte" 
                            value={reporte} onChange={(e) => setReporte(e.target.value)} 
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