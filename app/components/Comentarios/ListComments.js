import React from "react";
import ListItemComment from "@/app/components/Comentarios/ListItemComments";

const ListComments = ({ comentarios }) => {
  return (
    <>
      {comentarios.map((comentario) => (
        <ListItemComment 
          key={comentario._id} 
          comentario={comentario} 
        />
      ))}
    </>
  );
};

export default ListComments;