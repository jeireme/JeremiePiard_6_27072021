import Photographer from './photographer.js';

let profiles = [];
const tags = document.getElementById('filters').getElementsByTagName('input');
const url = "https://raw.githubusercontent.com/jeireme/JeremiePiard_6_27072021/master/data/FishEyeData.json";

fetch(url).then(response => {
        if (response.ok) return response.json();
        else throw new Error('Something went wrong');
    }).then(json => {
        console.log("data loading sucess");
        displayPhotographers(json.photographers);
        initFilter(tags);
    })
    .catch((error) => {
        console.log(error)
    });

function displayPhotographers(photographers) {
    for (let i in photographers) {
        let photographer = new Photographer(photographers[i]);
        photographer.display();
        profiles.push(photographer);
    }
}

function initFilter(tags) {
    for (let tag of tags) {
        tag.addEventListener("change", function (event) {
            for (let photographer of profiles) {
                photographer.onChangeDisplay(event);
            }
        });
    }
}

// function displayMedias(medias) {
//     console.log("Liste des médias : ", medias);
// }