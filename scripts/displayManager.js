import Photographer from './photographer.js';
import Medias from './medias.js';

let filters = [];
let photographers = [];
let medias = [];
export default class DisplayManager {
    constructor(data) {
        this.profiles = data.photographers;
        this.media = data.media;
    }

    home() {
        for (let obj of this.profiles) {
            let photographer = new Photographer(obj);
            photographer.display();
            photographers.push(photographer);
        }

        filters = document.getElementById('filters').getElementsByTagName('input');
        initFiltersListeners();

        let profileLinks = document.getElementsByClassName("profile__picture");
        for (let link of profileLinks) {
            link.addEventListener("click", function () {
                sessionStorage.setItem('id', this.id);
                console.log("id : " + this.id)
            });
        }
    }

    medias() {
        // ! on créera ça demain...
        console.log("Nous allons afficher les médias du photographe n°" + sessionStorage.getItem('id'));
        sessionStorage.clear();
    }
}

function initFiltersListeners() {
    for (let filter of filters) filter.addEventListener("change", onFilterChange);
}

function onFilterChange() {
    for (let photographer of photographers) {
        photographer.keep();
        for (let filter of filters) {
            if (filter.checked) {
                photographer.remove();
                if (photographer.tags.find(element => element == filter.id)) {
                    photographer.keep();
                    break;
                }
            }
        }
    }
}