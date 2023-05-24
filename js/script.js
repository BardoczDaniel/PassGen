'use strict'
// Dom elements
const lengthEl = document.querySelector('.length');

const resultEl = document.querySelector('.result');
const slider = document.querySelector('.slider');
const uppercaseEl = document.querySelector('#uppercase');
const lowercaseEl = document.querySelector('#lowercase');
const numbersEl = document.querySelector('#numbers');
const symbolEl = document.querySelector('#symbols');
const btnEl = document.querySelector('.btn');
const clipboardEl = document.querySelector('.input-icon');



const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
};


// Generate event 

btnEl.addEventListener('click', () => {

    const length = +slider.value;

    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolEl.checked;



    resultEl.value = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);

});




// Generate password function

const generatePassword = function (lower, upper, number, symbol, length) {



    let generatedPassword = '';

    const typesCount = lower + upper + number + symbol;
    // console.log(typesCount);

    const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(

        item => Object.values(item)[0]

    );

    // console.log(typesArr);

    if (typesCount === 0) {
        return '';
    };

    for (let i = 0; i < length; i += typesCount) {

        typesArr.forEach(type => {

            const funcName = Object.keys(type)[0];

            generatedPassword += randomFunc[funcName]();
        });

    };

    const finalPass = generatedPassword.slice(0, length);

    return finalPass;
};


// Copy password to clipboard 

clipboardEl.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    const password = resultEl.value;

    if (!password) return;

    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
})



// Update slider number

slider.addEventListener('change', function (e) {

    const lengthNumber = this.value;

    lengthEl.textContent = lengthNumber;

});

// Generator functions

function getRandomLower() {

    return (String.fromCharCode(Math.floor(Math.random() * 26) + 97));

};

function getRandomUpper() {

    return (String.fromCharCode(Math.floor(Math.random() * 26) + 65));
};


function getRandomNumber() {

    return (String.fromCharCode(Math.floor(Math.random() * 10) + 48));
};


function getRandomSymbol() {
    const symbol = "!@#$^&*(){}[]=<>/,.";

    return symbol[Math.floor(Math.random() * symbol.length)];
};

