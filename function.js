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
        getOperator(e.target.textContent);
    });
});


//gets keybord input
document.addEventListener('keydown', function (event) {
    switch (event.key) {
        case '1': getNumber(1);
            break;
        case '2': getNumber(2);
            break;
        case '3': getNumber(3);
            break;
        case '4': getNumber(4);
            break;
        case '5': getNumber(5);
            break;
        case '6': getNumber(6);
            break;
        case '7': getNumber(7);
            break;
        case '8': getNumber(8);
            break;
        case '9': getNumber(9);
            break;
        case '0': getNumber(0);
            break;
        case '+': getOperator('+');
            break;
        case '-': getOperator('-');
            break;
        case '*': getOperator('x');
            break;
        case '/': getOperator('/');
            break;
        case '%': getOperator('%');
            break;
        case '.': addDecimal();
            break;
        case 'Enter': calculate(previousNum, operator, currentNum);
            break;
        case '=': calculate(previousNum, operator, currentNum);
            break;
        case 'c': clearCalculator();
            break;
        default:
            console.log('You can\'t add this to the calculator');
    };
});



//on equal button press, will execute calculate funtion, and console.log provided info
equal.addEventListener('click', () => {
    operator = operator.trim();
    //checks if we have entered the numbers and the operator
    if (currentNum == '' && operator == '' && previousNum == '') {
        displaySct1.textContent = 'ERROR!';
        console.log('Error');
        changeDS2FontSize('small');
        displaySct2.textContent = 'Nothing to calculate';
        //checks if we want to calculate withouut inserting the second number
    } else if (operator != '' && currentNum == '') {
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



//FUNCTIONS ************************************************************



//setting the nummbers to variables and print them to the screen
function getNumber(number) {
    displaySct1.textContent = ''; //clears the dirst sct of the display, in case it remeaned an error message
    changeDS2FontSize('big');
    if (currentNum.length >= 6) { //checks if the number is too long
        key.disabled = true;
    } else if (currentNum == '0') {// checks if the number is 0, so it won't let user input another number along 0
        key.disabled = true;
        // checks if user tries to add number when calculator is displaying 
        //the result, and it's clearing the calculator for the next operation
    } else if (result !== '' && operator == '') {
        clearCalculator();
        currentNum = number;
        displaySct2.textContent = currentNum;
    } else {
        currentNum += Number(number);
        displaySct2.textContent = previousNum + operator + currentNum;
        console.log(number);
    };
};



//getting operators
function getOperator(op) {
    equal.disabled = false;
    //this block of code is used so we can change our operator if we chosed a wrong one
    if (operator !== '') {  // checks if an operator has already been selected
        if (currentNum === '') {  //checks if user has not yet entered the second number
            operator = op.trim();  // update the operator variable
            displaySct2.textContent = previousNum + operator;
            return;
        }
        calculate(previousNum, operator, currentNum);
        currentNum = result;
        result = '';
        previousNum = '';
    }
    operator = op.trim();
    //this block checks if instead of selecting a number firstly
    //we select an operator, so we can introduce negative numbers
    if (currentNum == '' && previousNum == '') { 
        if (operator == '-') { // add the option to insert only minus operator, other operators used will not work
            currentNum += operator;
            operator = '';
            displaySct2.textContent = currentNum;
        } else {
            operator = ''; //if user inputs any other operator than minus, it will not be added
        }
    } else {
        previousNum = currentNum;
        displaySct2.textContent = previousNum + operator;
        currentNum = '';
        decimal.disabled = false;
        key.disabled = false;
    };
};



//decimal function
function addDecimal() {
    //won't let user input decimal if no number was inserted firstly
    if (currentNum == '') {
        decimal.disabled = true;
    } else if (decimal.disabled == true) {
        return;
    } else {
        //adding event to the decimal button and make it disable after 
        //pressing it once, so you can't add more than one decimal
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



//doing the operations
function calculate(num1, sign, num2) {
    if (evaluateCalculator()) {
        return;
    };
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
    if (result % 1 !== 0) {         //checks if the numbers is a float, so it can print only 2 decimals
        result = result.toFixed(2);
        displaySct2.textContent = result;
        console.log(`2) float: ${result}`);
    } else {
        //checks the length of the result, so it can make the font 
        //smaller for numbers to fit on the screen
        if (result.toString().length > 10) {        
            result = result.toFixed(10);
            changeDS2FontSize('small');
            displaySct2.textContent = result;
            console.log(`1) string10: ${result}`);
        } else {
            //displaySct1.textContent = displaySct2.textContent;
            displaySct2.textContent = result;
            console.log(`3) no condition met: ${result}`);
        };
    };
    key.disabled = false; 
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
    };
};



//check if user try to divide by 0
function evaluateCalculator() {
    if (currentNum == '0' && operator == '/' || previousNum == '0' && operator == '/') {
        displaySct1.textContent = 'ERROR!';
        console.log('Error');
        changeDS2FontSize('small');
        displaySct2.textContent = 'You can\'t divide a number by 0';
        return true;
    };
    return false;
};

/*
DONE: - dupa ce calculez, si apas o tasta, sa se stearga tot de pe ecran sau rezultatul sa devina previous number;
DONE: - sa afiseze erori daca 0/0
DONE - daca am apasat semnul unei operatii, iar apoi noi schimbam semnul
DONE - dupa ce apasam egal, daca apasam un numar sa se stearga ecranul
DONE - sa nu putem introduce 01 de ex;
DONE- sa nu putem introduce virgula daca nu avem numar
DONE - sa nu putem introduce alt operator decat minus inainte de a introduce primul nr
DONE - adaugare suport tastatura
*/