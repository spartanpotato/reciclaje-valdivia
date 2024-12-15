"use client";
import "@/app/globals.css";
import { Box, Text } from "@chakra-ui/react";
import BorrarComentario from "./BorrarComentario";
const ListItemComment = ({ comentario }) => {
  const {detalles, usuario, id_comentario} = comentario;

  return (
    <Box className="comments" mb={3} borderRadius='5px' border="4px solid lightgreen" paddingTop={2} paddingBottom={2} paddingLeft={5}>
      {/* ID's */}
      <Box>
        <Text>
          <b> Usuario: </b>
          {usuario.nombre}
        </Text>        
      </Box>
      {/* COMENTARIO */}
      <Box>
        <Text>
          <b> comentario: </b>
          {detalles}
        </Text>
      </Box>
        <BorrarComentario
          usuario={usuario.rut}
          comentario={detalles}
          idItem={id_comentario}
        />
    </Box>
  );
};

export default ListItemComment;