"use client";

import React, { useState, useEffect } from "react";
import { 
    Button, Modal, 
    ModalOverlay, ModalContent, ModalHeader, 
    ModalCloseButton, ModalBody,
    Thead, Tbody, Tr,
     Th, Td
} from "@chakra-ui/react";


const ReportInPoint = ({isOpen,onClose,idPoint}) => {
    const markers = [
        { id: 1, href: "/subitem1" },
        { id: 2, href: "/subitem2" },
        { id: 3, href: "/subitem3" },
      ];
    const [reports,setReports] = useState([]);
    useEffect(() => {
        if (isOpen) {
            
            const fetchReports = async () => {
                try {
                    const response = await fetch(`http://172.233.25.94:54321/reports/${idPoint}`);
                    const data = await response.json();
                    const pendingReports = data.filter((report) => report.estado === "pendiente");
                    setReports(pendingReports);
                } catch (error) {
                    console.error("Error al obtener los reportes", error);
                }
            };
            fetchReports();
        }
    }, [isOpen]);
    
    const handleReportState = async (actualReport,reportState) =>{
        console.log("AAAAAAAAAAA")
        /*try {
            const response = await fetch(`http://172.233.25.94:54321/reportes/${actualReport}}`, {
                method: "PUT",
                body: JSON.stringify({ estado: reportState }),
            });

            if (!response.ok) {
                throw new Error("Error al actualizar el reporte");
            }

            // Actualizamos la lista de reportes localmente después de la actualización
            setReports((prevReports) => prevReports.filter((report) => report.id !== id));
            console.log("Reporte actualizado exitosamente");
        } catch (error) {
            console.error("Error al enviar la solicitud a la API", error);
        }
        */
    }
    return(<Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Lista de Reportes</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <Table variant="striped" colorScheme="teal">
            <Thead>
            <Tr>
                <Th>Usuario</Th>
                <Th>Detalles</Th>
                <Th>Accion</Th>
            </Tr>
            </Thead>
            <Tbody>
            {reports.map((report) => (
                <Tr key={report.id_reporte}>
                <Td>{report.id}</Td>
                <Td>{report.detalles}</Td>
                <Td>
                    <Button
                    colorScheme="blue"
                    size="sm"
                    onClick={handleReportState(report.id_reporte,"eliminado")}
                    >
                    Eliminar
                    </Button>
                    <Button
                    colorScheme="green" 
                    size="sm"
                    onClick={handleReportState(report.id_reporte,"completado")}
                    >
                    Completado
                    </Button>
                </Td>
                </Tr>
            ))}
            </Tbody>
            </Table>
            </ModalBody>
        </ModalContent>
      </Modal>);
};

export default ReportInPoint;