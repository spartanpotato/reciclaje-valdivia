"use client"; 

import { useState } from "react";
import Map from "@/app/components/Map";
import Menu_1 from "@/app/components/Menu";

function Main({ data }) {
    const [Vidrio, setVidrio] = useState(0);
    const [Latas, setLatas] = useState(0);
    const [Plastico, setPlastico] = useState(0);
    const [Papel_Carton, setPapel_Carton] = useState(0);
    const [Organico, setOrganico] = useState(0);

    const tipos_1 = [
        { state: Vidrio, indice: 0 },
        { state: Latas, indice: 1 },
        { state: Plastico, indice: 2 },
        { state: Papel_Carton, indice: 3 },
        { state: Organico, indice: 4 }
    ];

    return (
        <div>
            <Menu_1
                Vidrio={Vidrio} setVidrio={setVidrio}
                Latas={Latas} setLatas={setLatas}
                Plastico={Plastico} setPlastico={setPlastico}
                Papel_Carton={Papel_Carton} setPapel_Carton={setPapel_Carton}
                Organico={Organico} setOrganico={setOrganico}
            />
            <div className="mapContainer">
                <Map data={data} tipos={tipos_1} />
            </div>
        </div>
    );
}

export default Main;