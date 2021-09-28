import DisplayManager from './displayManager.js';

if (document.body.id == "index") sessionStorage.clear();

let data = await fetch("https://raw.githubusercontent.com/jeireme/JeremiePiard_6_27072021/master/data/FishEyeData.json");
let json = await data.json();
let display = new DisplayManager(json);

if (sessionStorage.getItem('id') == null) display.home();
else display.medias();