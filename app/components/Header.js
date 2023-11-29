export default function Header() {
  return (
    <nav className="navegacion">
        <img src="reciclaje.png" width="6%" height="5%"/> 
        <p className="titulo">Puntos de reciclaje en Valdivia</p>
        <div className="leyenda">
          <ul>
            <li>Obtenga mas informacion presionando los marcadores</li>
            <li>Use los filtros para que solo aparezcan puntos con ese tipo de basura</li>
          </ul>
        </div>
    </nav>
  );
}