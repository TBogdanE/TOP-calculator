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

/*
operatorBtn.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        getOperator(e.target.textContent);
    });
});
*/
operatorBtn.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        equal.disabled = false;
        if (operator !== '') {  // an operator has already been selected
            if (currentNum === '') {  // user has not yet entered a number
                operator = e.target.textContent.trim();  // update the operator variable
                displaySct2.textContent = previousNum + operator;
                return;
            }
            // calculate the result with the current operator
            calculate(previousNum, operator, currentNum);
            currentNum = result;
            result = '';
            previousNum = '';
        }
        operator = e.target.textContent.trim();
        if (currentNum == '') {  // add the option to insert negative numbers
            currentNum += operator;
            operator = '';
            displaySct2.textContent = currentNum;
        } else {
            previousNum = currentNum;
            displaySct2.textContent = previousNum + operator;
            currentNum = '';
            decimal.disabled = false;
            key.disabled = false;
        };
    });
});

/*operatorBtn.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        equal.disabled = false;
        if (operator !== '') {
            calculate(previousNum, operator, currentNum);
            currentNum = result;
            result = '';
            previousNum = '';
        }
        operator = e.target.textContent.trim();
        if (currentNum == '') {      //add the option to insert negative numbers
            currentNum += operator;
            operator = '';
            displaySct2.textContent = currentNum;
        } else {
            previousNum = currentNum;
            displaySct2.textContent = previousNum + operator;
            currentNum = '';
            decimal.disabled = false;
            key.disabled = false;
        };
    });
});
*/


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
    currentNum += '.';
    displaySct2.textContent = currentNum;
    decimal.disabled = true;
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
    if (currentNum.length >= 6) {
        key.disabled = true;
    } else if (currentNum == '0') {
        key.disabled = true;
        console.log(`check 0: ${currentNum}`)
        if (previousNum == '0') {
            key.disabled = true;
        };
    } else if (result != '') {
        clearCalculator();
        console.log('Calculator was cleared, because result != \' \' ');
    } else {
        currentNum += Number(number);
        displaySct2.textContent = previousNum + operator + currentNum;
        console.log(number);
    };
};

//setting the operators to variables
/* function getOperator(op) {
    operator = op.trim();
    if (currentNum === '') { // add the option to insert negative numbers
        currentNum += operator;
        displaySct2.textContent = currentNum;
    } else if (previousNum !== '' && operator !== '') { // perform pending calculation
        calculate(previousNum, operator, currentNum);
        previousNum = result;
        currentNum = '';
        operator = op.trim();
        displaySct2.textContent = previousNum + operator;
    } else {
        previousNum = currentNum;
        displaySct2.textContent = previousNum + operator;
        currentNum = '';
        decimal.disabled = false;
        key.disabled = false;
    }
} */


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
- dupa ce apasam egal, daca apasam un numar sa se stearga ecranul
- sa nu putem introduce 01 de ex;
*/