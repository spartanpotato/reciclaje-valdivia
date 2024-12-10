import Main from "@/app/components/main/page.js";

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
        <Main data={data}/>
      </div>
  )
}