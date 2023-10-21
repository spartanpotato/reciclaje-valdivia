import "leaflet/dist/leaflet.css"
import "@/app/globals.css"
import { MapContainer, Marker, TileLayer } from "react-leaflet"

//Codigo copiado directamente de un chico de youtube llamado halfword :') tankiu

var CustomIcon = L.Icon.extend({
    options: {
        iconSize: [24, 32],     // Tamaño del icono
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
                <Marker
                position={values.coordenadas}
                icon={MyIcon}
                eventHandlers={{
                    click: ()=>{
                        console.log("text")
                    },
                }}
                >
                </Marker>
            ))}
            
        </MapContainer>
    )
}

export default Map;