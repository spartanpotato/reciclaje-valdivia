import "leaflet/dist/leaflet.css"
import "@/app/globals.css"
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import marker from "./Vector.svg"
import { Icon } from "leaflet";

//Codigo copiado directamente de un chico de youtube llamado halfword :') tankiu

var CustomIcon = L.Icon.extend({
    options: {
        iconSize: [32, 32],     // Tamaño del icono
        iconAnchor: [22, 94],   // Punto del icono que corresponderá a la ubicación exacta del marcador
        popupAnchor: [-3, -76]  // Punto desde donde se mostrará el popup en relación al icono
    }
});

const MyIcon = new CustomIcon({
    iconUrl: "./Vector.svg"
})

function Map( {data} ){
    return(
        <MapContainer center={[-39.830054,-73.234515]} zoom={15} scrollWheelZoom={true} className="homeMap">

            <TileLayer 
            attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
            />

            {data.map((values)=>( 
                <Marker position={values.coordenadas} icon={MyIcon}>
                </Marker>
            ))}
            
        </MapContainer>
    )
}

export default Map;