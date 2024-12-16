"use client";
import { Box, Button, Table, Thead, Tbody, Tr, Th, Td, Heading } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

export default function Reports() {
  const router = useRouter();


  //esto es temporal
  const markers = [
    {
      id: 2,
      name: 'Marcador 1',
      detail: '201',
      position: [51.505, -0.09],
    },
    {
      id: 1,
      name: 'Marcador 2',
      cant: '240',
      position: [51.51, -0.1],
    },
  ];
  //necesito una lista de los puntos con los atributos tipo asi
  //para poder ir y moverme, donde sea de orden descendente por la
  //cantidad de reportes pendientes


  const handleRedirect = () => {
    // Aqui van a faltar cositas jiji uwu
    router.push('/');
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
            <Th>Nombre</Th>
            <Th>Cantidad</Th>
            <Th>Ir</Th>
          </Tr>
        </Thead>
        <Tbody>
          {markers.map((marker) => (
            <Tr key={marker.id}>
              <Td>{marker.id}</Td>
              <Td>{marker.name}</Td>
              <Td>{marker.cant}</Td>
              <Td>
                <Button
                  colorScheme="blue"
                  size="sm"
                  onClick={handleRedirect}
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
