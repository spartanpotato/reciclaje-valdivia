import "leaflet/dist/leaflet.css"
import "@/app/globals.css"
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import marker from "./Vector.svg"
import { Icon, marker } from "leaflet";

//Codigo copiado directamente de un chico de youtube llamado halfword :') tankiu

const MyIcon = new Icon({
    iconUrl: marker,
    iconSize:[25,25]
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