
export default function Icons(tipos){
    var ImgURL = "./Icon/";
    var img = "";
    var contador = 0;
    const ids = ["v_","l_","p_","pc_","o_"];
    tipos.map((elemento)=>{
        if(elemento.estado){
            img += ids[contador];
        }
        contador += 1;
    })
    img = img.slice(0,-1)
    ImgURL+=img+".png";
    return ImgURL;
}