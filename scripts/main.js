import Photographer from './photographer.js';

let data = {};

fetch("https://raw.githubusercontent.com/jeireme/JeremiePiard_6_27072021/master/data/FishEyeData.json")
    .then(response => response.json())
    .then(json => {
        displayPhotographers(json.photographers);
        //displayMedias(json.media);
    });

function displayPhotographers(photographers) {
    for (let i in photographers) {
        let photographer = new Photographer(photographers[i], i);
        photographer.display();
    }
}

// function displayMedias(medias) {
//     console.log("Liste des médias : ", medias);
// }