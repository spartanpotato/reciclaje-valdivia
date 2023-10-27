import "leaflet/dist/leaflet.css";
import "@/app/globals.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useState } from "react";

import DrawerComponent from "@/app/components/DrawerComponent";
import { useDisclosure } from "@chakra-ui/react";

//Codigo copiado directamente de un chico de youtube llamado halfword :') tankiu

var CustomIcon = L.Icon.extend({
  options: {
    iconSize: [24, 32], // Tamaño del icono
    popupAnchor: [-3, -76], // Punto desde donde se mostrará el popup en relación al icono
  },
});

const MyIcon = new CustomIcon({
  iconUrl: "./Vector.svg",
});

function Map({ data }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentValue, setCurrentValue] = useState({});

  return (
    <>
      <MapContainer
        center={[-39.830054, -73.234515]}
        zoom={15}
        scrollWheelZoom={true}
        className="homeMap"
        onClick={() => {
          console.log("map");
        }}
      >
        <TileLayer
          attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {data.map((values) => (
          <Marker
            key={values.id} // key: React necesita una key para cada elemento que se renderiza (evita errores)
            position={values.coordenadas}
            icon={MyIcon}
            eventHandlers={{
              click: () => {
                onOpen();
                setCurrentValue(values);
              },
            }}
          ></Marker>
        ))}
      </MapContainer>
      <DrawerComponent currentValue={currentValue} isOpen={isOpen} onClose={onClose} />
    </>
  );
}

export default Map;
