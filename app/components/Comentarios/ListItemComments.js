"use client";
import "@/app/globals.css";
import { Box, Text } from "@chakra-ui/react";
//Copiado del ejemplo
const ListItemComment = ({ comentario }) => {
  const { enRespuestaA, comentario: comment, timestamp, usuario, __v, _id } = comentario;

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
    </Box>
  );
};

export default ListItemComment;
