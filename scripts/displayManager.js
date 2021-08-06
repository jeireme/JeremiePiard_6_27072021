import Photographer from './photographer.js';
import Medias from './medias.js';

let photographers = [];
let medias = [];

let filters = [];
let sortChoices = ["Popularité", "Date", "Title"];
let selectionDiv;
let optionsDiv;
let selected;
let options;

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

        // init sorting options
        selectionDiv = document.getElementById("selection");
        optionsDiv = document.getElementById("options");
        selected = document.getElementById("selected__value");
        options = optionsDiv.getElementsByTagName("button");
        selectionDiv.addEventListener("click", initSortingListeners);
        for (let option of options) option.addEventListener("click", selectOption);

        sessionStorage.clear();
    }

    static sorting() {
        console.log("On va trier par : " + selected.innerHTML);
    }
}

function initSortingListeners() {
    selectionDiv.style.display = "none";
    optionsDiv.style.display = "block";
}

function selectOption(event) {
    const userChoice = document.getElementById(event.target.id).querySelector('h3').innerHTML;
    if (event.target.id != "choice1") {
        const choice1 = document.getElementById("choice1").querySelector('h3');
        document.getElementById(event.target.id).querySelector('h3').innerHTML = choice1.innerHTML;
        choice1.innerHTML = userChoice;
        selected.innerHTML = userChoice;
    }
    optionsDiv.style.display = "none";
    selectionDiv.style.display = "flex";
    DisplayManager.sorting(userChoice);
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