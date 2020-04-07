import Observer from "../lib/Observer";

class Input extends Observer {
    // Passing in our state object and setting it as a class property.
    constructor(state = {}) {
        super();
        this.appState = state;
    }

    createMarkup(state) {
        return `<div>
      <form id="input-wrap">
        <textarea id="textarea" type="text" name="name" rows="10" cols="80">
        </textarea>
      </form>
    </div>`;
    }

    render(state, selector) {
        const markup = this.createMarkup(state);
        const parent = document.getElementById(selector);
        parent.innerHTML = markup;
        this.bindEvents()
        let textarea = document.querySelector("#textarea")
        textarea.focus()
        textarea.value = state.value.join('');
    }

    update(state) {
        this.render(state, "form");
    }

    // Bind an event on submit for the add user form.
    bindEvents() {
        const form = document.getElementById("textarea");
        form.addEventListener("input", e => {
            e.preventDefault();
            console.log(e.currentTarget.value)
            console.log(e.currentTarget)
        });
    }
}

export default Input;
