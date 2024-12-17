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
import { useRouter } from "next/navigation"; // Importamos useRouter para la redirección

const ProponerPunto = ({ lat, lng, userType, onUpdate }) => {  
    const [direccion, setDireccion] = useState(""); 
    const [materiales, setMateriales] = useState({
        plastico: false,
        vidrio: false,
        papelCarton: false,
        latas: false,
        organico: false, 
    }); 
    const { isOpen, onOpen, onClose } = useDisclosure(); 
    const router = useRouter(); // Instancia de useRouter para redirigir
    console.log("userType:", userType);
    if (userType === "guest" || userType === null) {
        // Si el usuario no está autenticado, mostramos el botón de iniciar sesión
        return (
            <Menu isOpen={isOpen} onClose={onClose} size={"md"}>
                <MenuButton as={Button} className="PropButton" mb={4} onClick={() => router.push("/authentication/sign_in")} size={"sm"}>
                    Iniciar sesión
                </MenuButton>
            </Menu>
        );
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

        // Definir los tipos con sus índices y valores de estado
        const tipos_1 = [
            { nombre: "Organico", state: materiales.organico, indice: 0 },
            { nombre: "Latas", state: materiales.latas, indice: 1 },
            { nombre: "Papel_Carton", state: materiales.papelCarton, indice: 2 },
            { nombre: "Vidrio", state: materiales.vidrio, indice: 3 },
            { nombre: "Plastico", state: materiales.plastico, indice: 4 }
        ];

        // Calcular el id_tipo basado en la fórmula
        const id_tipo = tipos_1.reduce((acc, tipo) => {
            return acc + (tipo.state ? Math.pow(2, tipo.indice) : 0);
        }, 1);

        try {
            const response = await fetch("http://172.233.25.94:54321/puntos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    coordx: String(lat),
                    coordy: String(lng),
                    direccion: direccion,
                    id_tipo: id_tipo // Usar el id_tipo calculado
                })
            });

            if (!response.ok) {
                throw new Error("Error al proponer el punto");
            }

            alert("Punto añadido exitosamente");
            setDireccion(""); // Limpiar campos
            setMateriales({
                plastico: false,
                vidrio: false,
                papelCarton: false,
                latas: false,
                organico: false, 
            }); 
            if (onUpdate) {
                onUpdate();  // Esto llamará al método que actualizará el mapa
            }
            onClose(); // Cerrar el menú
        } catch (error) {
            console.error("Error al enviar la solicitud:", error);
            alert("No se pudo proponer el punto. Intenta nuevamente.");
        }
    };

    return (
        <>
            <Menu isOpen={isOpen} onClose={onClose} size={"md"}>
                <MenuButton as={Button} className="PropButton" mb={4} onClick={onOpen} size={"sm"}>
                    Añadir punto 
                </MenuButton>
                
                <MenuList className="ProponerPunto">
                    <form onSubmit={handleSubmit}>
                        <Box textAlign={"center"}>
                            <Text mb={2} fontSize="md">Proponer punto </Text>
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
