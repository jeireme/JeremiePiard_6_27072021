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
        console.log("display Home");
        for (let obj of this.profiles) {
            let photographer = new Photographer(obj);
            photographer.display("homepage");
            photographers.push(photographer);
        }

        filters = document.getElementById('filters').getElementsByTagName('input');
        initFiltersListeners();

        let profileLinks = document.getElementsByClassName("profile__picture");
        for (let link of profileLinks) {
            link.addEventListener("click", function () {
                sessionStorage.setItem('id', this.id);
            });
        }
    }

    medias() {
        console.log("Display ID n°" + sessionStorage.getItem('id'));

        // Photographer
        let obj = this.profiles.find(element => element.id == sessionStorage.getItem('id'));
        let photographer = new Photographer(obj);
        photographer.display("medias");

        // Medias
        let photographerMedias = this.media.filter(element => element.photographerId == sessionStorage.getItem('id'));
        for (let obj of photographerMedias) {
            let media = new Medias(obj);
            media.display();
            medias.push(media);
        }

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