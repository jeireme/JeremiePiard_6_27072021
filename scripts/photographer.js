export default class Photographer {

    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.location = data.city + ", " + data.country;
        this.tagline = data.tagline;
        this.priceHome = data.price + "€/jour";
        this.priceMedias = data.price + "€ / jour";
        this.tags = data.tags;
        this.portrait = data.portrait;
    }

    display(page) {
        if (page == "homepage") {
            const profiles = document.getElementById("profiles");
            let photographer = document.createElement('div');
            photographer.className = "photographer " + this.id;
            photographer.innerHTML = ` 
                <div class="profile">
                    <a href="medias.html" class="profile__picture profileLink" id="${this.id}">
                        <img src="img/Photographers-md/${this.portrait}" alt="Photo de profil de ${this.name}">
                        <h2 class="profile__name">${this.name}</h2>
                        </a>
                </div>
                <div tabindex="0" class="profile">
                    <p class="profile__location">${this.location}</p>
                    <p class="profile__biography">${this.tagline}</p>
                    <p class="profile__tariff">${this.priceHome}</p>
                </div>
                <div tabindex="0" class="filters">
                    ${setFilters(this.tags, page)}
                </div> `;
            profiles.appendChild(photographer);
        }
        else if (page == "medias") {
            document.getElementById("description").innerHTML += `
            <div class="photographer--medias ${this.id}">
                <div class="profile">
                    <h2 class="profile__name profile__name--medias">
                        <span tabindex="0">${this.name}</span> <button class="contact">Contactez-moi</button>
                    </h2>
                </div>
                <div tabindex="0" class="profile--medias">
                    <p class="profile__location profile__location--medias">${this.location}</p>
                    <p class="profile__biography profile__biography--medias">${this.tagline}</p>
                </div>
                <div tabindex="0" class="filters filters--medias">
                    ${setFilters(this.tags, page)}
                </div>
            </div>
            <div href="#" class="profile__picture profile__picture--medias">
                <img  tabindex="0" src="img/Photographers-md/${this.portrait}" alt="Photo de profil de ${this.name}">
            </div> `;

            document.getElementById("banner").innerHTML += `
            <div>
                <p><span tabindex="0" id="total_likes"></span> <i class="fas fa-heart"></i></p>
            </div>
            <p tabindex="0">${this.priceMedias}</p> `;

            document.getElementById("form_name").innerText = this.name;
        }
    }

    keep() {
        document.getElementsByClassName(this.id)[0].style.display = "flex";
    }

    remove() {
        document.getElementsByClassName(this.id)[0].style.display = "none";
    }
}

function setFilters(tags, page) {
    let html = '';
    if (page == "homepage") for (let i in tags) html += '<div><input type="checkbox" class="filters__tags displayNone"><label tabindex="0" class="filters__tags__name">#' + tags[i] + '</label></div>';
    else if (page == "medias") for (let i in tags) html += '<div><input type="checkbox" class="filters__tags displayNone"><label tabindex="0" class="filters__tags__name filters__tags__name--medias">#' + tags[i] + '</label></div>';
    return html;
}