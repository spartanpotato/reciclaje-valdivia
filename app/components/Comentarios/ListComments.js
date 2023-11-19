import React from "react";
import ListItemComment from "@/app/components/ListItemComment";
//Copiado del ejemplo
const ListComments = ({ comentarios, idItem }) => {
    return (
    <>
      {comentarios.filter(comentario => comentario.idItem === idItem).map((comentario) => (
        <ListItemComment key={comentario._id} comentario={comentario} />
      ))}
    </>
  );
};

export default ListComments;
