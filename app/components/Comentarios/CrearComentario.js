import "@/app/globals.css";
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
  setUsuario,
  comentario,
  setComentario,
  idItem,
  cambio,
  setCambio,
}) => {

  const sendRequest = async () => {
    const response = await fetch("/api/peticionPost", {
      method: "POST",
      body: JSON.stringify({
        usuario: usuario,
        idApp: "Reciclaje",
        idItem: idItem,
        comentario: comentario,
        timestamp: Date.now(),
        enRespuestaA: null
      }),
    });

    const data = await response.json();
    console.log(data);
    alert("Comentario creado");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    sendRequest();
    setUsuario("");
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
            <Input className="CrearComentariosInput" placeholder="Usuario" value={usuario} onChange={(e) => setUsuario(e.target.value)} />
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