"use client"; 

import { useState } from "react";
import Map from "@/app/components/Map";
import Menu_1 from "@/app/components/Menu";

function Main() {
    const [Vidrio, setVidrio] = useState(0);
    const [Latas, setLatas] = useState(0);
    const [Plastico, setPlastico] = useState(0);
    const [Papel_Carton, setPapel_Carton] = useState(0);
    const [Organico, setOrganico] = useState(0);

    const tipos_1 = [
        { nombre: "Organico", state: Organico, indice: 0 },
        { nombre: "Latas", state: Latas, indice: 1 },
        { nombre: "Papel_Carton", state: Papel_Carton, indice: 2 },
        { nombre: "Vidrio", state: Vidrio, indice: 3 },
        { nombre: "Plastico", state: Plastico, indice: 4 }
    ];

    const id_tipo = tipos_1.reduce((acc, tipo) => {
        return acc + (tipo.state ? Math.pow(2, tipo.indice) : 0);
    }, 1);

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
                <Map id_tipo={id_tipo} tipos={tipos_1} />
            </div>
        </div>
    );
}

export default Main;