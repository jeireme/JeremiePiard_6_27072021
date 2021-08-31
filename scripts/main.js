import DisplayManager from './displayManager.js';

if (document.body.id == "index") sessionStorage.clear();

const url = "https://raw.githubusercontent.com/jeireme/JeremiePiard_6_27072021/master/data/FishEyeData.json";
// const url = "../data/FishEyeData.json";

fetch(url).then(response => {
        if (response.ok) return response.json();
        else throw new Error('Something went wrong');
    })
    .then(json => {
        let display = new DisplayManager(json);
        if (sessionStorage.getItem('id') == null) display.home();
        else display.medias();
    })
    .catch((error) => {
        console.log(error)
    });