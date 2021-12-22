const resultEl = document.getElementById('result')
const lengthEl = document.getElementById('length')
const uppercaseEl = document.getElementById('uppercase')
const lowercaseEl = document.getElementById('lowercase')
const numbersEl = document.getElementById('numbers')
const symbolsEl = document.getElementById('symbols')
const generateEl = document.getElementById('generate')
const clipboardEl = document.getElementById('clipboard')
const snackBar = document.getElementById('snackbar')
const reset = document.getElementById('reset')

const randomFunction = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
};

clipboardEl.addEventListener('click', async () => {
    const password = resultEl.innerText
    if (password && password.length <= 20 && password.length >= 6) {
        await navigator.clipboard.writeText(resultEl.innerText)
        snackBar.innerText = "Password copied to clipboard!"
        snackBar.style.color = '#25D366'
        showSnackBar()

    } else if (resultEl.innerText.includes(' ')) {
        snackBar.innerText = "This Is Not A Generated Password"
        snackBar.style.color = '#FF0000'
        showSnackBar()

    } else if (resultEl.innerText.length <= 5 || resultEl.innerText.length > 0 && resultEl.innerText.length > 20) {
        snackBar.innerText = "Password Must Be Between 6-20 Characters"
        snackBar.style.color = '#FF0000'
        showSnackBar()

    } else {
        snackBar.innerText = "Please Generate Password First"
        snackBar.style.color = '#FF0000'
        showSnackBar()

    }
});

function showSnackBar() {
    snackBar.className = 'show'
    setTimeout(function () {
        snackBar.className = snackBar.className.replace("show", "")
    }, 3000);
};



generateEl.addEventListener('click', () => {
    // adding "+" parse the value into number => console.log(typeof length);
    const length = +lengthEl.value
    const hasLower = lowercaseEl.checked
    const hasUpper = uppercaseEl.checked
    const hasNumber = numbersEl.checked
    const hasSymbol = symbolsEl.checked

    resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length)
});

function generatePassword(lower, upper, number, symbol, length) {
    let generatedPassword = ''
    const typesCount = lower + upper + number + symbol
    const typesArr = [{
        lower
    }, {
        upper
    }, {
        number
    }, {
        symbol
    }].filter(item => Object.values(item)[0])

    if (typesCount === 0) {
        return 'Must Check Atleast 1 Box'
    }

    for (let i = 0; i < length; i += typesCount) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0]
            generatedPassword += randomFunction[funcName]()
        })
    }

    const finalPassword = generatedPassword.slice(0, length)
    return finalPassword
};

function getRandomLower() {
    // https://www.w3schools.com/charsets/ref_html_ascii.asp
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
};

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
};

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
};

function getRandomSymbol() {
    const symbols = '!@#$%^&*?'
    return symbols[Math.floor(Math.random() * symbols.length)]
};

const checkBoxs = [lowercaseEl, uppercaseEl, numbersEl, symbolsEl]

reset.addEventListener('click', () => {
    resultEl.innerText = ''
    checkBoxs.forEach(checkBox => checkBox.checked = false)
    lengthEl.value = 10

    snackBar.innerText = "Everything Was Reset"
    snackBar.style.color = 'yellow'
    showSnackBar()
})