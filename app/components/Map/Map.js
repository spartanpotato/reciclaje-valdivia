import "leaflet/dist/leaflet.css"
import "@/app/globals.css"
import { MapContainer, TileLayer } from "react-leaflet"

//Codigo copiado directamente de un chico de youtube llamado halfword :') tankiu
function Map( {data} ){
    return(
        <MapContainer center={[51.513,-0.09]} zoom={15} scrollWheelZoom={true} className="homeMap">
            <TileLayer 
            attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
            />
        </MapContainer>
    )
}

export default Map;