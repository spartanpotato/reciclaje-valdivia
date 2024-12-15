import "leaflet/dist/leaflet.css";
import "@/app/globals.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useState } from "react";

import DrawerComponent from "@/app/components/DrawerComponent";
import { useDisclosure } from "@chakra-ui/react";
import Icons from "./iconos";

var CustomIcon = L.Icon.extend({
  options: {
    iconSize: [36, 36], // Tamaño del icono
    popupAnchor: [-3, -76], // Punto desde donde se mostrará el popup en relación al icono
  },
});

function Map({ data, tipos }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentValue, setCurrentValue] = useState({});
  const [currentArray, setCurrentArray] = useState([]);

  // Estado para manejar la posición y visibilidad del Popup
  const [popupPosition, setPopupPosition] = useState(null);

  return (
    <>
      <MapContainer
        center={[-39.830054, -73.234515]}
        zoom={15}
        scrollWheelZoom={true}
        className="homeMap"
        onClick={(e) => {
          // Al hacer clic en el mapa, guardar la posición del clic
          setPopupPosition(e.latlng);
        }}
      >
        <TileLayer
          attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Marcadores existentes */}
        {data.map((values) => {
          var coincidencias = 0;
          var filtros = 0;
          tipos.forEach((tipo) => {
            const estado = tipo.state;
            const indice = tipo.indice;
            if (estado) {
              filtros += 1;
            }
            if (estado && values.tipos[indice]?.estado) {
              coincidencias += 1;
            }
          });

          if (coincidencias >= filtros || filtros === 0) {
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
            );
          }
        })}

        {/* Popup para añadir un nuevo punto de reciclaje */}
        {popupPosition && (
          <Popup
            position={popupPosition}
            onClose={() => setPopupPosition(null)}
          >
            <div>
              <h3>Añadir Punto de Reciclaje</h3>
              <button
                onClick={() => {
                  console.log("Añadiendo punto en:", popupPosition);
                  // Lógica para añadir el punto a la base de datos o estado
                  setPopupPosition(null);
                }}
              >
                Añadir
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
