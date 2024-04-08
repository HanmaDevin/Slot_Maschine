// 1. Depot some money
// 2. Determine number of lines to bet on
// 3. Collect bet amount
// 4. Spin slot maschine
// 5. Check if user won
// 6. Give winning amount
// 7. Play again

const ROWS = 3;
const COLS = 3;

// Node module to get user input
const prompt = require("prompt-sync")();

// Slot maschine
const SYMBOLS_COUNT = {
  A: 3,
  B: 4,
  C: 6,
  D: 8,
};

const SYMBOLS_VALUE = {
  A: 7,
  B: 5,
  C: 3,
  D: 2,
};

const spin = () => {
  const symbols = [];
  for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
    for (let i = 0; i < count; i++) {
      symbols.push(symbol);
    }
  }

  const maschine = [];
  for (let i = 0; i < COLS; i++) {
    maschine.push([]);
    const maschineSymbols = [...symbols]; // copy symbols from 'symbols' array
    for (let j = 0; j < ROWS; j++) {
      const randomIndex = Math.floor(Math.random() * maschineSymbols.length);
      const selectedSymbol = maschineSymbols[randomIndex];
      maschine[i].push(selectedSymbol);
      maschineSymbols.splice(randomIndex, 1);
    }
  }

  return maschine;
};

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

const getNumberOfLinesToBetOn = () => {
  while (true) {
    const lines = prompt("Enter the number of lines to bet on (1-3): ");
    const numberOfLines = parseInt(lines);

    // Check if input was valid
    if (isNaN(numberOfLines) || numberOfLines < 1 || numberOfLines > 3) {
      prompt("Not a valid input, please type a number between 1 and 3");
    } else {
      return numberOfLines;
    }
  }
};

const transpose = (maschine) => {
  const transposed = [];

  for (let i = 0; i < ROWS; i++) {
    transposed.push([]);
    for (let j = 0; j < COLS; j++) {
      transposed[i].push(maschine[j][i]);
    }
  }

  return transposed;
};

const printSpin = (maschine) => {
  console.log("Your Spin: ");
  for (const row of maschine) {
    let rowString = "";
    for (const [i, symbol] of row.entries()) {
      rowString += symbol;
      if (i != row.length - 1) {
        rowString += " | ";
      }
    }
    console.log(rowString);
  }
};

const getWinningAmount = (rows, bet, lines) => {
  let winnings = 0;

  for (let row = 0; row < lines; row++) {
    const symbols = rows[row];
    let allSame = true;

    for (const symbol of symbols) {
      if (symbol != symbols[0]) {
        allSame = false;
        break;
      }
    }

    if (allSame) {
      winnings += bet * SYMBOLS_VALUE[symbols[0]];
    }
  }

  return winnings;
};

const getBet = (balance, lines) => {
  while (true) {
    const bet = prompt("Enter your bet: ");
    const betAmount = parseFloat(bet);

    // Check if input was valid
    if (isNaN(betAmount) || betAmount <= 0) {
      prompt("Not a valid input, please type a number.");
    } else if (betAmount > balance / lines) {
      prompt("Bet cannot be higher than your balance.");
    } else {
      return betAmount;
    }
  }
};

const game = () => {
  let balance = deposit();
  while (balance > 0) {
    console.log("Yor balance is $" + balance);
    const numberOfLines = getNumberOfLinesToBetOn();
    const bet = getBet(balance, numberOfLines);
    balance = balance - bet * numberOfLines;
    const maschine = spin();
    const transposed = transpose(maschine);
    printSpin(maschine);
    const winnings = getWinningAmount(maschine, bet, numberOfLines);
    balance = balance + winnings;
    console.log("You won, $" + winnings.toString());

    const playAgain = prompt("Do you want to play again (y/n)? ");

    if(playAgain == "n" || playAgain == "N"){
      break;
    }
  }
};

game();