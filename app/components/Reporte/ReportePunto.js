"use client";

import React, { useState, useEffect } from "react";
import { 
    Button, Modal, Table,
    ModalOverlay, ModalContent, ModalHeader, 
    ModalCloseButton, ModalBody,
    Thead, Tbody, Tr,
    Th, Td, Spinner
} from "@chakra-ui/react";


const ReportInPoint = ({isOpen,setOpen,idPoint}) => {
    const [loading, setLoading] = useState(false);
    const [reports,setReports] = useState([]);

    useEffect(() => {
        if (isOpen && idPoint) {
            const fetchReports = async () => {
                setLoading(true);
                try {
                    const response = await fetch(`http://172.233.25.94:54321/reportes/${idPoint}`);
                    if (!response.ok) {
                        throw new Error("Failed to fetch reports");
                    }
                    const data = await response.json();
                    const pendingReports = data.filter((report) => report.estado === "pendiente");
                    setReports(pendingReports);
                } catch (error) {
                    console.error("Error al obtener los reportes", error);
                }
                finally{
                    setLoading(false);
                }
            };
            fetchReports();
        }
    }, [isOpen, idPoint]);

    const handleReportState = async (actualReport, reportState) => {
        try {
            const response = await fetch(`http://172.233.25.94:54321/reportes/${actualReport}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ estado: reportState }),
            });

            if (!response.ok) {
                throw new Error("Error al actualizar el reporte");
            }

            setReports((prevReports) => prevReports.filter((report) => report.id_reporte !== actualReport));
            console.log("Reporte actualizado exitosamente");
            alert("Se Cambio el estado del Reporte!!!");
        } catch (error) {
            console.error("Error al enviar la solicitud a la API", error);
        }
    };
    const handleStateComp = () => {
        setReports([]);
        setOpen(false);
    };

    return(<Modal isOpen={isOpen} onClose={handleStateComp}>
        <ModalOverlay/>
        <ModalContent>
          <ModalHeader>Lista de Reportes</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {loading? (<Spinner/>): reports.length === 0? (<p>No hay reportes pendientes</p>):(
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
                <Td>{report.usuario.nombre}</Td>
                <Td>{report.usuario.rut}</Td>
                <Td>{report.detalles}</Td>
                <Td style={{ display: "flex", gap: "1vw" }}>
                    <Button
                    colorScheme="red"
                    size="sm"
                    onClick={() => handleReportState(report.id_reporte,"eliminado")}
                    >
                    Eliminar
                    </Button>
                    <Button
                    colorScheme="green" 
                    size="sm"
                    onClick={() => handleReportState(report.id_reporte,"completado")}
                    >
                    Completar
                    </Button>
                </Td>
                </Tr>
            ))}
            </Tbody>
            </Table>
            )}
            </ModalBody>
        </ModalContent>
      </Modal>);
};

export default ReportInPoint;
    // useEffect(() => {
    //     if (isOpen) {
            
    //         const fetchReports = async () => {
    //             try {
    //                 const response = await fetch(`http://172.233.25.94:54321/reports/${idPoint}`);
    //                 const data = await response.json();
    //                 const pendingReports = data.filter((report) => report.estado === "pendiente");
    //                 setReports(pendingReports);
    //             } catch (error) {
    //                 console.error("Error al obtener los reportes", error);
    //             }
    //         };
    //         fetchReports();
    //     }
    // }, [isOpen]);
    
    
    // const handleReportState = async (actualReport,reportState) =>{
    //     try {
    //         const response = await fetch(`http://172.233.25.94:54321/reportes/${actualReport}}`, {
    //             method: "PUT",
    //             body: JSON.stringify({ estado: reportState }),
    //         });

    //         if (!response.ok) {
    //             throw new Error("Error al actualizar el reporte");
    //         }

    //         setReports((prevReports) => prevReports.filter((report) => report.id_report !== actualReport));
    //         console.log("Reporte actualizado exitosamente");
    //     } catch (error) {
    //         console.error("Error al enviar la solicitud a la API", error);
    //     }
    // }