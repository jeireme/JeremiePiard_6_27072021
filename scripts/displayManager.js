import Photographer from './photographer.js';

let profiles = [];
let medias = [];
const url = "https://raw.githubusercontent.com/jeireme/JeremiePiard_6_27072021/master/data/FishEyeData.json";

// ! Je vais utiliser l'ID du photographe pour créer un affichage dynamique

fetch(url).then(response => {
        if (response.ok) return response.json();
        else throw new Error('Something went wrong');
    }).then(json => {
        displayHomePageOrMedias(json);
    })
    .catch((error) => {
        console.log(error)
    });

function displayHomePageOrMedias(json) {
    if (sessionStorage.getItem('id') == null) displayHomePage(json.photographers);
    else displayMediasPage(json);
    sessionStorage.clear();
}

function displayHomePage(photographers) {
    for (let i in photographers) {
        let photographer = new Photographer(photographers[i]);
        photographer.displayHomePage();
        profiles.push(photographer);
    }

    initFilter();

    const profileLinks = document.getElementsByClassName("profile__picture");
    for (const link of profileLinks) {
        link.addEventListener("click", function (event) {
            const photographerId = this.id;
            sessionStorage.setItem('id', photographerId);
        })
    }
}

function displayMediasPage(medias) {
    console.log("Nous allons afficher les médias du photographe n°" + sessionStorage.getItem('id'));
    // console.log("Liste des médias : ", medias);
}



function initFilter() {
    const filters = document.getElementById('filters').getElementsByTagName('input');
    for (let filter of filters) {
        filter.addEventListener("change", function () {
            for (let photographer of profiles) {
                photographer.onFilterChange(filters);
            }
        });
    }
}