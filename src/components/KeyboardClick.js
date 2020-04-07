
class KeyboardClick {
    constructor(state = {}) {
        this.appState = state;
        document.addEventListener('keydown', this.keydownEvent.bind(this))
        document.addEventListener('keyup', this.keyupEvent.bind(this))
    }

    keydownEvent(event) {
        event.preventDefault();
        let state = this.appState.get();

        let valToUpper = {lang: state.setting.lang, toUpper: !state.setting.toUpper,
            cursorPosition: state.setting.cursorPosition, changeLangArray: state.setting.changeLangArray}

        let val = this.getValueKey(event.code, state)


        let inputValue = [...state.value]
        let settingValue = state.setting

        let call = (elem) => event.code === elem.code
        if (state.keyboard.some(call)) {

            switch (event.code) {
                case 'Backspace':
                    let value = [...inputValue]
                    value.pop()
                    inputValue = [...value]
                    break;
                case 'Enter':
                    inputValue = [...state.value, '\n'];
                    break;
                case 'Space':
                    inputValue = [...state.value, ' '];
                    break;
                case 'Tab':
                    inputValue = [...state.value, '   '];
                    break;
                case 'AltRight':
                    break;
                case 'ControlRight':
                    break;
                case 'AltLeft':
                    settingValue = this.changeLang('Alt')
                    break;
                case 'ControlLeft':
                    settingValue = this.changeLang('Control')
                    break;
                case 'ShiftLeft':
                    settingValue = valToUpper
                    break;
                case 'ShiftRight':
                    settingValue = valToUpper
                    break;
                case 'CapsLock':
                    settingValue = valToUpper
                    break;


                default:
                    inputValue = [...state.value, val];

            }


            let new_state = {
                keyboard: state.keyboard.map(i => {
                    let newKey = {
                        rus: i.rus,
                        en: i.en,
                        upRus: i.upRus,
                        upEn: i.upEn,
                        code: i.code,
                        br: i.br,
                        active: true
                    }
                    return (event.code === i.code) ? newKey : i
                }),
                setting: settingValue,
                value: inputValue
            }
            this.appState.update(new_state)
        }
    }

    keyupEvent(event) {
        let state = this.appState.get();
        let settingValue = state.setting
        let valToUpper = {lang: state.setting.lang, toUpper: !state.setting.toUpper,
            cursorPosition: state.setting.cursorPosition, changeLangArray: state.setting.changeLangArray}

        let call = (elem) => event.code === elem.code
        if (state.keyboard.some(call)) {
            switch (event.code) {
                case 'ShiftLeft':
                    settingValue = valToUpper
                    break;
                case 'ShiftRight':
                    settingValue = valToUpper
                    break;
                case 'AltLeft':
                    settingValue = {lang: state.setting.lang, toUpper: state.setting.toUpper,
                        cursorPosition: state.setting.cursorPosition, changeLangArray: []}
                    break;
                case 'ControlLeft':
                    settingValue = {lang: state.setting.lang, toUpper: state.setting.toUpper,
                        cursorPosition: state.setting.cursorPosition, changeLangArray: []}
                    break;
                default:
            }

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
                    return (event.code === i.code) ? newKey : i
                }),
                setting: settingValue,
                value: state.value
            }
            this.appState.update(new_state)
        }
    }

    getValueKey(eventCode, state) {
        let val = state.keyboard.filter(i => event.code === i.code);

        if (val[0]){
            if (state.setting.lang === 'ru') {
                if (state.setting.toUpper) {
                    val = val[0].upRus
                } else {
                    val = val[0].rus
                }
            } else {
                if (state.setting.toUpper) {
                    val = val[0].upEn
                } else {
                    val = val[0].en
                }
            }
        }
        return val
    }

    changeLang(name) {
            let state = this.appState.get();
            let set
            if (state.setting.changeLangArray.includes(name === 'Control' ? 'Alt' : 'Control')) {
                let l = state.setting.lang === 'ru' ? 'en' : 'ru';
                set = {
                    lang: state.setting.lang === 'ru' ? 'en' : 'ru',
                    toUpper: state.setting.toUpper,
                    cursorPosition: state.setting.cursorPosition,
                    changeLangArray: []
                }
                localStorage.setItem('lang', l)
            } else {
                set = {
                    lang: state.setting.lang,
                    toUpper: state.setting.toUpper,
                    cursorPosition: state.setting.cursorPosition,
                    changeLangArray: [...state.setting.changeLangArray, name]
                }
            }
            return set
    }


}

export default KeyboardClick;
