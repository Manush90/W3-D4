const boardSize = 76;
const numeriGiocatore = 24;
const extractedNumbers = new Set();

function populateBoard() {
  const boxTab = document.getElementById("boxTab");
  let currentNumber = 1;

  for (let i = 0; i < 8; i++) {
    const row = boxTab.insertRow();
    for (currentNumber; currentNumber <= (i + 1) * 10; currentNumber++) {
      if (currentNumber > boardSize) return;
      const cell = row.insertCell();
      cell.textContent = currentNumber;
      cell.classList.add("cell");
      cell.classList.add(getColorClass(currentNumber));
      cell.id = `cell-${currentNumber}`;
    }
  }
}

function getColorClass(number) {
  return number % 2 === 0 ? "even" : "odd";
}

function generatePlayerNumbers() {
  const playerBox = document.getElementById("player-box");
  const playerNumbersSet = new Set();

  while (playerNumbersSet.size < numeriGiocatore) {
    const randomNumber = Math.floor(Math.random() * boardSize) + 1;
    playerNumbersSet.add(randomNumber);
  }

  playerNumbersSet.forEach((number) => {
    const span = document.createElement("span");
    span.textContent = number;
    span.classList.add("cell");
    span.classList.add("player-number");
    span.classList.add(getColorClass(number));
    playerBox.appendChild(span);
  });
}

function extractNumber() {
  let extractedNumber;
  do {
    extractedNumber = Math.floor(Math.random() * 76) + 1;
  } while (extractedNumbers.has(extractedNumber));

  extractedNumbers.add(extractedNumber);
  const extractedCell = document.getElementById(`cell-${extractedNumber}`);
  if (extractedCell) {
    extractedCell.style.backgroundColor = "yellow";
  }

  const playerNumbers = document.getElementsByClassName("player-number");
  for (let i = 0; i < playerNumbers.length; i++) {
    if (playerNumbers[i].textContent === extractedNumber.toString()) {
      playerNumbers[i].style.backgroundColor = "yellow";
    }
  }
}

const extractBtn = document.getElementById("extractBtn");
extractBtn.addEventListener("click", extractNumber);

populateBoard();
generatePlayerNumbers();
