import "leaflet/dist/leaflet.css"
import "@/app/globals.css"
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"

//Codigo copiado directamente de un chico de youtube llamado halfword :') tankiu

function Marcas(data){
    const puntos = data.map((value) => {
        return(
            <Marker position={value.coordenadas}>
                <Popup>{value.nombre}</Popup>
            </Marker>
        )
    });
    return(puntos);
}


function Map( {data} ){
    return(
        <MapContainer center={[-39.830054,-73.234515]} zoom={15} scrollWheelZoom={true} className="homeMap">

            <TileLayer 
            attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
            />

            {data.map((values)=>( 
                <Marker position={values.coordenadas}>
                    <Popup>{values.nombre}</Popup>
                </Marker>
            ))}
            
        </MapContainer>
    )
}

export default Map;