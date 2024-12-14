import "@/app/globals.css";
import { useUserRole } from "@/app/providers/userRole";
import { 
  Input,
  Button, 
  Textarea,
  Menu, 
  MenuButton,
  MenuList,
  Center,
  Box,
} from "@chakra-ui/react";

const CrearComentario = ({
  usuario,
  comentario,
  setComentario,
  idItem,
  cambio,
  setCambio,
}) => {

  const { userName, userRut } = useUserRole();

  const sendRequest = async () => {
    try {
      const response = await fetch(`http://172.233.25.94:54321/comentarios/${userRut}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rut: userRut, // ID of the user creating the comment
          id_punto: idItem, // ID of the point where the comment is being added
          detalles: comentario, // The actual comment
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create comment");
      }

      const data = await response.json();
      console.log("Comentario creado:", data);
      alert("Comentario creado exitosamente");
    } catch (error) {
      console.error("Error al crear el comentario:", error);
      alert("Hubo un error al crear el comentario");
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    sendRequest();
    setComentario("");
    setCambio(() => (!cambio));
  };

  return (
    <>
      <Menu size={"s"}>
        <MenuButton as={Button} mb={4}>
        Crear Comentario
        </MenuButton>

        <MenuList className="CrearComentarios">
          <form onSubmit={handleSubmit}>
            <Box textAlign={"center"}>
            <Textarea className="CrearComentariosInput" placeholder="Comentario" value={comentario} onChange={(e) => setComentario(e.target.value)} />
            <Button type="submit">Crear</Button>
            </Box>
          </form>
        </MenuList>
      </Menu>
    </>
  );
};

export default CrearComentario;