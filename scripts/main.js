import Photographer from './photographer.js';

let data = {};

fetch("../data/FishEyeData.json")
    .then(response => response.json())
    .then(json => {
        displayPhotographers(json.photographers);
        displayMedias(json.media);
    });

function displayPhotographers(photographers) {
    for (let i in photographers) {
        console.log(i);
        let photographer = new Photographer(photographers[i], i);
        photographer.display();
    }
}

function displayMedias(medias) {
    console.log("Liste des médias : ", medias);
}