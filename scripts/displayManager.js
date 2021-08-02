import Photographer from './photographer.js';

let profiles = [];
const tags = document.getElementById('filters').getElementsByTagName('input');

fetch("https://raw.githubusercontent.com/jeireme/JeremiePiard_6_27072021/master/data/FishEyeData.json")
.then(response => response.json())
.then(json => {
    displayPhotographers(json.photographers);
    initFilter(tags);
    //displayMedias(json.media);
});

function displayPhotographers(photographers) {
    for (let i in photographers) {
        let photographer = new Photographer(photographers[i]);
        photographer.display();
        profiles.push(photographer);
    }
    // console.log('profile.length :' + profiles.length);

//     for (let filter of filters) {
//             // console.log("filter = " + filter.id);
//             filter.addEventListener("change", checkTagsList);
//         }
}

function initFilter(tags) {
    for (let tag of tags) {
        // console.log("filter = " + filter.id);
        tag.addEventListener("change", function(event) {

            for (let photographer of profiles) {
                photographer.onChangeDisplay(event);
            }
            
        });
    }
}

// function displayMedias(medias) {
//     console.log("Liste des médias : ", medias);
// }