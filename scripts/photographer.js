// position is only used for desktop layout
const positions = ["left", "middle", "right"];

export default class Photographer {

    constructor(data, index) {
        this.id = data.id;
        this.name = data.name;
        this.location = data.city + ", " + data.country;
        this.tagline = data.tagline;
        this.price = data.price + "€/jour";
        this.tags = setHtmlTags(data.tags);
        this.portrait = data.portrait;
        this.position = positions[index % 3];
    }

    display() {
        document.getElementById("content").innerHTML += `
            <div class="photographer--${this.position}">
                <div class="photographer">
                    <div class="profile">
                        <a href="#" class="profile__picture"><img src="img/Photographers-md/${this.portrait}" alt="Photo de profil de ${this.name}"></a>
                        <h2 class="profile__name">${this.name}</h2>
                    </div>
                    <div class="profile">
                        <p class="profile__location">${this.location}</p>
                        <p class="profile__biography">${this.tagline}</p>
                        <p class="profile__tariff">${this.price}</p>
                    </div>
                    <ul class="filters">
                        ${this.tags}
                    </ul>
                </div>
            </div>
        `;
    }
}

function setHtmlTags(tags) {
    let html = '';
    for (let i in tags) {
        html += '<li class="filters__link">#' + tags[i] + '</li>';
    }
    return html;
}