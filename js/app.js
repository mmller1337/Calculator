//Setting the start screen and generate Calculator
const calculator = {
    displayValue : "0", // String Value des User inputs
    firstOperand : null, //Erste eingegebene Zahl des Users
    waitingForSecondOperand: false, //Checkt ob ein Ergebnis ausgegeben werden kann oder ein zweiter Operand folgt
    operator : null, // Operator vom Nutzer angeklickt
};
function inputDigit(digit){
    const {displayValue, waitingForSecondOperand} = calculator;
    //ist der Wert default 0 , ersetze den Displayvalue mit dem eingegebenen digitwert
    if(waitingForSecondOperand === true || calculator.displayValue === "0"){
        calculator.displayValue = digit;
        calculator.waitingForSecondOperand = false;
    } else {
        // Ist der Wert nicht mehr 0, konkatiniere vorherigen wert mit geklicktem digit
        calculator.displayValue = displayValue + digit;
    }
    console.log(calculator);
}
function inputDecimal(dot){
    if(!calculator.displayValue.includes(dot)){
        calculator.displayValue += dot;
    }
    console.log(calculator);
}

function handleOperator(nextOperator){
    const {firstOperand, displayValue, operator} = calculator;
    //Zwischenspeichern des Userinputs in Inputvalue, wenn firstoperand nicht bereits exisitert
    const inputValue = parseFloat(displayValue);

    if(operator && calculator.waitingForSecondOperand){
        calculator.operator = nextOperator;
        console.log(calculator)
        return;
    }
    if(firstOperand === null){
        calculator.firstOperand = inputValue;
    } else if(operator){ //checkt op ein operator exisitert
        const currentValue = firstOperand || 0;
        //Im performcalculation object wird nach passender funktion gesucht und ausgeführt
        const result = performCalculation[operator](firstOperand, inputValue);
        // User wird das Ergebnis angezeigt
        calculator.displayValue = String(result);
        //Ergebnis wird neuer erster Operand
        calculator.firstOperand = result;
    }
    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;
    console.log(calculator);
}
const performCalculation = {
    '/': (firstOperand, secondOperand) => firstOperand / secondOperand,
  
    '*': (firstOperand, secondOperand) => firstOperand * secondOperand,
  
    '+': (firstOperand, secondOperand) => firstOperand + secondOperand,
  
    '-': (firstOperand, secondOperand) => firstOperand - secondOperand,
  
    '=': (firstOperand, secondOperand) => secondOperand
  };

//Update the Screen with user input
function resetCalculator(){
    calculator.displayValue = "0";
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
    console.log(calculator);
}

function updateDisplay(){
    const display = document.querySelector(".calculator-screen");
    display.value = calculator.displayValue; // Setzt den Wert zu beginn auf 0
}
updateDisplay();

const tasten = document.querySelector(".calculator-keys");
tasten.addEventListener("click", (event) =>{
    const target = event.target; //repräsentiert das das Element, dass geklickt wurde
    // Wenn das Element, welches geklickt wurde,kein button ist.Exit function
    if(!target.matches("button")){
        return;
    }
    if(target.classList.contains("operator")){
        handleOperator(target.value);
        updateDisplay();
        return; //sorgt dafür das der Operator nicht im Displayvalue vorkommt
    }
    if (target.classList.contains("decimal")) {
        inputDecimal(target.value);
        updateDisplay();
        return;
      }
    
      if (target.classList.contains("all-clear")) {
        resetCalculator();
        updateDisplay();
        return;
      }
    
      inputDigit(target.value);
      updateDisplay();
      return;

});


//Calculate
