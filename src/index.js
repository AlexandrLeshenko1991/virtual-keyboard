import "./scss/main.scss";
import keyboard from "./utils/keyboard";
import settings from "./utils/settings";
import State from "./lib/State";
import Input from "./components/Input";
import Keyboard from "./components/Keyboard";
import Container from "./components/Container";
import KeyboardClick from "./components/KeyboardClick";
import LangContainet from "./components/LangContainet";


const AppState = new State(); // создаем клас состояния

const input = new Input(AppState); // создаем поле ввода
const keyboardWrap = new Keyboard(AppState); // создаем клавиатуру
const lang = new LangContainet(AppState); // создаем клавиатуру
const key = new KeyboardClick(AppState) //класс с логикой клавиатуры


const value = [''];
const setting = settings;

//начальный стейт
AppState.update({keyboard, setting, value });

//одписываемся на обновление стейта
AppState.addObserver(keyboardWrap)
AppState.addObserver(lang)
AppState.addObserver(input)

//тут создаем пустые контейнеры для элементов
let container = new Container();
container.render('lang-container', 'app')
container.render('key-wrap', 'app')
container.render('form', 'app')

//рендер самих элементов
input.render(AppState.get(), 'form')
keyboardWrap.render(AppState.get(), 'key-wrap')
lang.render(AppState.get(), 'lang-container')

