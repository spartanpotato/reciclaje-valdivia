"use client";
import { Box, Button, Table, Thead, Tbody, Tr, Th, Td, Heading } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";

export default function Reports() {
  const router = useRouter();
  const [reportes, setReportes] = useState([]);
  useEffect(() => {
    const obtenerReportes = async () => {
      try {
        const response = await fetch('http://172.233.25.94:54321/resumen_reportes');
        if (!response.ok) {
          throw new Error('Error al obtener los reportes');
        }
        const data = await response.json();
        setReportes(data);
      } catch (error) {
        console.error(error);
      }
    };
    obtenerReportes();
  },[]);

  const handleRedirect = (posX,posY) => {
    //router.push(`/?lat=${posX}&lng=${posY}`);
    console.log("Crazy hanburgir");
  };

  return (
    <Box p={8}>
      <Heading as="h1" size="xl" mb={6}>
        Reportes:
      </Heading>
      <Table variant="striped" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Direccion</Th>
            <Th>Cantidad</Th>
            <Th>Pendiente</Th>
            <Th>Completos</Th>
            <Th>Eliminados</Th>
            <Th>Ir</Th>
          </Tr>
        </Thead>
        <Tbody>
          {reportes.map((reporte) => (
            <Tr key={reporte.ID}>
              <Td>{reporte.ID}</Td>
              <Td>{reporte.Direccion}</Td>
              <Td>{reporte.Total}</Td>
              <Td>{reporte.Pendiente}</Td>
              <Td>{reporte.Completa}</Td>
              <Td>{reporte.Eliminados}</Td>
              <Td>
                <Button
                  colorScheme="blue"
                  size="sm"
                  onClick={handleRedirect(reporte.CoordX, reporte.CoordY)}
                >
                  Ir al punto
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}
