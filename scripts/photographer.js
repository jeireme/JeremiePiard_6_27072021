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

    display() {
        document.getElementById("content").innerHTML += `
            <div class="photographer" id="${this.id}">
                <div class="profile">
                    <a href="#" class="profile__picture"><img src="img/Photographers-md/${this.portrait}" alt="Photo de profil de ${this.name}"></a>
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

    onChangeDisplay(filters) {
        for (let filter of filters) {
            if (filter.checked) {
                for (let tag of this.tags) {
                    if (tag == filter.id) {
                        document.getElementById(this.id).style.display = "flex";
                        return;
                    }
                }
            }
        }
        document.getElementById(this.id).style.display = "none";
    }
}

function setHtmlFilters(tags) {
    let html = '';
    for (let i in tags) html += '<input type="checkbox" class="filters__tags"><label>#' + tags[i] + '</label>';
    return html;
}