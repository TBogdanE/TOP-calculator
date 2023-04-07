let displaySct1 = document.querySelector('#calculator-display-section-1');
let displaySct2 = document.querySelector('#calculator-display-section-2');
let key = document.querySelectorAll('.number');
let operatorBtn = document.querySelectorAll('.operator');
const equal = document.querySelector('#equal');
const decimal = document.querySelector('#decimal');
const clear = document.querySelector('#clear');
let currentNum = '';
let currentOp = '';
let previousNum = '';
let operator = '';
let result = 0;

clear.addEventListener('click', () => {
    currentNum = '';
    displaySct1.textContent = '';
    displaySct2.textContent = '';
    previousNum = '';
    currentOp = '';
    operator = '';
});

key.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        getNumber(e.target.textContent);
    });
});

function getNumber(number) {
    currentNum += number;
    displaySct2.textContent = previousNum + operator + currentNum;
    console.log(number);
};

operatorBtn.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        getOperator(e.target.textContent);
    });
});

function getOperator(op) {
    operator = op;
    previousNum = currentNum;
    displaySct2.textContent = previousNum + operator;
    currentNum = '';
};

function calculate(num1, sign, num2) {
    num1 = Number(num1);
    num2 = Number(num2);
    if (sign == '+') {
        console.log('merge');
    } else {
        console.log(`nu merge ${sign}`);
    };
    /*switch (sign) {
        case '+':
            result = num1 + num2;
            console.log(result);
            break;
            case '-': 
            result = num1 - num2;
            console.log(result);
            break;
        default:
            console.log('Error: operator not declared');
            break;
    }*/

};

equal.addEventListener('click', () => {
    console.log(`Previous number: ${previousNum}\n Current number: ${currentNum}\n Operator: ${operator}`);
    calculate(previousNum, operator, currentNum);
});