// Initial Message
console.log("Halo, Selamat datang. SIlahkan anda gunakan kalkulator ini :D.");

const calc = {
    textDisplay: "0",
    operator: "",
    firstOperand: 0,
    secondOperand: 0,
    isSecondOperand: false,
    isLastEqual: false,
};

buttons = document.querySelectorAll(".button");
buttons.forEach((button) => {
    button.addEventListener("click", clickButton);
});

function resetCalc() {
    calc.textDisplay = "0";
    calc.operator = "";
    calc.firstOperand = 0;
    calc.secondOperand = 0;
    calc.isLastEqual = false;
    calc.isSecondOperand = false;
}

function calculate() {
    if (calc.operator === "+") {
        return calc.firstOperand + calc.secondOperand;
    } else {
        return calc.firstOperand - calc.secondOperand;
    }
}

function saveState() {
    const result = calculate();
    addRecord({
        firstOperand: calc.firstOperand,
        secondOperand: calc.secondOperand,
        operator: calc.operator,
        result: result,
    });
}

function negative() {
    if (calc.isLastEqual) {
        result = calculate();
        resetCalc();
        calc.firstOperand = result;
    }

    if (calc.isSecondOperand) {
        calc.secondOperand *= -1;
        calc.textDisplay = String(calc.secondOperand);
    } else {
        calc.firstOperand *= -1;
        calc.textDisplay = String(calc.firstOperand);
    }
}

function operator(opElmt) {
    if (calc.isSecondOperand) {
        result = calculate();
        calc.textDisplay = String(result);

        if (!calc.isLastEqual) {
            saveState();
        }

        calc.firstOperand = result;
        calc.secondOperand = 0;
    }

    calc.operator = opElmt.innerText;
    calc.isSecondOperand = true;
}

function clear() {
    if (calc.isLastEqual) {
        resetCalc();
    } else {
        if (calc.isSecondOperand) {
            calc.secondOperand = 0;
        } else {
            calc.firstOperand = 0;
        }
    }
    calc.textDisplay = "0";
}

function equal() {
    result = calculate();
    calc.textDisplay = String(result);
    saveState();
}

function updateDisplay() {
    let display = document.querySelector("#displayNumber");
    display.innerText = calc.textDisplay;
}

function inputNumber(buttonELmt) {
    let num = parseInt(buttonELmt.innerText);

    if (calc.isSecondOperand) {
        calc.secondOperand *= 10;
        calc.secondOperand += num;
        calc.textDisplay = String(calc.secondOperand);
    } else {
        calc.firstOperand *= 10;
        calc.firstOperand += num;
        calc.textDisplay = String(calc.firstOperand);
    }
}

function clickButton() {
    if (this.classList.contains("negative")) {
        negative();
        calc.isLastEqual = false;
    } else if (this.classList.contains("operator")) {
        operator(this);
        calc.isLastEqual = false;
    } else if (this.classList.contains("clear")) {
        clear();
        calc.isLastEqual = false;
    } else if (this.classList.contains("equals")) {
        equal();
        calc.isLastEqual = true;
    } else {
        if (calc.isLastEqual) {
            resetCalc();
            updateDisplay();
        }

        inputNumber(this);
        calc.isLastEqual = false;
    }

    updateDisplay();
}
