const PIC_SERVER = "/api_img/?s=App.CDN.UploadImgByBase64&app_key=3EE1399D7F5DC953E746D33FF9B06E0E";

function getFileBase64(obj, fnc){
    let reader = new FileReader();
    reader.readAsDataURL(obj);
    reader.onload = function(e) {
        //console.log(e.target.result);
        if (typeof fnc === "function") {
            fnc(e.target.result)
        }
    };
}

export default {
    PIC_SERVER,
    getFileBase64
}