import Map from "@/app/components/Map"
import Menu_1 from "./components/Menu";

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
        <Menu_1 data={data}/>
      </div>
  )
}