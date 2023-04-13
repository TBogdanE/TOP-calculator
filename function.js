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

equal.addEventListener('click', () => {
    console.log(`Previous number: ${previousNum}\n Current number: ${currentNum}\n Operator: ${operator}`);
    calculate(previousNum, operator, currentNum);
    console.log(`The result is: ${result}`);
    currentNum = result;
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
    previousNum = '';
    currentOp = '';
    operator = '';
    result = '';
    decimal.disabled = false;
};

//setting the nummbers to variables and print them to the screen
function getNumber(number) {
    currentNum += Number(number);
    displaySct2.textContent = previousNum + operator + currentNum;
    console.log(number);
};

//setting the operators to variables
function getOperator(op) {
    operator = op.trim();
    if (currentNum == '') {      //add the option to insert negative numbers
        currentNum += operator;
        displaySct2.textContent = currentNum;
    } else {
        previousNum = currentNum;
        displaySct2.textContent = previousNum + operator;
        currentNum = '';
        decimal.disabled = false;
    };
};

//check if user try to divide by 0
function evaluate0() {
    if (currentNum == 0 || previousNum == 0 && operator == '/') {
        displaySct2.textContent = 'You can\'t devide by 0';
        displaySct1.textContent = 'ERROR!';
        throw new Error('You can\'t divide by 0');
    };
};

//doing the operations
function calculate(num1, sign, num2) {
    try {
        evaluate0();
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
                displaySct2.textContent = 'There was a problem';
                break;
        }
        //checks if the numbers is a float, so it can print the decimals
        if (result % 1 !== 0) {
            result = result.toFixed(2);
        };
        displaySct1.textContent = displaySct2.textContent;
        displaySct2.textContent = result;
    } catch (error) {
        console.log(error.message);
        return;
    }
}

/*
- dupa ce calculez, si apas o tasta, sa se stearga tot de pe ecran sau rezultatul sa devina previous number;
- sa afiseze erori daca 0/0
- daca am apasat semnul unei operatii, iar apoi noi schimbam semnul
*/