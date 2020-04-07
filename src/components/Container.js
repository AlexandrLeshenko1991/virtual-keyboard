class Container {
    constructor() {
    }

    createMarkup(id) {
        return `<div id=${id}>
    </div>`;
    }

    render(id, selector) {
        const markup = this.createMarkup(id);
        const parent = document.getElementById(selector);
        parent.insertAdjacentHTML('afterbegin', markup);
    }
}

export default Container