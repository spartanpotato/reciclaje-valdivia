export default function Icons(tipos) {
    console.log("Received tipos:", tipos); // Debug: Log the input data
    var ImgURL = "./Icon/";
    var img = "";
    var contador = 0;
    const ids = ["o_", "l_", "pc_", "v_", "p_"];

    tipos.forEach((elemento) => {
        if (elemento.state) {  // Check if `state` is correctly accessed
            img += ids[contador];
        }
        contador += 1;
    });

    console.log("Constructed img string:", img); // Debug: Log the constructed string
    img = img.slice(0, -1); // Remove trailing underscore
    ImgURL += img + ".png";
    console.log("Final ImgURL:", ImgURL); // Debug: Log the final URL
    return ImgURL;
}
