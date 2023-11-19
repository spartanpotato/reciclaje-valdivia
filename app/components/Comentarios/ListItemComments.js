"use client";
import { Box, Text } from "@chakra-ui/react";
//Copiado del ejemplo
const ListItemComment = ({ comentario }) => {
  const { enRespuestaA, idApp, idItem, comentario: comment, timestamp, usuario, __v, _id } = comentario;
     
  const esRespuesta = () => { // Función en caso de que el comentario sea en respuesta a otro comentario
    if ({enRespuestaA} == null){
      return null;
    }else{
      return (
        <Text>
          <b className="accent">enRespuestaA: </b>
          {enRespuestaA}
        </Text>
        )};
      };

  return (
    <Box mb={2} borderRadius='lg' border="3px solid lightgreen" p={4}>
      {/* ID's */}
      <Box mb={4}>
        <Text fontSize="lg">
          <b className="accent">Usuario: </b>
          {usuario}
        </Text>
        {esRespuesta()}
      </Box>
      {/* COMENTARIO */}
      <Box mb={4}>
        <Text>
          <b className="accent">comentario: </b>
          {comment}
        </Text>
      </Box>
    </Box>
  );
};

export default ListItemComment;
