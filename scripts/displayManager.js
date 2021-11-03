import Photographer from './photographer.js';
import Medias from './medias.js';

let fullscreen;
let fullscreenTitle;
let fullscreenImg;
let leftBtn;
let rightBtn;
let index = false;

let photographers = [];
let medias = [];

let filters = [];
let selectionDiv;
let optionsDiv;
let selected;
let options;
let totallikes = 0;
let optionChosen = 1;

let formContainer = document.getElementById("form__container");

export default class DisplayManager {

    constructor(data) {
        this.profiles = data ? data.photographers : null;
        this.media = data ? data.media : null;
    }

    home() {
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
        // Photographer
        let obj = this.profiles.find(element => element.id == sessionStorage.getItem('id'));
        let photographer = new Photographer(obj);
        photographer.display("medias");

        // Medias
        let photographerMedias = this.media.filter(element => element.photographerId == sessionStorage.getItem('id'));

        for (let obj of photographerMedias) {
            let media = new Medias(obj);
            let mediaId = "heartIcon" + media.id;
            media.display();
            medias.push(media);
            totallikes += media.likes;
            document.getElementById(mediaId).addEventListener("click", onLike);
            document.getElementById(mediaId).addEventListener("keydown", onLike);
            if (media.isImage) {
                document.getElementsByClassName(media.id)[0].querySelector('img').addEventListener("click", onFullscreen);
                document.getElementsByClassName(media.id)[0].querySelector('img').addEventListener("keydown", onFullscreen);
            }
        }

        document.getElementById("total_likes").innerText = totallikes;

        // init sorting options
        selectionDiv = document.getElementById("selection");
        optionsDiv = document.getElementById("options");
        selected = document.getElementById("selected__value");
        options = optionsDiv.getElementsByTagName("button");
        selectionDiv.addEventListener("click", initSortingListeners);
        selectionDiv.addEventListener("keydown", initSortingListenersKeyboard);
        DisplayManager.sorting();
        for (let option of options) option.addEventListener("click", selectOption);

        // init fullscreen
        fullscreen = document.getElementById("fullscreen");
        fullscreenTitle = document.getElementById("title");
        fullscreenImg = document.getElementById("image");
        leftBtn = document.getElementById("left");
        rightBtn = document.getElementById("right");
        document.getElementById("close").addEventListener("click", onClose);
        document.getElementById("close").addEventListener("keydown", onClose);
        document.getElementById("left").addEventListener("click", onLeft);
        document.getElementById("left").addEventListener("keydown", onLeft);
        document.getElementById("right").addEventListener("click", onRight);
        document.getElementById("right").addEventListener("keydown", onRight);

        // init form contact
        document.getElementById("contact").addEventListener("click", openForm);
        document.getElementById("closeForm").addEventListener("click", closeForm);

        // init submit
        document.getElementById("submit").addEventListener("submit", onSubmit);

        // accessibility
        document.getElementById("submitBtn").addEventListener("keydown", focusLoopStart);
        document.getElementById("firstFormInput").addEventListener("keydown", focusLoopEnd);
        document.getElementById("closeForm").addEventListener("keydown", closeForm);
        document.getElementById("footer").addEventListener("keydown", focusTopOfThePage);
    }

    errorMessage() {
        document.getElementById("error").style.display = "flex";
    }

    static sorting() {
        if (selected.innerHTML == "Date") {
            for (let media of medias) media.removeChild();
            medias.sort(function (a, b) {
                return new Date(a.date) - new Date(b.date);
            });
            for (let media of medias) media.appendChild();
        } else if (selected.innerHTML == "Titre") {
            for (let media of medias) media.removeChild();
            medias.sort(function (a, b) {
                return a.title.localeCompare(b.title);
            });
            for (let media of medias) media.appendChild()
        } else if (selected.innerHTML == "Popularité") {
            for (let media of medias) media.removeChild();
            medias.sort(function (a, b) {
                return b.likes - a.likes;
            });
            for (let media of medias) media.appendChild()
        }
    }
}

function openForm(event) {
    if (window.matchMedia("(max-width: 1000px)").matches || window.matchMedia("(max-height: 900px)").matches) {
        document.body.style.overflow = "hidden";
    }

    document.getElementById("form").style.height = "100vh";
    document.getElementById("form").style.opacity = 1;
    document.getElementById("form").style.pointerEvents = "all";
    document.getElementById("background").style.backgroundColor = "rgba(255, 255, 255, 0.787)";

    if (formContainer.style.visibility == "hidden") document.getElementById("closeForm").focus();
    else formContainer.focus();

    document.addEventListener("keydown", closeFormOnEscape);
}

function closeFormOnEscape(event) {
    if (event.key == "Escape") closeForm("notAnEvent");
}

function closeForm(event) {
    if (formContainer.style.visibility == "hidden" && event.shiftKey && event.key == "Tab") console.log("Fermeture automatique du formulaire");
    else if (event !== "notAnEvent" && event.key && event.key !== "Enter") return;

    if (!window.matchMedia("(max-width: 1000px)").matches) document.getElementById("form").style.height = "0";
    if (document.body.style.overflow == "hidden") document.body.style.overflow = "auto";

    document.getElementById("form").style.opacity = 0;
    document.getElementById("form").style.pointerEvents = "none";
    document.getElementById("background").style.backgroundColor = "transparent";
    document.removeEventListener("keydown", closeForm);

    if (event == "notAnEvent" || event.key == "Enter") document.getElementById("description").focus();
}

function focusTopOfThePage(event) {
    if (event.key == 'Tab') document.getElementById("description").focus();
}

function focusLoopStart(event) {
    if (event.key == 'Tab') formContainer.focus();
}

function focusLoopEnd(event) {
    if (event.shiftKey && event.key == 'Tab') document.getElementById("submitBtn").focus();
}

function onSubmit(event) {
    event.preventDefault()
    formContainer.style.visibility = "hidden";
    document.getElementById("success").style.display = "flex";
    document.getElementById("messageSuccess").addEventListener("keydown", focusCloseButton);
}

function focusCloseButton(event) {
    if (event.key == "Tab") closeForm("notAnEvent");
}

function onFullscreen(event) {
    if (event.key && event.key !== "Enter") return;

    for (const media of medias)
        if (media.content == event.currentTarget.outerHTML) {
            fullscreen.style.display = "flex";
            fullscreenImg.innerHTML = media.content;
            fullscreenTitle.innerText = media.title;
            document.body.style.overflow = "hidden";
            index = medias.indexOf(media);
        }

    // feedback at the end of the list
    if (index == 0) {
        leftBtn.style.color = "#901c1c41";
        leftBtn.style.cursor = "auto";
    } else if (index == medias.length - 1) {
        rightBtn.style.color = "#901c1c41";
        rightBtn.style.cursor = "auto";
    }

    if (index > 0) {
        leftBtn.style.color = "#901C1C";
        leftBtn.style.cursor = "pointer";
    }
    if (index < medias.length - 1) {
        right.style.color = "#901C1C";
        right.style.cursor = "pointer";
    }

    document.getElementById("fullscreen").focus();
    document.addEventListener("keydown", fullscreenKeyControls);
    document.getElementById("left").addEventListener("keydown", stayOnLeft);
    document.getElementById("right").addEventListener("keydown", stayOnRight);

}

function stayOnLeft(event) {
    if (event.shiftKey && event.key == "Tab") event.preventDefault();
}

function stayOnRight(event) {
    if (!event.shiftKey && event.key == "Tab") event.preventDefault();
}

function fullscreenKeyControls(event) {
    if (event.key == "ArrowLeft") onLeft("notAnEvent");
    else if (event.key == "ArrowRight") onRight("notAnEvent");
    else if (event.key == "Escape") onClose("notAnEvent");
}

function onLeft(event) {
    if (event !== "notAnEvent" && event.key && event.key !== "Enter") return;

    if (index - 1 >= 0) {
        --index;
        fullscreenImg.innerHTML = medias[index].content;
        fullscreenTitle.innerText = medias[index].title;
    }

    // feedback at the end of the list
    if (index == 0) {
        leftBtn.style.color = "#901c1c41";
        leftBtn.style.cursor = "auto";
    } else if (index == medias.length - 2) {
        right.style.color = "#901C1C";
        right.style.cursor = "pointer";
    }

    document.getElementById("fullscreen").focus();
}

function onRight(event) {
    if (event !== "notAnEvent" && event.key && event.key !== "Enter") return;

    if (index + 1 < medias.length) {
        index++;
        fullscreenImg.innerHTML = medias[index].content;
        fullscreenTitle.innerText = medias[index].title;
    }

    // feedback at the end of list
    if (index == medias.length - 1) {
        rightBtn.style.color = "#901c1c41";
        rightBtn.style.cursor = "auto";
    } else if (index == 1) {
        leftBtn.style.color = "#901C1C";
        leftBtn.style.cursor = "pointer";
    }

    document.getElementById("fullscreen").focus();
}

function onClose(event) {
    if (event !== "notAnEvent" && event.key && event.key !== "Enter") return;
    document.body.style.overflow = "auto";
    fullscreen.style.display = "none";
    document.removeEventListener("keydown", fullscreenKeyControls);
    document.getElementById(fullscreenImg.querySelector('img').id).focus();
}

function onLike(event) {
    if (event.key && event.key !== "Enter") return;
    const mediaLiked = document.getElementById("likes_id_" + event.target.id.replace('heartIcon', ''));

    for (let media of medias) {
        let mediaId = "heartIcon" + media.id;
        if (mediaId == event.target.id & !media.liked) {
            mediaLiked.innerText = ++media.likes;
            document.getElementById("total_likes").innerText = ++totallikes;
            event.target.classList.remove("notLiked");
            event.target.classList.add("liked");
            media.liked = true;
        } else if (mediaId == event.target.id & media.liked) {
            mediaLiked.innerText = --media.likes;
            document.getElementById("total_likes").innerText = --totallikes;
            event.target.classList.remove("liked");
            event.target.classList.add("notLiked");
            media.liked = false;
        }
    }
}

function initSortingListenersKeyboard(event) {
    if (event.key == "ArrowDown") {
        initSortingListeners();
    }
}

function initSortingListeners() {
    selectionDiv.style.display = "none";
    optionsDiv.style.display = "block";
    document.addEventListener("keydown", keyboardSelectOption);
}

function keyboardSelectOption(event) {
    if (event.key == "Enter") return;

    if (event.key == "ArrowUp" || (event.shiftKey && event.key == "Tab")) --optionChosen;
    else if (event.key == "ArrowDown" || event.key == "Tab") ++optionChosen;

    if (optionChosen > 3) optionChosen = 1;
    else if (optionChosen < 1) optionChosen = 3;

    event.view.event.preventDefault();
    document.getElementById("choice" + optionChosen).focus();
}

function selectOption(event) {
    const userChoice = document.getElementById(event.target.id).querySelector('.optionName').innerHTML;

    if (event.target.id != "choice1") {
        const choice1 = document.getElementById("choice1").querySelector('.optionName');
        document.getElementById(event.target.id).querySelector('.optionName').innerHTML = choice1.innerHTML;
        choice1.innerHTML = userChoice;
        selected.innerHTML = userChoice;
    }

    optionsDiv.style.display = "none";
    selectionDiv.style.display = "flex";
    DisplayManager.sorting(userChoice);
    document.removeEventListener("keydown", keyboardSelectOption);
}

function initFiltersListeners() {
    for (let filter of filters) {
        filter.addEventListener("change", onFilterChange);
        filter.addEventListener("keydown", onEnter);
    }
}

function onEnter(event) {
    if (event.key == "Enter") {
        event.target.checked ? event.target.removeAttribute("checked", "checked") : event.target.setAttribute("checked", "checked");
        onFilterChange();
    }
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