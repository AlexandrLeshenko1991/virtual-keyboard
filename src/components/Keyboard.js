import Observer from "../lib/Observer";
import settings from "../utils/settings";

class Keyboard extends Observer {
    // Passing in our state object and setting it as a class property.
    constructor(state = {}) {
        super();
        this.appState = state;
    }

    createMarkup(state) {
        return `
        <style>
            .row{ max-width: 600px; display: flex; justify-content: space-between;}
            .keyboard-btn{padding: 5px;margin: 2px;border: none;background: darkgray;min-width: 25px; border-radius: 5px;}
            .active{padding: 5px;margin: 2px;border: none;min-width: 25px;background-color: red;border-radius: 50%;}
        </style>
        <div class="row">
        ${state.keyboard
            .map(item => {
                if (state.setting.lang === 'ru') {
                    return `<button type="button" 
                    class="${item.active ? 'active' : 'keyboard-btn'}" 
                    value="${item.code}">
                    ${state.setting.toUpper ? item.upRus : item.rus}
                    </button>${item.br ? `</div><div class="row">` : ''}`
                } else {
                    return `<button type="button" 
                    class="${item.active ? 'active' : 'keyboard-btn'}"
                    value="${item.code}">
                    ${state.setting.toUpper ? item.upEn : item.en}
                  </button>${item.br ? `</div><div class="row">` : ''}`
                }
            })
            .join('')}
        </div>
    `;
    }


    render(state, selector) {
        const markup = this.createMarkup(state);
        const parent = document.getElementById(selector);
        parent.innerHTML = markup;
        this.bindEvents();
    }

    update(state) {
        this.render(state, "key-wrap");
    }

    // Добавить событие на клик
    bindEvents() {
        let keyboardWrap = document.getElementById("key-wrap");
        let btnKeyboard = keyboardWrap.querySelectorAll('button')
        let state = this.appState.get();
        let val = [...state.value]

        for (let i = 0; i < btnKeyboard.length; i++) {
            switch (btnKeyboard[i].value) {
                case 'Backspace':
                    let value = [...val]
                    value.pop()
                    value = [...value]
                    this.mouseDownAll(btnKeyboard[i], value)
                    this.mouseUp(btnKeyboard[i])
                    break;
                case 'Enter':
                    this.mouseDownAll(btnKeyboard[i], [...val, '\n'])
                    this.mouseUp(btnKeyboard[i])
                    break;
                case 'Space':
                    this.mouseDownAll(btnKeyboard[i], [...val, ' '])
                    this.mouseUp(btnKeyboard[i])
                    break;
                case 'Tab':
                    this.mouseDownAll(btnKeyboard[i], [...val, '   '])
                    this.mouseUp(btnKeyboard[i])
                    break;
                case 'AltRight':
                    this.mouseDownAll(btnKeyboard[i], val)
                    this.mouseUp(btnKeyboard[i])
                    break;
                case 'ControlRight':
                    this.mouseDownAll(btnKeyboard[i], val)
                    this.mouseUp(btnKeyboard[i])
                    break;
                case 'AltLeft':
                    this.mouseDownAll(btnKeyboard[i], val)
                    this.mouseUp(btnKeyboard[i])
                    break;
                case 'ControlLeft':
                    this.mouseDownAll(btnKeyboard[i], val)
                    this.mouseUp(btnKeyboard[i])
                    break;
                case 'ShiftLeft':
                    this.toUpperCaseDown(btnKeyboard[i])
                    this.toUpperCaseUp(btnKeyboard[i])
                    break;
                case 'ShiftRight':
                    this.toUpperCaseDown(btnKeyboard[i])
                    this.toUpperCaseUp(btnKeyboard[i])
                    break;
                case 'CapsLock':
                    this.toUpperCaseDown(btnKeyboard[i])
                    this.mouseUp(btnKeyboard[i])
                    break;


                default:
                    this.mouseDown(btnKeyboard[i])
                    this.mouseUp(btnKeyboard[i])
            }


        }
    }

    mouseDown(elem, inputValue = false) {
        elem.addEventListener('mousedown', (e) => {
            let state = this.appState.get();

            let new_state = {
                keyboard: state.keyboard.map(i => {
                    if (e.currentTarget.value === i.code) {
                        return {
                            rus: i.rus, en: i.en, upRus: i.upRus, upEn: i.upEn, code: i.code, br: i.br,
                            active: !i.active
                        }
                    }
                    return i
                }),
                setting: state.setting,
                value: !!inputValue ? inputValue : [...state.value, e.currentTarget.innerText]
            }
            this.appState.update(new_state)
        })
    }

    toUpperCaseDown(elem) {
        elem.addEventListener('mousedown', (e) => {
            let state = this.appState.get();

            let new_state = {
                keyboard: state.keyboard.map(i => {
                    if (e.currentTarget.value === i.code) {
                        return {
                            rus: i.rus, en: i.en, upRus: i.upRus, upEn: i.upEn, code: i.code, br: i.br,
                            active: !i.active
                        }
                    }
                    return i
                }),
                value: state.value,
                setting: {
                    lang: state.setting.lang,
                    toUpper: !state.setting.toUpper,
                    cursorPosition: state.setting.cursorPosition,
                    changeLangArray: state.setting.changeLangArray
                }
            }
            this.appState.update(new_state)
        })
    }

    mouseDownAll(elem, val) {
        elem.addEventListener('mousedown', (e) => {
            let state = this.appState.get();

            let new_state = {
                keyboard: state.keyboard.map(i => {
                    if (e.currentTarget.value === i.code) {
                        return {
                            rus: i.rus, en: i.en, upRus: i.upRus, upEn: i.upEn, code: i.code, br: i.br,
                            active: !i.active
                        }
                    }
                    return i
                }),
                setting: state.setting,
                value: val
            }
            this.appState.update(new_state)
        })
    }

    toUpperCaseUp(elem) {
        let eventCallback = (e) => {
            let state = this.appState.get();
            let new_state = {
                keyboard: state.keyboard.map(i => {
                    let newKey = {
                        rus: i.rus,
                        en: i.en,
                        upRus: i.upRus,
                        upEn: i.upEn,
                        code: i.code,
                        br: i.br,
                        active: false
                    }
                    return (e.currentTarget.value === i.code) ? newKey : i
                }),
                value: state.value,
                setting: {
                    lang: state.setting.lang,
                    toUpper: !state.setting.toUpper,
                    cursorPosition: state.setting.cursorPosition,
                    changeLangArray: state.setting.changeLangArray
                }
            }
            this.appState.update(new_state)
        }

        elem.addEventListener('mouseup', eventCallback)
    }


    mouseUp(elem) {
        let eventCallback = (e) => {
            let state = this.appState.get();
            let new_state = {
                keyboard: state.keyboard.map(i => {
                    let newKey = {
                        rus: i.rus,
                        en: i.en,
                        upRus: i.upRus,
                        upEn: i.upEn,
                        code: i.code,
                        br: i.br,
                        active: false
                    }
                    return (e.currentTarget.value === i.code) ? newKey : i
                }),
                setting: state.setting,
                value: state.value
            }
            this.appState.update(new_state)
        }

        elem.addEventListener('mouseout', eventCallback)
        elem.addEventListener('mouseup', eventCallback)
    }
}

export default Keyboard;
