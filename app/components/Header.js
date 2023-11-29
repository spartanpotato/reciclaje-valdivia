export default function Header() {
  return (
    <nav className="navegacion">
        <img src="reciclaje1.png" width="6%" height="6%"/> 
        <p className="titulo">Puntos de reciclaje en Valdivia</p>
        <div className="leyenda">
          <ul>
            <li>Obtenga más información presionando los marcadores</li>
            <li>Utilice los filtros para que solo aparezcan puntos con el tipo de basura que busca</li>
          </ul>
        </div>
    </nav>
  );
}