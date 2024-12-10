import "@/app/globals.css";
import { 
  Input, // Componente de entrada de texto.
  Button, // Componente de botón.
  Textarea, // Componente de área de texto.
  Menu, // Componente de menú desplegable (Dropdown menu).
  MenuButton, // Botón que activa el menú.
  MenuList, // Lista de elementos del menú.
  Box, // Componente de contenedor flexible.
} from "@chakra-ui/react";

const CrearReporte = ({
    usuario, // Usuario que está creando el reporte.
    setUsuario, // Actualiza el estado del nombre del usuario.
    reporte, // Texto del reporte.
    setReporte, // Actualiza el estado del texto del reporte.
    idItem, // Punto de reciclaje al que está asociado el reporte.
    cambio, // Indicador booleano que se utiliza para forzar la actualización del componente.
    setCambio, // Función que se utiliza para actualizar el estado cambio.
  }) => { 

    // Función simulada para enviar la solicitud (TEMPORAL)
    const sendRequest = async () => {
        // Simula el envío de la solicitud sin hacer nada
        console.log("Datos ingresados:");
        console.log("Usuario:", usuario);
        console.log("Reporte:", reporte);
        console.log("ID del ítem:", idItem);
        alert("Comentario procesado localmente (no enviado)");
    };

    // Función para manejar el envío del formulario (TEMPORAL)
    const handleSubmit = async (e) => {
        e.preventDefault();
        await sendRequest(); // Llama a la función simulada
        setUsuario(""); // Limpia el campo de usuario
        setReporte(""); // Limpia el campo del reporte
        setCambio(() => !cambio); // Invierte el valor de cambio para forzar una actualización
    };

    // OBS: xs (extra small), sm (small), md (medium), lg (large), y xl (extra large).
    return (
        <>
          <Menu size={"md"}>
            <MenuButton as={Button} mb={4} color="#b81052">
            Reportar
            </MenuButton>
            
            <MenuList className="CrearReportes">
                <form onSubmit={handleSubmit}>
                    <Box textAlign={"center"}>
                        <Input // Sección donde se ingresa el nombre del usuario que hace el reporte
                            className="ReportInput" 
                            placeholder="Usuario" 
                            value={usuario} onChange={(e) => setUsuario(e.target.value)} 
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