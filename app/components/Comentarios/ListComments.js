import React from "react";
import ListItemComment from "@/app/components/Comentarios/ListItemComments";

const ListComments = ({ comentarios, cambio, setCambio }) => {
  return (
    <>
      {comentarios.map((comentario) => (
        <ListItemComment 
          key={comentario._id} 
          comentario={comentario} 
          cambio={cambio} 
          setCambio={setCambio} 
        />
      ))}
    </>
  );
};

export default ListComments;