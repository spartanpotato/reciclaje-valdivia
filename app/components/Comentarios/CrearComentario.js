import { Text, Input, Button, Box, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import ListItemComment from "./ListItemComments";

const CrearComentario = ({
  usuario,
  setUsuario,
  comentario,
  setComentario,
  idItem,
  enRespuestaA,
  setEnRespuestaA,
}) => {
  const [ultimoComentario, setUltimoComentario] = useState({}); // [{}]

  const sendRequest = async () => {
    const response = await fetch("/api/peticionPost", {
      method: "POST",
      body: JSON.stringify({
        usuario: usuario,
        idApp: "Reciclaje",
        idItem: idItem,
        comentario: comentario,
        timestamp: Date.now(),
        enRespuestaA: enRespuestaA === "" ? null : enRespuestaA,
      }),
    });

    const data = await response.json();
    console.log(data);
    setUltimoComentario(data);
    alert("Comentario creado");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    sendRequest();
    // Reset form
    setUsuario("");
    setComentario("");
    setEnRespuestaA("");
  };

  return (
    <>
      <Box>
        <form onSubmit={handleSubmit}>
          <Input placeholder="Usuario" value={usuario} onChange={(e) => setUsuario(e.target.value)} />
          <Textarea placeholder="Comentario" value={comentario} onChange={(e) => setComentario(e.target.value)} />
          <Input placeholder="En respuesta a" value={enRespuestaA} onChange={(e) => setEnRespuestaA(e.target.value)} />
          <Button type="submit">Crear Comentario</Button>
        </form>
      </Box>
    </>
  );
};

export default CrearComentario;