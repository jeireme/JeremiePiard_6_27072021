import Photographer from './photographer.js';

let profiles = [];
const filters = document.getElementById('filters').getElementsByTagName('input');
const url = "https://raw.githubusercontent.com/jeireme/JeremiePiard_6_27072021/master/data/FishEyeData.json";

fetch(url).then(response => {
        if (response.ok) return response.json();
        else throw new Error('Something went wrong');
    }).then(json => {
        displayPhotographers(json.photographers);
        initFilter(filters);
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

function initFilter(filters) {
    for (let filter of filters) {
        filter.addEventListener("change", function() {
            for (let photographer of profiles) {
                photographer.onChangeDisplay(filters);
            }
        });
    }
}

// function displayMedias(medias) {
//     console.log("Liste des médias : ", medias);
// }