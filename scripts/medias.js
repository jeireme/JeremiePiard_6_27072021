export default class Medias {

    constructor() {
    }

    display() {
        document.getElementsByClassName(this.id)[0].style.display = "flex";
    }

    displayNone() {
        document.getElementsByClassName(this.id)[0].style.display = "none";
    }
}