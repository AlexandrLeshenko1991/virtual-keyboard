import Observer from "../lib/Observer";

class LangContainet extends Observer {
    constructor(state = {}) {
        super();
        this.appState = state;
    }

    createMarkup(state) {
        return `
        <br>
        <div>language: ${state.setting.lang}</div>
        <br>
        <div>Смена языка: ControlLeft + AltLeft</div>
        <div>Клавиатура создана в операционной системе Windows</div>
    `;
    }


    render(state, selector) {
        const markup = this.createMarkup(state);
        const parent = document.getElementById(selector);
        parent.innerHTML = markup;
        this.bindEvents();
    }

    update(state) {
        this.render(state, "lang-container");
    }

    // Добавить событие на клик
    bindEvents() {

    }

}

export default LangContainet;
