import "@/app/globals.css";
import { 
  Input, 
  Button, 
  Menu, 
  MenuButton, 
  MenuList, 
  Box, 
  Text, 
  useDisclosure 
} from "@chakra-ui/react";
import { useState } from "react";
import { useUserRole } from "@/app/providers/userRole";

const ProponerPunto = ({ coordenadas }) => { 
    const { userType } = useUserRole(); 
    const [direccion, setDireccion] = useState(""); 
    const [materiales, setMateriales] = useState({
        plastico: false,
        vidrio: false,
        papelCarton: false,
        latas: false,
        organico: false, 
    }); 
    const { isOpen, onOpen, onClose } = useDisclosure(); 

    if (userType === "guest" || userType === undefined) {
        return null; // No mostrar el botón para usuarios invitados o no autenticados
    }

    const handleMaterialChange = (e) => {
        const { name, checked } = e.target;
        setMateriales((prevState) => ({
            ...prevState,
            [name]: checked,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Crear el cuerpo de la solicitud
        const punto = {
            direccion,
            coordenadas, // Coordenadas pasadas como prop desde el mapa
            materiales: Object.keys(materiales).filter((key) => materiales[key]),
        };

        try {
            const response = await fetch("http://172.233.25.94:54321/puntos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...punto,
                })
            });

            if (!response.ok) {
                throw new Error("Error al proponer el punto");
            }

            alert("Punto propuesto exitosamente");
            setDireccion(""); // Limpiar campos
            setMateriales({
                plastico: false,
                vidrio: false,
                papelCarton: false,
                latas: false,
                organico: false, 
            }); 
            onClose(); // Cerrar el menú
        } catch (error) {
            console.error("Error al enviar la solicitud:", error);
            alert("No se pudo proponer el punto. Intenta nuevamente.");
        }
    };

    return (
        <>
            <Menu isOpen={isOpen} onClose={onClose} size={"md"}>
                <MenuButton as={Button} className="PropButton" mb={4} onClick={onOpen}>
                    Proponer punto
                </MenuButton>
                
                <MenuList className="ProponerPunto">
                    <form onSubmit={handleSubmit}>
                        <Box textAlign={"center"}>
                            <Text mb={2} fontSize="2xl">Proponer punto </Text>
                            <Box mb={4}>
                                <Text mb={2} fontSize="xl">Dirección:</Text>
                                <Input 
                                    className="inputProponer" 
                                    placeholder="Ingresar dirección" 
                                    value={direccion} 
                                    onChange={(e) => setDireccion(e.target.value)} 
                                />
                            </Box>

                            <Box mb={4}>
                                <Text mb={2} fontSize="xl">Materiales:</Text>
                                <Box>
                                    <label className="checkboxLabel">
                                        <input 
                                            type="checkbox" 
                                            name="plastico" 
                                            checked={materiales.plastico} 
                                            onChange={handleMaterialChange} 
                                        />
                                        Plástico
                                    </label>
                                </Box>
                                <Box>
                                    <label className="checkboxLabel">
                                        <input 
                                            type="checkbox" 
                                            name="vidrio" 
                                            checked={materiales.vidrio} 
                                            onChange={handleMaterialChange} 
                                        />
                                        Vidrio
                                    </label>
                                </Box>
                                <Box>
                                    <label className="checkboxLabel">
                                        <input 
                                            type="checkbox" 
                                            name="papelCarton" 
                                            checked={materiales.papelCarton} 
                                            onChange={handleMaterialChange} 
                                        />
                                        Papel/Cartón
                                    </label>
                                </Box>
                                <Box>
                                    <label className="checkboxLabel">
                                        <input 
                                            type="checkbox" 
                                            name="latas" 
                                            checked={materiales.latas} 
                                            onChange={handleMaterialChange} 
                                        />
                                        Latas
                                    </label>
                                </Box>
                                <Box>
                                    <label className="checkboxLabel">
                                        <input 
                                            type="checkbox" 
                                            name="organico" 
                                            checked={materiales.organico} 
                                            onChange={handleMaterialChange} 
                                        />
                                        Orgánico
                                    </label>
                                </Box>
                            </Box>
                            <Button type="submit">Ingresar</Button>
                        </Box>
                    </form>
                </MenuList>
            </Menu>
        </>
    );
};

export default ProponerPunto;
