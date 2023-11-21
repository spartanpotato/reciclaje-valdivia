import React from "react";
import ListItemComment from "@/app/components/Comentarios/ListItemComments";
//Copiado del ejemplo
const ListComments = ({ comentarios, idItem }) => {
    return (
    <>
      {comentarios.map((comentario) => (
        <ListItemComment key={comentario._id} comentario={comentario} />
      ))}
      
    </>
  );
};

export default ListComments;
