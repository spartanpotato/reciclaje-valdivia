"use client";
import "@/app/globals.css";
import { Box, Text } from "@chakra-ui/react";
import BorrarComentario from "./borrarComentario";
const ListItemComment = ({ comentario, cambio, setCambio}) => {
  const {comentario: comment, usuario, idItem} = comentario;

  return (
    <Box className="comments" mb={3} borderRadius='5px' border="4px solid lightgreen" paddingTop={2} paddingBottom={2} paddingLeft={5}>
      {/* ID's */}
      <Box>
        <Text>
          <b> Usuario: </b>
          {usuario}
        </Text>        
      </Box>
      {/* COMENTARIO */}
      <Box>
        <Text>
          <b> comentario: </b>
          {comment}
        </Text>
      </Box>
        <BorrarComentario>
          usuario={usuario}
          comentario={comment}
          idItem={idItem}
          cambio={cambio}
          setCambio={setCambio}
        </BorrarComentario>
    </Box>
  );
};

export default ListItemComment;