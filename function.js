//getting the DOM elements
let displaySct1 = document.querySelector('#calculator-display-section-1');
let displaySct2 = document.querySelector('#calculator-display-section-2');
let key = document.querySelectorAll('.number');
let operatorBtn = document.querySelectorAll('.operator');
const equal = document.querySelector('#equal');
const decimal = document.querySelector('#decimal');
const clear = document.querySelector('#clear');

//initialize variables
let currentNum = '';
let currentOp = '';
let previousNum = '';
let operator = '';
let result = '';


//EVENT LISTENERS

clear.addEventListener('click', clearCalculator);
decimal.addEventListener('click', addDecimal);
equal.addEventListener('click', calculate);

//getting number values from the keyboard
key.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        getNumber(e.target.textContent);
    });
});

//getting the operator btn
operatorBtn.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        equal.disabled = false;
        //this block of code is used so we can change our operator if we chosed a wrong one
        if (operator !== '') {  // checks if an operator has already been selected
            if (currentNum === '') {  //checks if user has not yet entered the second number
                operator = e.target.textContent.trim();  // update the operator variable
                displaySct2.textContent = previousNum + operator;
                return;
            }
            calculate(previousNum, operator, currentNum);
            currentNum = result;
            result = '';
            previousNum = '';
        }
        operator = e.target.textContent.trim();
        //this block checks if instead of selecting a number firstly
        //we select an operator, so we can introduce negative numbers
        if (currentNum == '' && previousNum == '') {  // add the option to insert negative numbers, others operator used will not work
            if (operator == '-') {
                currentNum += operator;
                operator = '';
                displaySct2.textContent = currentNum;
            } else {
                operator = '';
            }
        } else {
            //this block just do the calculations 
            //if no condition was meet 
            previousNum = currentNum;
            displaySct2.textContent = previousNum + operator;
            currentNum = '';
            decimal.disabled = false;
            key.disabled = false;
        };
    });
});

//on equal button press, will execute calculate funtion, and console.log provided info
equal.addEventListener('click', () => {
    operator = operator.trim();
    if (currentNum == '' && operator == '' && previousNum == '') {
        displaySct1.textContent = 'ERROR!';
        console.log('Error');
        changeDS2FontSize('small');
        displaySct2.textContent = 'Nothing to calculate';
    } else if (/*previousNum == '' ||*/ operator != '' && currentNum == '') {
        clearCalculator();
        displaySct1.textContent = 'ERROR!';
        console.log('Error');
        changeDS2FontSize('small');
        displaySct2.textContent = 'You didn\'t add the second number';
    } else {
        console.log(`Previous number: ${previousNum}\n Current number: ${currentNum}\n Operator: ${operator}`);
        calculate(previousNum, operator, currentNum);
        console.log(`The result is: ${result}`);
        currentNum = result;
        operator = '';
        previousNum = '';
        equal.disabled = true;
    };
});


//FUNCTIONS

//adding event to the decimal button and set it to disable after 
//pressing it once, so you can't add more than one decimal per number

function addDecimal() {
    if (currentNum == '') {
        decimal.disabled = true;
    } else {
        currentNum += '.';
        displaySct2.textContent = currentNum;
        decimal.disabled = true;
    };
};

//clear the display when clicking 'C' button
function clearCalculator() {
    currentNum = '';
    displaySct1.textContent = '';
    displaySct2.textContent = '';
    changeDS2FontSize('big');
    previousNum = '';
    currentOp = '';
    operator = '';
    result = '';
    decimal.disabled = false;
    equal.disabled = false;
};

//setting the nummbers to variables and print them to the screen
function getNumber(number) {
    decimal.disabled = false;
    if (currentNum.length >= 6) {
        key.disabled = true;
    } else if (currentNum == '0') {
        key.disabled = true;
        console.log(`check 0: ${currentNum}`)
        if (previousNum == '0') {
            key.disabled = true;
        };
        //if we press equal and we have a result displayed, if we press another number it will clear the calculator
    } else if (result != '' && operator == '') {
        clearCalculator();
        currentNum = number;
        displaySct2.textContent = currentNum;
        console.log('Calculator was cleared, because result has value and key was pressed');
    } else {
        currentNum += Number(number);
        displaySct2.textContent = previousNum + operator + currentNum;
        console.log(number);
    };
};

// if calculator wants to prin error, this function will
//make the font size smaller, so the text will fit the display
function changeDS2FontSize(size) {
    switch (size) {
        case 'big':
            displaySct2.style.fontSize = '2em';
            break;
        case 'small':
            displaySct2.style.fontSize = '1.2em';
            break;
        default:
            displaySct2.style.fontSize = '2em';
            break;

    }
}

//check if user try to divide by 0
function evaluateCalculator() {
    if (currentNum == '0' && operator == '/' || previousNum == '0' && operator == '/') {
        displaySct1.textContent = 'ERROR!';
        console.log('Error');
        changeDS2FontSize('small');
        displaySct2.textContent = 'You can\'t divide a number by 0';
    };
};

//doing the operations
function calculate(num1, sign, num2) {
    evaluateCalculator();
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
    switch (sign) {
        case '+':
            result = (num1 + num2);
            break;
        case '-':
            result = (num1 - num2);
            break;
        case 'x':
            result = (num1 * num2);
            break;
        case '/':
            result = (num1 / num2);
            break;
        case '%':
            result = (num1 % num2);
            break;
        default:
            changeDS2FontSize('small');
            displaySct2.textContent = 'There was a problem';
            break;
    }
    changeDS2FontSize('big');
    if (result.toString().length > 10) {        //checks the length of the result
        result = result.toFixed(10);
        changeDS2FontSize('small');
        displaySct2.textContent = result;
        /*clearCalculator();
        displaySct1.textContent = 'ERROR!';
        changeDS2FontSize('small');
        displaySct2.textContent = 'Number is too big';*/
    } else if (result % 1 !== 0) {         //checks if the numbers is a float, so it can print the decimals
        result = result.toFixed(2);
        displaySct2.textContent = result;
        console.log(result);
    } else {
        //displaySct1.textContent = displaySct2.textContent;
        displaySct2.textContent = result;
    }
    key.disabled = false; //in caz de apare bug, aici era true inainte
}

/*
DONE: - dupa ce calculez, si apas o tasta, sa se stearga tot de pe ecran sau rezultatul sa devina previous number;
DONE: - sa afiseze erori daca 0/0
DONE - daca am apasat semnul unei operatii, iar apoi noi schimbam semnul
DONE - dupa ce apasam egal, daca apasam un numar sa se stearga ecranul
DONE - sa nu putem introduce 01 de ex;
DONE- sa nu putem introduce virgula daca nu avem numar
DONE - sa nu putem introduce alt operator decat minus inainte de a introduce primul nr
*/