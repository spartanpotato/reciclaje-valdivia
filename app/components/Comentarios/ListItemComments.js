"use client";
import "@/app/globals.css";
import { Box, Text } from "@chakra-ui/react";
import BorrarComentario from "./BorrarComentario";
const ListItemComment = ({ comentario }) => {
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
        <BorrarComentario
          usuario={usuario}
          comentario={comment}
          idItem={idItem}
        />
    </Box>
  );
};

export default ListItemComment;