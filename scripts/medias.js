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
        this.description = data.description;
        this.media = document.createElement('div');
    }

    display() {
        this.media.className = "medias " + this.id;
        this.media.setAttribute("aria-label", "Informations complémentaires du photographe");
        this.media.innerHTML = `
        ${this.content = isImageOrVideo(this.isImage, this.isVideo, this.description, this.id)}
        <div class="medias__header">
            <p tabindex="0">${this.title}</p>
            <div class="totalLikes"><p class="medias__header__likes"><span tabindex="0" id="likes_id_${this.id}" aria-label="Nombre de J'aime">${this.likes}</span> <div class="likeButtonContainer"><i tabindex="0" aria-label="Bouton J'aime" role="button" id="heartIcon${this.id}" class="fas fa-heart notLiked cursorPointer"></i></div></p></div>
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

function isImageOrVideo(isImage, isVideo, description, id) {
    if (isImage) return `<img src="img/medias/${isImage}" id="${id}" class="medias__picture image cursorPointer" alt="${description}" tabindex="0">`;
    else if (isVideo) return `<video src="img/medias/${isVideo}#t=0.1" preload="metadata" autoplay loop id="${id}" class="medias__picture" alt="${description}" controls></video>`;
}