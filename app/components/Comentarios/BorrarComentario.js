import "@/app/globals.css";
import { 
  Button, // Componente de botón.
  Menu, // Componente de menú desplegable (Dropdown menu).
  MenuButton, // Botón que activa el menú.
  MenuList, // Lista de elementos del menú.
  Box, // Componente de contenedor flexible.
} from "@chakra-ui/react";
import { useState } from "react";
import { useUserRole } from "@/app/providers/userRole";
// Componente: Botón que permite hacer un reporte a un punto especifico

const BorrarComentario = ({
    usuario, // Usuario que creo el comentario.
    comentario, // Comentario a eliminar
    idItem, // Punto de reciclaje al que está asociado el reporte.
  }) => { 
    const {userType} = useUserRole(); // Obtener el userType del contexto
    const [cambio, setCambio] = useState(false); // Indicador booleano que se utiliza para forzar la actualización del componente.

    // Función simulada para enviar la solicitud (TEMPORAL)
    const sendRequest = async () => {
        // Simula el envío de la solicitud sin hacer nada
        console.log("Se eliminará:");
        console.log("Usuario:", usuario);
        console.log("Comentario:", comentario);
        console.log("ID del ítem:", idItem);
        alert("Comentario 'eliminado' localmente (no enviado)");
    };

    // Función para manejar el envío del formulario (TEMPORAL)
    const handleSubmit = async (e) => {
        e.preventDefault();
        await sendRequest(); // Llama a la función simulada
        // setCambio(() => !cambio); // Invierte el valor de cambio para forzar una actualización
    };

      // Renderizar el botón solo si el userType es "admin"
    if (userType !== "admin") {
        return null;
    }
    
    // OBS: xs (extra small), sm (small), md (medium), lg (large), y xl (extra large).
    return (
        <>
          <Menu size={"md"}>
            <MenuButton as={Button} mb={4} color="gray">
            ...
            </MenuButton>
            
            <MenuList className="BorrarComentario">
                <form onSubmit={handleSubmit}>
                    <Box textAlign={"center"}>
                        <Button type="submit">Borrar comentario</Button>
                    </Box>
                </form>
            </MenuList>
          </Menu>
        </>
      );

    };

export default BorrarComentario;