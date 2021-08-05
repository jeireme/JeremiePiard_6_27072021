export default class Medias {

    constructor(data) {
        this.id = data.id;
        this.photographerId = data.photographerId;
        this.title = data.title;
        this.image = data.image;
        this.video = data.video;
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
        </div> `;
    }
}

function isImageOrVideo(image, video) {
    if (image) return ` <img src="img/medias/${image}" class="medias__picture"> `;
    else if (video) return ` <video src="img/medias/${video}" autoplay loop class="medias__picture" controls></video> `;
}