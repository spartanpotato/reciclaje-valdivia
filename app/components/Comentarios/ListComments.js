import React from "react";
import ListItemComment from "@/app/components/Comentarios/ListItemComments";

const ListComments = ({ comentarios }) => {
  return (
    <>
      {comentarios.map((comentario) => (
        <ListItemComment 
          key={comentario.id_comentario} 
          comentario={comentario} 
        />
      ))}
    </>
  );
};

export default ListComments;