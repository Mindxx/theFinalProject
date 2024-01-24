

const maxHp = 1350;
const maxDef = 600;
const maxAtk = 750;
const maxSpd = 100;
const maxTnt = 150;
const valueHp = document.getElementById('hp-value');
const valueDef = document.getElementById('def-value');
const valueAtk = document.getElementById('atk-value');
const valueSpd = document.getElementById('spd-value');
const valueTnt = document.getElementById('tnt-value');
const hpFill = document.querySelector('#hp-fill');
const defFill = document.querySelector('#def-fill');
const atkFill = document.querySelector('#atk-fill');
const spdFill = document.querySelector('#spd-fill');
const tntFill = document.querySelector('#tnt-fill');
const fillTime = 100;


function fillingColor(fillType, value, maxValue, colorFill, duration) {
    const nowWidth = (value / maxValue) * 100;
    fillType.style.width = `${nowWidth}%`;
    value.textContent = maxValue;
    fillType.style.backgroundColor = colorFill;
}

function privateColorfill(fillbarName) {
    switch (fillbarName) {
        case 'hp-fill':
            return 'red';
            break;
        case 'def-fill':
            return '#87CEEB';
            break;
        case 'atk-fill':
            return 'yellow';
            break;
        case 'spd-fill':
            return 'green';
            break;
        default:
            return 'white';
    }
}


function runValue(typeFill, duration) {
    const realValue = Number(typeFill.textContent);
    const increment = realValue / (duration / 10);
    let nowValue = 0;
    function updateValue() {
        nowValue += increment;
        if (nowValue <= realValue) {
            typeFill.textContent = Math.round(nowValue);
            fillingColor(hpFill, valueHp.textContent, maxHp, privateColorfill('hp-fill'));
            fillingColor(defFill, valueDef.textContent, maxDef, privateColorfill('def-fill'));
            fillingColor(atkFill, valueAtk.textContent, maxAtk, privateColorfill('atk-fill'));
            fillingColor(spdFill, valueSpd.textContent, maxSpd, privateColorfill('spd-fill'));
            fillingColor(tntFill, valueTnt.textContent, maxTnt, privateColorfill('tnt-fill'));
            setTimeout(updateValue, 10);
        } else {
            typeFill.textContent = realValue;
        }
    }
    updateValue();
}


fetch('../../../../char-data.json')
.then(res => res.json())
.then(data => {
    madeDisplay(data);
    const dataControl = data;
    const btnControl = document.getElementById('typeNav');
    // const btnArr = [];
    // let diffIndex = 0;
    btnControl.addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON') {
            const buttonTxt = event.target.value;
            appendChar(buttonTxt, dataControl);
            // console.log(`${buttonTxt}`, "is being clicked");
            const buttons = document.querySelectorAll('.type-btn');
            buttons.forEach(button => button.classList.remove('active'));
            event.target.classList.add('active');
            // const nowIndex = Array.from(buttons).indexOf(event.target);
            // btnArr.push(nowIndex);
            // diffIndex = nowIndex - btnArr[btnArr.length - 2];
            // if (diffIndex < 0) {
            //     for (let i = btnArr[btnArr.length - 2]; i > nowIndex; i--) {
            //         buttons[i].classList.add('active2');
            //         setTimeout(() => {
            //             buttons[i].classList.remove('active2');
            //         }, 100);
            //     }
            // }
            // if (diffIndex > 0) {
            //         for (let i = btnArr[btnArr.length - 2]; i < nowIndex + 1; i++) {
            //             buttons[i].classList.add('active2');
            //             setTimeout(() => {
            //                 buttons[i].classList.remove('active2');
            //             }, 100);
            //         }

            // }
        }
    });
    const resetListBtn = document.getElementById('resetDisplay');
    resetListBtn.addEventListener('click', () => {
        madeDisplay(data);
        const buttons = document.querySelectorAll('.type-btn');
        buttons.forEach(button => button.classList.remove('active'));
    })
})


function appendChar(typeChar, data){
    // console.log(`${typeChar}`);
    var filterChar = data.filter(item => item.type === typeChar);
    madeDisplay(filterChar);
}

function madeDisplay(data) {
    const bigList = document.getElementById('char-list');
    bigList.innerHTML = "";
    data.map(item => {
      let liItem = document.createElement('li');
      liItem.setAttribute('id', `${item.char}`);
      liItem.innerHTML = `<img src=${item.icon}>`;
      liItem.classList.add('animateItems');
      bigList.appendChild(liItem);
      charRender(`${item.char}`, data);
    });
}

function charRender(liItem, data) {
    const charFinding = document.getElementById(liItem);
    charFinding.addEventListener('click', () => {
        var character = data.find((item) => {
            return item.char === charFinding.id;
        })
        displayInfo(character);
    })
}


function displayInfo(character) {
    var charBanner = document.getElementById('char-model');
    var charFace = document.getElementById('char-pic');
    var realName = document.getElementById('real-name');
    var nickName = document.getElementById('nick-name');
    var charSound = document.getElementById('char-sound');
    var charFate = document.getElementById('char-fate');
    var charStar = document.getElementById('char-star');
    var storyContent = document.getElementById('storyContent');
    let cleanArr = [charBanner, charFace, realName, nickName, charSound, charFate, charStar, storyContent];
    for (let i = 0; i < cleanArr.length; i++) {
        cleanArr[i].innerHTML= "";
    }
    //char-pic
    let imgChar = document.createElement('img');
    imgChar.src = `${character.face}`;
    imgChar.classList.add('animateFace');
    charFace.appendChild(imgChar);
    //char banner
    let imgBanner = document.createElement('img');
    imgBanner.src = `${character.banner}`;
    imgBanner.classList.add('animateBanner');
    charBanner.appendChild(imgBanner);
    //char name
    let charRelName = document.createElement('h4');
    charRelName.textContent = `${character.char}`;
    charRelName.classList.add('animateInfo');
    realName.appendChild(charRelName);
    // char nick-name
    let charNicName = document.createElement('h4');
    charNicName.textContent = `${character.nickname}` === "null" ? "" : `${character.nickname}`;
    charNicName.classList.add('animateInfo');
    nickName.appendChild(charNicName);
    // char fate
    let imgFate = document.createElement('img');
    imgFate.src = `${character.destiny}`;
    imgFate.classList.add('animateFate');
    charFate.appendChild(imgFate);
    // char voice
    let charVoice = document.createElement('audio');
    let voiceButton = document.createElement('button');
    voiceButton.setAttribute('id', 'soundtrackPlayer');
    charVoice.setAttribute('id', 'charSoundtrack');
    voiceButton.innerHTML = `<i class="fas fa-microphone"></i>`;
    charVoice.src = character.soundtrack === null ? '' : character.soundtrack;
    charSound.appendChild(voiceButton);
    charSound.appendChild(charVoice);
    voiceButton.addEventListener('click', () => {
            if (charVoice.paused) {
                charVoice.currentTime = 0;
                charVoice.play();
            } else {
                charVoice.pause();
            }
    });
    // char star
    let imgStar = document.createElement('img');
    imgStar.src = `${character.rate}`;
    imgStar.classList.add('animateInfo');
    charStar.appendChild(imgStar);
    // char story
    let charStory = document.createElement('p');
    charStory.setAttribute('id', 'char-story');
    charStory.innerHTML = `${character.description}`;
    charStory.classList.add('animateInfo');
    storyContent.appendChild(charStory);
    // char ability
    let valueArr = [valueHp, valueDef, valueAtk, valueSpd, valueTnt];
    let abilityArr = [`${character.hp}`, `${character.def}`, `${character.atk}`, `${character.spd}`, `${character.tnt}`];
    console.log(abilityArr);
    for (let i = 0; i < valueArr.length; i++) {
        valueArr[i].innerHTML = "";
        for (let j = 0; j < abilityArr.length; j++) {
            valueArr[i].innerHTML = abilityArr[i];
        }
    }
    runValue(valueHp, fillTime);
    runValue(valueDef, fillTime);
    runValue(valueAtk, fillTime);
    runValue(valueSpd, fillTime);
    runValue(valueTnt, fillTime);
}
runValue(valueHp, fillTime);
runValue(valueDef, fillTime);
runValue(valueAtk, fillTime);
runValue(valueSpd, fillTime);
runValue(valueTnt, fillTime);

function openSetting(ex){
    var userSet = document.getElementById(ex);
    var overlay = document.getElementById('overlay');
    userSet.style.display = 'block';
    overlay.style.display = 'block';
}

function exitTab(ex){
    var exit = document.getElementById(ex);
    var overlay = document.getElementById('overlay');
    exit.style.display = 'none';
    overlay.style.display = 'none';
}

function toggleMove() {
    const rotateIcon = document.getElementById('rotateIcon');
    rotateIcon.classList.toggle('clicked');
}

const updateForm = document.getElementById('updateForm');
const placeForName = document.getElementById('updateName');
const placeForEmail = document.getElementById('updateEmail');
const placeForPass = document.getElementById('updatePassword');
const accountStorage = JSON.parse(localStorage.getItem('accountStorage'));
const nameErr = document.getElementById('nameErr');
const passErr = document.getElementById('passErr');
const emailErr = document.getElementById('emailErr');
const genErr = document.getElementById('generalErr');
const accountDefine = accountStorage.find(account => account.username);
placeForName.setAttribute('placeholder', accountDefine.username);
placeForEmail.setAttribute('placeholder', accountDefine.email);
const passLength = accountDefine.password.length;
placeForPass.setAttribute('placeholder', '*'.repeat(passLength));

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }


function checkUpdateName() {
    if (placeForName.value.trim() === '') {
        return false;
    }
    if (placeForName.value.length < 4) {
        setErr(nameErr, 'Please enter at least 4 characters for your new username');
        return false;
    }
    if (placeForName.value.trim() === accountDefine.username) {
        setErr(nameErr, 'Cannot set your old username as your new username');
        return false;
    }
    nameErr.style.display = 'none';
    return true;
}

function checkUpdateMail() {
    if (placeForEmail.value.trim() === '') {
        return false;
    }
    if (!isValidEmail(placeForEmail.value.trim())) {
        setErr(emailErr, 'Please enter a valid email');
        return false;
    }
    if (placeForEmail.value.trim() === accountDefine.email) {
        setErr(emailErr, 'Cannot set your old email as your new email');
        return false;
    }

    emailErr.style.display = 'none';
    return true;
}

function checkUpdatePass() {
    if (placeForPass.value.trim() === '') {
        return false;
    }
    if (placeForPass.value.length < 6) {
        setErr(passErr, 'Please enter at least 6 characters for your new password');
        return false;
    }
    if (placeForPass.value.trim() === accountDefine.password) {
        setErr(passErr, 'Cannot set your old password as your new password')
        return false;
    }
    passErr.style.display = 'none';
    return true;
}


updateForm.addEventListener('submit', (event) => {
    event.preventDefault();
    genErr.style.display = 'none';
    if (placeForEmail.value.trim() === '' && placeForName.value.trim() === '' && placeForPass.value.trim() === '') {
        emailErr.style.display = 'none';
        nameErr.style.display = 'none';
        passErr.style.display = 'none';
        setErr(genErr, 'There are no changes or updates to be made yet. Please enter at least 1 field');
    } else {
        if (checkUpdateMail()) {
            accountDefine.email = placeForEmail.value.trim();
            placeForEmail.setAttribute('placeholder', accountDefine.email);
            placeForEmail.value = '';
            placeForName.value = '';
            placeForPass.value = '';
            setErr(genErr, 'Update successfully!');
            setTimeout(() => {
                genErr.style.display = 'none';
            }, 2000);
        }
        if (checkUpdateName()) {
            accountDefine.username = placeForName.value.trim();
            placeForName.setAttribute('placeholder', accountDefine.username);
            placeForEmail.value = '';
            placeForName.value = '';
            placeForPass.value = '';
            setErr(genErr, 'Update successfully!');
            setTimeout(() => {
                genErr.style.display = 'none';
            }, 2000);
        }
        if (checkUpdatePass()) {
            accountDefine.password = placeForPass.value.trim();
            placeForPass.setAttribute('placeholder', '*'.repeat(accountDefine.password.length));
            placeForEmail.value = '';
            placeForName.value = '';
            placeForPass.value = '';
            setErr(genErr, 'Update successfully!');
            setTimeout(() => {
                genErr.style.display = 'none';
            }, 2000);
        }
        localStorage.setItem('accountStorage', JSON.stringify(accountStorage));
    }
});

function setErr(element, note) {
    element.innerHTML = '';
    element.textContent = note;
    element.style.display = 'block';
}


    
const logoutBtn = document.getElementById('logOutBtn');
logoutBtn.addEventListener('click', () =>{
    setTimeout(() => {
        window.location.replace('../../../../index.html');
    }, 1000);
});
    
