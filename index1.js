const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNum]");
const passwordDsiplay = document.querySelector("[data-passwordDsiplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numberCheck = document.querySelector("#numbers");
const symbolCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = '~!@#$%^&*()=+-`_{}[]?/"<.>;|';


let password = "";
let passwordLength = 10;

// set strength circle color to grey

handelSlider();
// set passwordLength

function handelSlider() {
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;

}

function setIndicator(color) {
    indicator.style.backgroundColor = color;
    // add shadow

}

function getRdmInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;

}

function generateNumber() {
    return getRdmInteger(0, 9);
}

function generateUpperrCase() {
    return String.fromCharCode(getRdmInteger(65, 91));
}

function generateLowerCase() {
    return String.fromCharCode(getRdmInteger(97, 123));
}

function generateSymbol() {
    const rndNum = getRdmInteger(0, symbols.length);
    return symbols.charAt(rndNum);
}

function calcStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasSymb = false;
    let hasNum = false;

    if (uppercaseCheck.Checked) hasUpper = true;
    if (lowercaseCheck.Checked) hasLower = true;
    if (symbolCheck.Checked) hasSymb = true;
    if (numberCheck.Checked) hasNum = true;


    if (hasUpper && hasLower && (hasNum || hasSymb) && passwordLength >= 8) {
        setIndicator("#0f0");
    }
    else if ((hasUpper || hasLower) && (hasNum || hasSymb) && passwordLength >= 6) {
        setIndicator("#ff0");
    }
    else {
        setIndicator("#f00");
    }
}


// copy krne wala
async function copyContent() {

    try {
        await navigator.clipboard.writeText(passwordDsiplay.value);
        copyMsg.innerText = 'Copied';
    }
    catch (e) {
        copyMsg.innerText = 'Failed';
    }
    // to make copy span visible
    copyMsg.classList.add("active");

    setTimeout(() => {
        copyMsg.classList.remove("active")
    }, 2000);
}
function shufflePassword(array) {
    // fisher yates method

    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}


function handelCheckBox() {
    checkCount = 0;
    allCheckBox.forEach((checkbox) => {
        if (checkbox.Checked) {
            checkCount++;
        }
    });
    if (passwordLength < checkCount) {
        passwordLength = checkCount;
        handelSlider();
    }
}

allCheckBox.forEach((checkbox) => {
    checkbox.addEventListener('change', handelCheckBox);
})

inputSlider.addEventListener('input', (e) => {
    passwordLength = e.target.value;
    handelSlider();
})

copyBtn.addEventListener('click', () => {
    if (passwordDsiplay.value) {
        copyContent();
    }
})

generateBtn.addEventListener('click', () => {
    // none of the checkbox is checked
    if (checkCount <= 0) return;

    // password length less than check count
    if (passwordLength < checkCount) {
        passwordLength = checkCount;
        handelSlider();
    }

    // finding new password
    console.log('starting the journey')
    // remove old password
    password = "";

    // let's put the stuff mentioned by checkboxes

    let funArr = [];
    if (uppercaseCheck.Checked) {
        funArr.push(generateUpperrCase());
    }

    if (lowercaseCheck.Checked) {
        funArr.push(generateLowerCase());
    }
    if (numberCheck.Checked) {
        funArr.push(generateNumber());
    }
    if (symbolCheck.Checked) {
        funArr.push(generateSymbol());
    }

    // compulsory addition
    for (let i = 0; i < funArr.length; i++) {
        password += funArr[i]();
    }
    console.log('compulsory addition done')
    // remaining addition
    for (let i = 0; i < passwordLength - funArr.length; i++) {

        let rndmIndex = getRdmInteger(0, funArr.length);
        password += funArr[rndmIndex]();
    }
    console.log('remaining addition done')
    // shuffle the password
    password = shufflePassword(Array.from(password));
    console.log('shuffling done')
    // show in UI
    passwordDsiplay.value = password;
    console.log('UI addition done')
    // calculate strength
    calcStrength();
})
generateButton.addEventListener('click', generatePassword);