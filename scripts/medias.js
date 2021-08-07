const gallery = document.getElementById("gallery");
export default class Medias {

    constructor(data) {
        this.id = data.id;
        this.photographerId = data.photographerId;
        this.title = data.title;
        this.image = data.image;
        this.video = data.video;
        this.tags = data.tags;
        this.likes = data.likes;
        this.date = data.date;
        this.price = data.price;
        this.media = document.createElement('div');
    }

    display() {
        this.media.className = "medias";
        this.media.innerHTML = `
        ${isImageOrVideo(this.image, this.video)}
        <div class="medias__header">
            <p>${this.title}</p>
            <i class="fas fa-heart"></i>
        </div> `;
        gallery.appendChild(this.media);
    }

    appendChild() {
        gallery.appendChild(this.media);
    }

    removeChild() {
        gallery.removeChild(this.media);
    }
}

function isImageOrVideo(image, video) {
    if (image) return ` <img src="img/medias/${image}" class="medias__picture"> `;
    else if (video) return ` <video src="img/medias/${video}" autoplay loop class="medias__picture" controls></video> `;
}