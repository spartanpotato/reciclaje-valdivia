import "leaflet/dist/leaflet.css";
import "@/app/globals.css";
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from "react-leaflet";
import { useState, useEffect } from "react";

import DrawerComponent from "@/app/components/DrawerComponent";
import { useDisclosure } from "@chakra-ui/react";
import Icons from "./iconos";

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

  // Volver a traer data cada vez que cambie el id_tipo
  useEffect(() => {
    if (id_tipo !== undefined) {
      const fetchData = async () => {
        try {
          const response = await fetch(`http://172.233.25.94:54321/puntos/${id_tipo}`);
          if (!response.ok) {
            throw new Error("Failed to fetch puntos");
          }
          const puntos = await response.json();
          console.log("Fetched puntos:", puntos);  // Log to check the response
  
          // Format the data based on the response structure
          if (Array.isArray(puntos)) {
            const formattedData = puntos.map((punto) => ({
              id: punto.id_punto,
              coord: [parseFloat(punto.coordx), parseFloat(punto.coordy)],
              direccion: punto.direccion,
              tipo: punto.tipo.id_tipo, // Accessing the id_tipo from the tipo object
            }));
            setData(formattedData);
          } else {
            console.error("Fetched data is not an array:", puntos);
          }
        } catch (error) {
          console.error("Error fetching puntos:", error);
        }
      };
  
      fetchData();
    }
  }, [id_tipo]);

  const handleMapClick = (latlng) => {
    setNewPointLocation(latlng);
  };

  const handleAddRecyclingPoint = () => {
    // Implement the logic to add a new recycling point
    // This could open a modal or form to input details
    console.log("Adding new recycling point at:", newPointLocation);
    // You might want to call a function to save the new point
    setNewPointLocation(null);
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

        {/* Existing markers */}
        {data.map((values) => {

          return (
          <Marker
            key={values.id}
            position={values.coord}
            icon={new CustomIcon({
              iconUrl: Icons(values.tipos),
            })}
            eventHandlers={{
              click: () => {
                onOpen();
                setCurrentValue(values);
                setCurrentArray(tipos);
              },
            }}
          ></Marker>
          )
          }
        )}

        {/* New point location popup */}
        {newPointLocation && (
          <Popup 
            position={newPointLocation}
            onClose={() => setNewPointLocation(null)}
          >
            <div>
              <h3>¿Quieres añadir un punto de reciclaje aquí?</h3>
              <button 
                onClick={handleAddRecyclingPoint}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Añadir Punto de Reciclaje
              </button>
            </div>
          </Popup>
        )}
      </MapContainer>
      <DrawerComponent 
        currentValue={currentValue} 
        isOpen={isOpen} 
        onClose={onClose} 
        array={currentArray} 
      />
    </>
  );
}

export default Map;