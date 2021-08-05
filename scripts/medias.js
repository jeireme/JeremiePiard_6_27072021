export default class Medias {

    constructor(data) {
        this.id = data.id;
        this.photographerId = data.photographerId;
        this.title = data.title;
        this.image = data.image || 'false';  
        this.video = data.video || 'false';
        this.tags = data.tags;
        this.likes = data.likes;
        this.date = data.likes;
        this.price = data.price;
    }

    display() {
        document.getElementById("gallery").innerHTML += `
        <div class="medias">
            ${isImageOrVideo(this.image, this.video)}
            <div class="medias__header">
                <p>${this.title}</p>
                <i class="fas fa-heart"></i>
            </div>
        </div>
        `;
    }

    displayNone() {
        document.getElementsByClassName(this.id)[0].style.display = "none";
    }
}

function isImageOrVideo(image, video) {
    if (image) return `<img src="img/medias/${image}" class="medias__picture">`;
    else return `
    <video title="${this.title}" preload="auto" autoplay controls>
        <source src="img/medias/${video}" type="video/mp4">
    </video>
    `;
}