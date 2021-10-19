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
            photographer.className = `photographer ${this.id}`;
            photographer.innerHTML = ` 
                <div class="profile">
                    <a href="medias.html" class="profile__picture profileLink" id="${this.id}"  aria-label="Accéder au profil de ${this.name}">
                        <img src="img/Photographers-md/${this.portrait}" alt="Photo de profil de ${this.name}">
                        <h2 class="profile__name">${this.name}</h2>
                        </a>
                </div>
                <div tabindex="0" class="profile" aria-label="Informations générales concernant ${this.name}">
                    <p class="profile__location" aria-label="Localisation">${this.location}</p>
                    <p class="profile__biography" aria-label="Slogan">${this.tagline}</p>
                    <p class="profile__tariff" aria-label="Tarif journalier">${this.priceHome}</p>
                </div>
                <div tabindex="0" class="filters" aria-label="Catégories associées à ${this.name}">
                    ${setFilters(this.tags, this.id, page)}
                </div> `;
            profiles.appendChild(photographer);
        } else if (page == "medias") {
            document.getElementById("description").innerHTML += `
            <div class="photographer--medias ${this.id}">
                <div class="profile">
                    <h2 class="profile__name profile__name--medias">
                        <span tabindex="0" aria-label="Nom du photographe">${this.name}</span> <button id="contact" aria-label="Ouverture d'un formulaire de contact" aria-controls="form" aria-haspopup="true" aria-expanded="false">Contactez-moi</button>
                    </h2>
                </div>
                <div tabindex="0" class="profile--medias" aria-label="Informations générales concernant ${this.name}">
                    <p class="profile__location profile__location--medias" aria-label="Localisation">${this.location}</p>
                    <p class="profile__biography profile__biography--medias" aria-label="Slogan">${this.tagline}</p>
                </div>
                <div tabindex="0" class="filters filters--medias" aria-label="Catégories associées à ${this.name}">
                    ${setFilters(this.tags, this.id, page)}
                </div>
            </div>
            <div href="#" class="profile__picture profile__picture--medias">
                <img tabindex="0" src="img/Photographers-md/${this.portrait}" alt="Photo de profil de ${this.name}">
            </div> `;

            document.getElementById("banner").innerHTML += `
            <div>
                <p><span tabindex="0" id="total_likes" aria-label="Nombre total de J'aime reçus par ${this.name}"></span> <em class="fas fa-heart"></em></p>
            </div>
            <p tabindex="0" aria-label="Tarif journalier">${this.priceMedias}</p> `;

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

function setFilters(tags, id, page) {
    let html = '';
    if (page == "homepage")
        for (let i in tags) html += `<input class="filters__tags displayNone" id="${id + tags[i]}" name="${id + tags[i]}"><label for="${id + tags[i]}" class="filters__tags__name">#${tags[i]}</label>`;
    else if (page == "medias")
        for (let i in tags) html += `<input class="filters__tags displayNone" id="${id + tags[i]}" name="${id + tags[i]}"><label for="${id + tags[i]}" class="filters__tags__name filters__tags__name--medias">#${tags[i]}</label>`;
    return html;
}