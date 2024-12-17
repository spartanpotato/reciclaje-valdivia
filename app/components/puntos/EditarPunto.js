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

const EditarPunto = ({ admin, item, onUpdate }) => { 
  const { userType } = useUserRole();
  const [direccion, setDireccion] = useState(item.nombre);
  const [materiales, setMateriales] = useState({
    plastico: item.materiales?.includes("plastico") || false,
    vidrio: item.materiales?.includes("vidrio") || false,
    papelCarton: item.materiales?.includes("papelCarton") || false,
    latas: item.materiales?.includes("latas") || false,
    organico: item.materiales?.includes("organico") || false, 
  });
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (userType !== "admin") {
    return null;
  }

  const handleMaterialChange = (e) => {
    const { name, checked } = e.target;
    setMateriales((estadoAnterior) => ({
      ...estadoAnterior,
      [name]: checked,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const tipos_1 = [
      { nombre: "Organico", state: materiales.organico, indice: 0 },
      { nombre: "Latas", state: materiales.latas, indice: 1 },
      { nombre: "Papel_Carton", state: materiales.papelCarton, indice: 2 },
      { nombre: "Vidrio", state: materiales.vidrio, indice: 3 },
      { nombre: "Plastico", state: materiales.plastico, indice: 4 },
    ];

    const id_tipo = tipos_1.reduce((acc, tipo) => {
      return acc + (tipo.state ? Math.pow(2, tipo.indice) : 0);
    }, 1);

    try {
      const response = await fetch(`http://172.233.25.94:54321/puntos/${item.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          direccion: direccion,
          id_tipo: id_tipo,
        }),
      });

      if (response.ok) {
        alert("Punto actualizado correctamente.");
        onClose();
        
        // Llama a onUpdate para notificar que los datos cambiaron
        if (onUpdate) {
          const data = await response.json(); // Obtener los datos actualizados
          onUpdate(data); // Notificar al componente padre
        }
      } else {
        const error = await response.json();
        console.error("Error al actualizar el punto:", error);
        alert("No se pudo actualizar el punto. Intente nuevamente.");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      alert("Hubo un error en la conexión.");
    }
  };

  return (
    <>
      <Menu isOpen={isOpen} onClose={onClose} size={"md"}>
        <MenuButton as={Button} className="EditarButton" mb={4} onClick={onOpen}>
          Editar punto
        </MenuButton>
        
        <MenuList className="EditarPunto">
          <form onSubmit={handleSubmit}>
            <Box textAlign={"center"}>
              <Text mb={2}>Modificar punto </Text>
              <Box mb={4}>
                <Text mb={2} fontSize="2xl">Dirección: </Text>
                <Input 
                  className="inputEditar" 
                  placeholder="Modificar dirección" 
                  value={direccion} 
                  onChange={(e) => setDireccion(e.target.value)} 
                />
              </Box>
              <Box mb={4}>
                <Text mb={2} fontSize="2xl">Materiales: </Text>
                {/* Checkboxes */}
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
              <Button type="submit">Actualizar</Button>
            </Box>
          </form>
        </MenuList>
      </Menu>
    </>
  );
};

export default EditarPunto;
