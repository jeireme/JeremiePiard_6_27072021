export default class Photographer {

    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.location = data.city + ", " + data.country;
        this.tagline = data.tagline;
        this.price = data.price + "€/jour";
        this.tags = data.tags;
        this.portrait = data.portrait;
    }

    displayHomePage() {
        document.getElementById("profiles").innerHTML += `
            <div class="photographer ${this.id}">
                <div class="profile">
                    <a href="medias.html" class="profile__picture" id="${this.id}"><img src="img/Photographers-md/${this.portrait}" alt="Photo de profil de ${this.name}"></a>
                    <h2 class="profile__name">${this.name}</h2>
                </div>
                <div class="profile">
                    <p class="profile__location">${this.location}</p>
                    <p class="profile__biography">${this.tagline}</p>
                    <p class="profile__tariff">${this.price}</p>
                </div>
                <div class="filters">
                    ${setHtmlFilters(this.tags)}
                </div>
            </div> `;
    }

    onFilterChange(filters) {
        const photographers = document.getElementsByClassName(this.id);
        photographers[0].style.display = "flex";
        for (let filter of filters) {
            if (filter.checked) {
                photographers[0].style.display = "none";
                for (let tag of this.tags) {
                    if (tag == filter.id) {
                        photographers[0].style.display = "flex";
                        return;
                    }
                }
            }
        }
    }
}

function setHtmlFilters(tags) {
    let html = '';
    for (let i in tags) html += '<input type="checkbox" class="filters__tags"><label class="filters__tags__name">#' + tags[i] + '</label>';
    return html;
}