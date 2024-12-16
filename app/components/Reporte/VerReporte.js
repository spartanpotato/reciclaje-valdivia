// aqui va un codigaso que permite ver
// los reportes de un punto clikeado en el mapa
// no confundir con reportButton que sirve para ver todos
// los reportes en general (mas que nada la cantidad y redirigirlo de manera automatica al punto indicado)
// si se puede hacer y es mi pega -NMoon
"use client"; 
import { useEffect, useState } from "react";
import { Button } from "@chakra-ui/react";

const ReportSeeButton = ({setOpenSesamoe}) => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const userAdmin = localStorage.getItem("isAdmin");

    if (userAdmin === "true") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, []);
  if(!isAdmin){
    return null;
  }
  const handleOpenMagicly = () =>{
    setOpenSesamoe(true);
  };
  return (
    <Button 
      onClick={handleOpenMagicly}
    >
      Ver Reportes
    </Button>
  );
};

export default ReportSeeButton;
