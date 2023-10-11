import Map from "@/app/components/Map"

const fetchData = async ()=>{
  const response = await import("./api/puntos",{
    method: "GET",
  });
  const puntos = response.puntos;
  return puntos;
}

export default async function Home() {
  const data = await fetchData();
  return (
    <div>
      <div className="titulo">
        <img src="reciclaje" width="20px" height="20px"/>
      </div>
      <div className="center">
        <Map data={data}/>
      </div>
    </div>
  )
}
