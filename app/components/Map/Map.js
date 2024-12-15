import "leaflet/dist/leaflet.css";
import "@/app/globals.css";
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from "react-leaflet";
import { useState } from "react";

import DrawerComponent from "@/app/components/DrawerComponent";
import { useDisclosure } from "@chakra-ui/react";
import Icons from "./iconos";
import ProponerPunto from "../puntos/ProponerPunto";

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

function Map({ data, tipos }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentValue, setCurrentValue] = useState({});
  const [currentArray, setCurrentArray] = useState([]);
  const [newPointLocation, setNewPointLocation] = useState(null);

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
          var coincidencias = 0;
          var filtros = 0;
          {tipos.map((tipo) => {
            const estado = tipo.state;
            const indice = tipo.indice;
            if (estado){filtros +=1;}
            if(estado && values.tipos[indice].estado){
              coincidencias += 1;
            }
          })}

          if ((coincidencias >= filtros) || filtros === 0){
            return (
              <Marker
                key={values.id}
                position={values.coordenadas}
                icon={new CustomIcon({
                  iconUrl: Icons(values.tipos),
                })}
                eventHandlers={{
                  click: () => {
                    onOpen();
                    setCurrentValue(values);
                    setCurrentArray(values.tipos);
                  },
                }}
              ></Marker>
            )
          }
        })}

        {/* New point location popup */}
        {newPointLocation && (
          <Popup 
            position={newPointLocation}
            onClose={() => setNewPointLocation(null)}
          >
            <div>
              <h3>¿Quieres añadir un punto de reciclaje aquí?</h3>
              <ProponerPunto coordenadas = {{newPointLocation}}/>
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