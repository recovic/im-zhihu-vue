const PIC_SERVER = "/api_img/?s=App.CDN.UploadImgByBase64&app_key=3EE1399D7F5DC953E746D33FF9B06E0E";
const ANONY_AVATAR = "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=605029614,2240337309&fm=26&gp=0.jpg";

function getFileBase64(obj, fnc){
    let called = false;
    try {
        let reader = new FileReader();
        reader.readAsDataURL(obj);
        reader.onload = function(e) {
            //console.log(e.target.result);
            if (typeof fnc === "function") {
                called = true;
                fnc(e.target.result);
            }
        };
    } catch (e) {
        console.log(e);
        if (!called) {
            if (typeof fnc === "function") {
                called = true;
                fnc("");
            }
        }
    }
}

function showAvatarUrl(url) {
    if (url == null || url == "") {
        return ANONY_AVATAR;
    }
    return url;
}

function setUrlQuery(ctx, key, val) {
    let query = ctx.$router.history.current.query;
    let path = ctx.$router.history.current.path;
    let newQuery = JSON.parse(JSON.stringify(query));
    newQuery[key] = val;
    ctx.$router.push({ path, query: newQuery });
}

export default {
    PIC_SERVER,
    getFileBase64,
    showAvatarUrl,
    setUrlQuery
}