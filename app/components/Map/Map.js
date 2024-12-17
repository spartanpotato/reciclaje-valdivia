import "leaflet/dist/leaflet.css";
import "@/app/globals.css";
import { MapContainer, Marker, Popup, TileLayer, useMapEvents, useMap } from "react-leaflet";
import { useState, useEffect } from "react";
import DrawerComponent from "@/app/components/DrawerComponent";
import { useDisclosure } from "@chakra-ui/react";
import Icons from "./iconos";
import ProponerPunto from "../puntos/ProponerPunto";
import { useUserRole } from "@/app/providers/userRole";

var CustomIcon = L.Icon.extend({
  options: {
    iconSize: [36, 36],
    popupAnchor: [-3, -76],
  },
});

function MapClickHandler({ onMapClick }) {
  useMapEvents({
    click: (e) => {
      onMapClick(e.latlng);
    },
  });
  return null;
}

function Map({ id_tipo, tipos }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentValue, setCurrentValue] = useState({});
  const [currentArray, setCurrentArray] = useState([]);
  const [newPointLocation, setNewPointLocation] = useState(null);
  const [data, setData] = useState([]);
  const { userType } = useUserRole();
  
  const handleUpdate = (updatedPoint) => {
    setData((prevData) => 
      prevData.map((point) =>
        point.id === updatedPoint.id
          ? { ...point, ...updatedPoint } // Actualiza solo el punto modificado
          : point
      )
    );
  
    setCurrentValue((prevValue) =>
      prevValue.id === updatedPoint.id
        ? { ...prevValue, ...updatedPoint } // Actualiza también el sidebar
        : prevValue
    );
  };
  
  // Función para obtener datos actualizados
  const fetchData = async () => {
    try {
      const response = await fetch(`http://172.233.25.94:54321/puntos/tipos/${id_tipo}`);
      if (!response.ok) throw new Error("Failed to fetch puntos");
      const puntos = await response.json();

      console.log("id_tipo enviado: ", id_tipo);
      console.log("puntos del fetch: ", puntos);

      const formattedData = puntos.map((punto) => ({
        id: punto.id_punto,
        coord: [parseFloat(punto.coordx), parseFloat(punto.coordy)],
        direccion: punto.direccion,
        tipo: punto.tipo.id_tipo,
        tipos: punto.tipo,
      }));

      setData(formattedData); // Actualiza los puntos en el mapa
    } catch (error) {
      console.error("Error fetching puntos:", error);
      setData([]); // Si hay error, deja el mapa vacío
    }
  };

  // Llama a fetchData cuando cambie el id_tipo
  useEffect(() => {
    fetchData();
  }, []);
  
  useEffect(() => {
    if (currentValue && currentValue.id) {
      setCurrentArray(tipos);
    }
  }, [currentValue, tipos]);

  const handleMapClick = (latlng) => {
    setNewPointLocation(latlng);
  };

  return (
    <>
      <MapContainer
        center={[-39.830054, -73.234515]}
        zoom={15}
        scrollWheelZoom={true}
        className="homeMap"
      >
        <MapClickHandler onMapClick={handleMapClick} />

        <TileLayer
          attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Marcadores actuales */}
        {data.map((values) => (
          <Marker
            key={values.id}
            position={values.coord}
            icon={new CustomIcon({
              iconUrl: Icons(values.tipo),
            })}
            eventHandlers={{
              click: () => {
                onOpen();
                setCurrentValue(values);
              },
            }}
          />
        ))}

        {/* Popup para añadir un nuevo punto */}
        {newPointLocation && (
          <Popup 
            position={newPointLocation}
            onClose={() => setNewPointLocation(null)}
          >
            <div>
              <h3>¿Quieres añadir un punto de reciclaje aquí?</h3>
              <ProponerPunto lat={newPointLocation?.lat} lng={newPointLocation?.lng} userType={userType} onUpdate={fetchData}/>
            </div>
          </Popup>
        )}
      </MapContainer>

      {/* Drawer que actualiza puntos */}
      <DrawerComponent
        currentValue={currentValue}
        isOpen={isOpen}
        onClose={onClose}
        array={currentArray}
        onUpdate={fetchData}
      />
    </>
  );
}

export default Map;
