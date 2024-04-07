// 1. Depot some money
// 2. Determine number of lines to bet on
// 3. Collect bet amount
// 4. Spin slot maschine
// 5. Check if user won
// 6. Give winning amount
// 7. Play again

const ROWS = 3;
const COLS = 3;


// Slot maschine
const SYMBOLS_COUNT = {
    "A": 2,
    "B": 4,
    "C": 6,
    "D": 8
};

const SYMBOLS_VALUE = {
    "A": 7,
    "B": 5,
    "C": 3,
    "D": 2
};

const spin = () => {
    const symbols = [];
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)){
        for (let i = 0; i < count; i++) {
            symbols.push(symbol);
        }
    }
};

// Node module to get user input
const prompt = require("prompt-sync")();

// get user input
const deposit = () => {
  while (true) {
    const depositAmount = prompt("Enter a deposit: ");
    const userDeposit = parseFloat(depositAmount);

    // Check if input was valid
    if (isNaN(userDeposit) || userDeposit <= 0) {
      prompt("Not a valid input, please type a number");
    } else {
        return userDeposit;
    }
  }
};

let balance = deposit();

const getNumberOfLinesToBetOn = () => {
    while (true) {
        const lines = prompt("Enter the number of lines to bet on (1-3): ")
        const numberOfLines = parseInt(lines);
        
        // Check if input was valid
        if (isNaN(numberOfLines) || numberOfLines < 1 || numberOfLines > 3) {
          prompt("Not a valid input, please type a number between 1 and 3");
        } else {
            return numberOfLines;
        }
      }
};

const numberOfLines = getNumberOfLinesToBetOn();

const getBet = (balance, lines) => {
    while (true) {
        const bet = prompt("Enter your bet: ")
        const betAmount = parseFloat(bet);
        
        // Check if input was valid
        if (isNaN(betAmount) || betAmount <= 0) {
          prompt("Not a valid input, please type a number.");
        } else if(betAmount > balance / lines) {
            prompt("Bet cannot be higher than your balance.");
        } else {
            return betAmount;
        }
      }
};

const bet = getBet(balance, numberOfLines);