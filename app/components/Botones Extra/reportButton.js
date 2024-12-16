"use client"; 
import { useEffect, useState } from "react";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

const ReportsRedirectButton = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const userAdmin = sessionStorage.getItem("isAdmin");

    if (userAdmin === "true") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, []);

  const handleRedirect = () => {
    if (isAdmin) {
      router.push("/reports");
    }
  };
  if(!isAdmin){
    return null;
  }
  return (
    <Button 
      onClick={handleRedirect}
    >
      Ver Todos Los Reportes
    </Button>
  );
};

export default ReportsRedirectButton;
