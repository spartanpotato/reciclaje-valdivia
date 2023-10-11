import Link from "next/link";

// const links = [
//   { nombre: "Home", url: "/" },
//   { nombre: "Ejemplo 1", url: "/ejemplo-1" },
//   { nombre: "Ejemplo 2", url: "/ejemplo-2" },
//   { nombre: "Ejemplo 3", url: "/ejemplo-3" },
//   { nombre: "Ejemplo 4", url: "/ejemplo-4" },
//   { nombre: "Ejemplo 5", url: "/ejemplo-5" },
//   { nombre: "Ejemplo 6", url: "/ejemplo-6" },
//   { nombre: "Ejemplo 7", url: "/ejemplo-7" },
// ];

//añadi .png a la imagen para que funcione cambie width de 2 rem a 50 rem
export default function Header() {
  return (
    <nav className="navegacion">
        <img src="reciclaje.png" width="50rem" height="2rem"/> 
        <p className="titulo">Puntos de reciclaje en Valdivia</p>
    </nav>
  );
}
