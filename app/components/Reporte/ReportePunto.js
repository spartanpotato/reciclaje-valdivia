"use client";

import React, { useState, useEffect } from "react";
import { 
    Button, Modal, Table,
    ModalOverlay, ModalContent, ModalHeader, 
    ModalCloseButton, ModalBody,
    Thead, Tbody, Tr,
     Th, Td
} from "@chakra-ui/react";


const ReportInPoint = ({isOpen,setOpen,idPoint}) => {
    
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
    
    const handleStateComp = () => {
        setOpen(false);
    };

    const handleReportState = async (actualReport,reportState) =>{
        try {
            const response = await fetch(`http://172.233.25.94:54321/reportes/${actualReport}}`, {
                method: "PUT",
                body: JSON.stringify({ estado: reportState }),
            });

            if (!response.ok) {
                throw new Error("Error al actualizar el reporte");
            }

            setReports((prevReports) => prevReports.filter((report) => report.id_report !== actualReport));
            console.log("Reporte actualizado exitosamente");
        } catch (error) {
            console.error("Error al enviar la solicitud a la API", error);
        }
    }

    return(<Modal isOpen={isOpen} onClose={handleStateComp}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Lista de Reportes</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <Table variant="striped" colorScheme="teal">
            <Thead>
            <Tr>
                <Th>Usuario</Th>
                <Th>Rut</Th>
                <Th>Detalles</Th>
                <Th>Accion</Th>
            </Tr>
            </Thead>
            <Tbody>
            {reports.map((report) => (
                <Tr key={report.id_reporte}>
                <Td>{report.user.nombre}</Td>
                <Td>{report.user.rut}</Td>
                <Td>{report.detalles}</Td>
                <Td style={{ display: "flex", gap: "1vw" }}>
                    <Button
                    colorScheme="red"
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
                    Completar
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