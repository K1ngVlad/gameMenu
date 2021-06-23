console.log('Начало работы кода');

console.log('Добавление фона');

const parallax = createParalaxBg();

// const background = document.createElement('div');
// background.classList.add('container');
// background.classList.add('background');
// document.body.appendChild(background);

console.log('Создание главного контейнера');
const container = document.createElement('div');
container.classList.add('container');
container.classList.add('main-container');
parallax.appendChild(container);

const divArr = createFlexBox();
const [div_1, div_2, div_3, div_4] = divArr;

console.log('создание темы');


let theme = 'Dark';

const objThemes = {
    Dark :{
    '--background': 'url(img/backgroundForest.jpg)',
    '--backgroundButton': 'rgb(0, 70, 87)',
    '--backgroundDiv': 'rgb(0, 70, 87)',
    '--clear':'rgb(0, 0, 0, 0)',
    '--darker': 'rgb(0, 0, 0, 0.2)',
    '--btnText': 'rgb(6, 164, 212)',
    '--divText': 'rgb(216, 238, 246)',
    '--icon': 'skyblue',
    '--iconImg': 'img/darkIcon.png',
    '--border': 'rgb(1, 51, 58)',
    '--exit': 'rgb(10, 136, 153)',
    '--backgroundExit': 'rgb(10, 64, 71)',
    '--btnHover': 'rgb(12, 193, 248)',
    '--btnHoverExit': 'rgb(40, 186, 206)',
    '--select': 'skyblue'},
    Green: {
    '--background': 'url(img/greenBackground.jpg)',
    '--backgroundButton': 'darkgreen',
    '--backgroundDiv': 'darkgreen',
    '--clear':'rgb(0, 0, 0, 0)',
    '--darker': 'rgb(0, 0, 0, 0)',
    '--btnText': 'rgb(9, 194, 9)',
    '--divText': 'rgb(164, 235, 194)',
    '--icon': 'yellowgreen',
    '--iconImg': 'img/greenIcon.png',
    '--border': 'rgb(4, 65, 4)',
    '--exit': 'rgb(13, 146, 13)',
    '--backgroundExit': 'rgb(9, 87, 9)',
    '--btnHover': 'rgb(151, 223, 9)',
    '--btnHoverExit': 'rgb(60, 204, 60)',
    '--select': 'rgb(151, 223, 9)'}
}

createMenu();

function createMenu() {
    console.log('Построение меню');

    addFragment(div_1,
        createSelest('selectTheme', 'Dark', 'Green'),
        createSound('backgorundMusic','sound/MedievalTheme2.wav', true, true));

    addFragment(div_2,
        createImage('icon', 'img/darkIcon.png', 'Иконка'),
        createTextContainer('iconTxt', 'Immortal Heroes'),
        );

    addFragment(div_3,
        createTextContainer('startText', 'Нажмите на экран, чтобы начать'));

        div_3.addEventListener('click', startMenu);

}

function startMenu() {
    console.log('Запуск меню');
    div_3.removeEventListener('click', startMenu);
    createStartMenu();
}

function createStartMenu() {
    console.log('Генерация стартового меню');

    divClear(div_3);

    addFragment(div_3,
    createButton('firstBtn', 'Начать игру', createBeginMenu),
    createButton('secondBtn', 'Настройки', createSettingMenu),
    createButton('btnExit', 'Выход',  closeGame))
    }

 function closeGame() {
    console.log('Закрытие страницы');
     window.close();
     createExitMessage();
  }

function createBeginMenu() {
    console.log('Генерация меню входа');

    divClear(div_3);

    addFragment(div_3,
    createButton('firstBtn', 'Войти', createPlayerMenu),
    createButton('secondBtn', 'Новая игра', createNewPlayerMenu),
    createButton('btnBack', 'Назад', createStartMenu));
    
}

function createSelest(classDiv) {
    console.log('Создание списка выбора');
    const div = document.createElement('div');
    const select = document.createElement('select');
    const arrElem = Array.from(arguments);

    div.appendChild(select);

    div.classList.add('container');
    div.classList.add(classDiv);

    select.classList.add(`${classDiv}Select`)

    arrElem.forEach((value, key) => {
        if (!key) return;
        const option = document.createElement('option');
        option.setAttribute('id', value);
        option.textContent = value;
        console.log(option);
        select.appendChild(option);
    })

    div.appendChild(select);

    div.addEventListener('change', () => {
        console.log(`Тема изменена на:${select.value}`)
        selectTheme(select.value);
});

    return div;
}

function selectTheme(selectedTheme) {
    theme = selectedTheme;
    const obj = objThemes[theme];
    console.log(obj);
   for (const key in obj) {
       if(key === '--iconImg') {
           document.querySelector('.icon').setAttribute('src', obj[key]);
       }
       else {
        document.documentElement.style.setProperty(key, obj[key]);
       }
    //  console.log(obj[key]);
   }
}

function createPlayerMenu() {
    console.log('Генерация меню новой игры');

    divClear(div_3);

    addFragment(div_3,
        createTextContainer('txtMsg', 'На данный момент у вас нет существующих персонажей'),
        createButton('btnBack', 'Назад', createBeginMenu));
}

function createNewPlayerMenu() {
    console.log('Генерация меню новой игры');

    divClear(div_3);

    addFragment(div_3,
        createTextContainer('txtMsg', 'Вы прошли демо-версию игры! Желаете купить полную версию за 99$?'),
        createButton('btnBack', 'Назад', createBeginMenu));
}

function createSettingMenu() {
    console.log('Генерация меню настроек');

    divClear(div_3);

    addFragment(div_3,
    createButton('firstBtn', 'Звук', createSoundMenu),
    createButton('secondBtn', 'Управление', createKeyMenu),
    createButton('btnBack', 'Назад', createStartMenu));
}

function createSoundMenu() {
    divClear(div_3);

    addFragment(div_3,
        createRange('Музыка', 'backgroundMusic', 100, 1, "volume()"),
        createButton('btnBack', 'Назад', createSettingMenu));
}

function createKeyMenu() {
    divClear(div_3);

    addFragment(div_3,
        createTextContainer('txtMsg', 'Управление мышкой :)'),
        createButton('btnBack', 'Назад', createSettingMenu));
}

function createExitMessage() {
    console.log('Не удалось закрыть страницу');

    divClear(div_3);

    addFragment(div_3,
        createTextContainer('txtMsg', 'Страница была запущенна непредвиденным способом и не может быть закрыта! Пожалуйста, закройте страницу вручную!'),
        createButton('btnBack', 'Назад', createStartMenu));
}

function createFlexBox() {
    console.log('Создание дочерних контейнеров');
    const divArr = [];
    for(i = 0;i < 4;i++){
        const div = document.createElement('div');
        div.classList.add('container');
        div.classList.add('container-child');
        div.setAttribute('id', `container-${i}`);
        container.appendChild(div);
        divArr[i] = div;
    }
    return divArr;
}

function addFragment(div) {
    const fragment = document.createDocumentFragment();
    const elemArr = Array.from(arguments);

    elemArr.forEach((value, key) => {
        if (!key) return;
        fragment.appendChild(value);
    })
    console.log('Добавление фрагмента');
    div.appendChild(fragment);
}

function createButton(classBtn, text, func) {
    console.log('Создание кнопки');
    const btn = document.createElement('button');

    btn.classList.add('btn');
    btn.classList.add(classBtn);
    btn.textContent = text;

    btn.addEventListener('click', func);

    return btn;
}

function createRange(text, classRange, max, step, func) {
    const string = document.createElement('p')
    const range = document.createElement('input');

    string.textContent = text;
    string.classList.add('range');
    string.classList.add(classRange);

    range.setAttribute('type', 'range');
    range.setAttribute('min', '0');
    range.setAttribute('max', max);
    range.setAttribute('step', step);
    range.setAttribute('value', '100');
    range.setAttribute('onInput', func);

    // console.log(value);

    string.appendChild(range);

    return string;
}

function volume() {
    const volumeVaule = document.querySelector('.backgroundMusic').firstElementChild.value;

    const audio = document.querySelector('audio');
    
    const volume = -10000 + volumeVaule * 100;

    console.log(volume);

    audio.setAttribute('volume', volume);
}

function createImage(classImg, src, alt) {
    console.log('Создание Изображения');
    const img = document.createElement('img');

    img.classList.add('img');
    img.classList.add(classImg);

    img.setAttribute('src', src);
    img.setAttribute('alt', alt);

    return img;
}

function createTextContainer(classTxt, text) {
    console.log('Создание текста');
    const txt = document.createElement('div');

    txt.classList.add('txtContainer');
    txt.classList.add(classTxt);

    txt.textContent = text;

    return txt;
}

function divClear(div) {
    const elemArry = Array.from(div.children);
    elemArry.forEach(vaule => {
        div.removeChild(vaule);
    })
}

function createSound (audioClass, src, autoplay, loop) {
    const audio = document.createElement('audio');

    audio.classList.add(audioClass);
    audio.setAttribute('src', src);
    audio.setAttribute('autoplay', autoplay);
    audio.setAttribute('loop', loop);

    return audio;
}

function createParalaxBg () {
    const parallax = document.createElement('div');

    // parallax.classList.add('container');
    parallax.classList.add('parallax');

    const background = document.createElement('div');

    // background.classList.add('container');
    background.classList.add('background');

    parallax.appendChild(background);
    document.body.appendChild(parallax);

    window.addEventListener('mousemove', function(e) {
        let x = e.clientX / window.innerWidth;
        let y = e.clientY / window.innerHeight;  
        background.style.transform = 'translate(-' + x * 50 + 'px, -' + y * 50 + 'px)';
    });

    return parallax;
}