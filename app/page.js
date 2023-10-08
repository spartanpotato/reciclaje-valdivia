import Map from "@/app/components/Map"

const fetchData = async ()=>{
  const response = await import("./api/puntos",{
    method: "GET",
  });
  const data = response.data;
  return data;
}

export default async function Home() {
  const data = await fetchData();
  return (
    <div>
      <div id="map">
        <Map data={data}/>
      </div>
    </div>
  )
}
