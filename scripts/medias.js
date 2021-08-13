const gallery = document.getElementById("gallery");
export default class Medias {

    constructor(data) {
        this.id = data.id;
        this.photographerId = data.photographerId;
        this.title = data.title;
        this.content;
        this.isImage = data.image;
        this.isVideo = data.video;
        this.tags = data.tags;
        this.likes = data.likes;
        this.liked = false;
        this.date = data.date;
        this.price = data.price;
        this.media = document.createElement('div');
    }

    display() {
        this.media.className = "medias " + this.id;
        this.media.innerHTML = `
        ${this.content = isImageOrVideo(this.isImage, this.isVideo)}
        <div class="medias__header">
            <p>${this.title}</p>
            <p class="medias__header__likes"><span id="likes_id_${this.id}">${this.likes}</span> <i id="${this.id}" class="fas fa-heart cursorPointer"></i></p>
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

function isImageOrVideo(isImage, isVideo) {
    if (isImage) return `<img src="img/medias/${isImage}" class="medias__picture image cursorPointer">`;
    else if (isVideo) return `<video src="img/medias/${isVideo}#t=0.1" preload="metadata" autoplay loop class="medias__picture" controls></video>`;
}