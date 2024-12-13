import "@/app/globals.css";
import { 
  Input, // Componente de entrada de texto.
  Button, // Componente de botón.
  Menu, // Componente de menú desplegable (Dropdown menu).
  MenuButton, // Botón que activa el menú.
  MenuList, // Lista de elementos del menú.
  Box, // Componente de contenedor flexible.
  Text,
  useDisclosure 
} from "@chakra-ui/react";
import { useState } from "react";
import { useUserRole } from "@/app/providers/userRole";

// Componente: Botón que permite proponer un punto en el mapa


const ProponerPunto = () => { 
    const {userType} = useUserRole(); 
    const [direccion, setDireccion] = useState(""); // Estado para modificar la dire. de un punto
    const [materiales, setMateriales] = useState({
        plastico: false,
        vidrio: false,
        papelCarton: false,
        latas: false,
        organico: false, 
      }); // Estado para modificar los materiales que acepta un punto
    const [coordX, setCoordX] = useState(""); // Estado para modificar la coordenada X
    const [coordY, setCoordY] = useState(""); // Estado para modificar la coordenada Y
    const [cambio, setCambio] = useState(false); 
    const { isOpen, onOpen, onClose } = useDisclosure(); // Controlar la apertura y cierre del menú

    if (userType == "guest") {
        return null;
    }
    // Función que maneja el cambio de estado de los materiales
    const handleMaterialChange = (e) => {
        const { name, checked } = e.target;
        setMateriales((estadoAnterior) => ({
          ...estadoAnterior,
          [name]: checked, // name es el atributo name del checkbox
                            // checked es un booleano que indica si el checkBox está marcado(true) o no(false)
        }));
    };
    // Función simulada para enviar la solicitud (TEMPORAL)
    const sendRequest = async () => {
        // Simula el envío de la solicitud sin hacer nada
        console.log("admin:", admin);
        setCoordX("");
        setCoordY("");
        setDireccion("");
        setMateriales({
            plastico: false,
            vidrio: false,
            papelCarton: false,
            latas: false,
            organico: false, 
          }); 
        onClose();
        alert("Punto editado (no enviado, simulado)");
    };

    // Función para manejar el envío del formulario (TEMPORAL)
    const handleSubmit = async (e) => {
        e.preventDefault();
        await sendRequest(); // Llama a la función simulada
        // setCambio(() => !cambio); // Invierte el valor de cambio para forzar una actualización
    };

    // OBS: xs (extra small), sm (small), md (medium), lg (large), y xl (extra large).
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
                            <Text mb={2} fontSize="2xl">Dirección: </Text>
                            <Input 
                                className="inputProponer" 
                                placeholder="Ingresar dirección" 
                                value={direccion} onChange={(e) => setDireccion(e.target.value)} 
                            />
                        </Box>

                        <Box mb={4}>
                            <Text mb={2} fontSize="2xl">Coordenadas: </Text>
                            <Input 
                                className="inputProponer" 
                                placeholder="Ingresar coordenada X" 
                                value={coordX} onChange={(e) => setCoordX(e.target.value)} 
                            />
                            <Input 
                                className="inputProponer" 
                                placeholder="Ingresar coordenada Y" 
                                value={coordY} onChange={(e) => setCoordY(e.target.value)} 
                            />
                        </Box>
                        <Box mb={4}>
                            <Text mb={2} fontSize="2xl">Materiales: </Text>
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