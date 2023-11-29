
export default function Icons(tipos){
    var ImgURL = "./Icon/";
    var img = "";
    tipos.map((patata)=>{
        if(patata.estado==1){
            if(patata.tipo == "papel/carton"){
                img+="pc_"
            }
            else{
                img+=patata.tipo.charAt(0)+"_";
            }
        }
    })
    img = img.slice(0,-1)
    ImgURL+=img+".png";
    return ImgURL;
}