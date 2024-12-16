export default function Icons(id_tipo) {
    console.log("llego a iconos.js: ", id_tipo);
    var ImgURL = "/Icon/";
    var img = "";
    /*
    var contador = 0;
    const ids = ["o_", "l_", "pc_", "v_", "p_"];

    tipos.forEach((elemento) => {
        if (elemento.state) {  // Check if `state` is correctly accessed
            img += ids[contador];
        }
        contador += 1;
    });
    
    img = img.slice(0, -1); // Remove trailing underscore
    */
    img += id_tipo
    ImgURL += img + ".png";
    return ImgURL;
}
