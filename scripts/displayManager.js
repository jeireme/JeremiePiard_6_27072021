import Photographer from './photographer.js';
import Medias from './medias.js';

let photographers = [];
let medias = [];

let filters = [];
let selectionDiv;
let optionsDiv;
let selected;
let options;
let totallikes = 0;

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
            totallikes += media.likes;
            document.getElementById(media.id).addEventListener("click", onLike);
        }
        document.getElementById("total_likes").innerText = totallikes;

        // init sorting options
        selectionDiv = document.getElementById("selection");
        optionsDiv = document.getElementById("options");
        selected = document.getElementById("selected__value");
        options = optionsDiv.getElementsByTagName("button");
        selectionDiv.addEventListener("click", initSortingListeners);
        DisplayManager.sorting();
        for (let option of options) option.addEventListener("click", selectOption);

        sessionStorage.clear();
    }

    static sorting() {
        // console.log("Affichage trié par : " + selected.innerHTML);
        if (selected.innerHTML == "Date") {
            for (let media of medias) media.removeChild();
            medias.sort(function (a, b) {
                return new Date(a.date) - new Date(b.date);
            });
            for (let media of medias) media.appendChild();
        }
        else if (selected.innerHTML == "Titre") {
            for (let media of medias) media.removeChild();
            medias.sort(function (a, b) {
                return a.title.localeCompare(b.title);
            });
            for (let media of medias) media.appendChild()
        }
        else if (selected.innerHTML == "Popularité") {
            for (let media of medias) media.removeChild();
            medias.sort(function (a, b) {
                return b.likes - a.likes;
            });
            for (let media of medias) media.appendChild()
        }
    }
}

function onLike(event) {
    // console.log(event.target.id);
    const mediaLiked = document.getElementById("likes_id_" + event.target.id);
    for (let media of medias) {
        if (media.id == event.target.id & !media.liked) {
            mediaLiked.innerText = ++media.likes;
            document.getElementById("total_likes").innerText = ++totallikes;
            media.liked = true;
        }
        else if (media.id == event.target.id & media.liked) {
            mediaLiked.innerText = --media.likes;
            document.getElementById("total_likes").innerText = --totallikes;
            media.liked = false;
        }
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