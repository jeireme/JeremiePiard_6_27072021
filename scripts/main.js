import DisplayManager from './displayManager.js';

class Main {

    url = "https://raw.githubusercontent.com/jeireme/JeremiePiard_6_27072021/master/data/FishEyeData.json";

    constructor() {
        this._init();
    }

    _init() {
        this._fetchData();
    }

    async _fetchData() {
        if (document.body.id == "index") sessionStorage.clear();
        try {
            const data = await fetch(this.url);
            if (data) {
                const json = await data.json();
                let display = new DisplayManager(json);
                if (sessionStorage.getItem('id') == null) display.home();
                else display.medias();
            } else {
                let display = new DisplayManager();
                display.errorMessage();
            }
        } catch (err) {
            throw new Error(err);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Main();
});