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

const BorrarComentario = ({ idCom }) => { 
    const {userType} = useUserRole(); // Obtener el userType del contexto
    const [cambio, setCambio] = useState(false); // Indicador booleano que se utiliza para forzar la actualización del componente.


    // Función para enviar la solicitud DELETE a la API
    const sendRequest = async () => {
      try {
        const response = await fetch(`http://172.233.25.94:54321/comentarios/${idCom}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Fallo eliminar el comentario");
        }

        console.log("Comentario eliminado");
        alert("Comentario eliminado exitosamente");
      } catch (error) {
        console.error("Error al eliminar el comentario:", error);
        alert("Hubo un error al eliminar el comentario");
      }
    };


        // Función simulada para enviar la solicitud (TEMPORAL)
    // const sendRequest = async () => {
    //     // Simula el envío de la solicitud sin hacer nada
    //     console.log("Se eliminará:");
    //     console.log("Usuario:", usuario);
    //     console.log("Comentario:", comentario);
    //     console.log("ID del ítem:", idItem);
    //     alert("Comentario 'eliminado' localmente (no enviado)");
    // };
    

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