let value = '';
let gameStarted = false;
let correctAnswer = '';
let score = 0;

document.addEventListener('keyup', function (e) {
  if (!gameStarted) {
    reset();
    gameStarted = true;
    document.querySelector('h3').style.color = 'blue';
    document.querySelector('h3').textContent = 'Score ' + score;
    document.querySelector('#userInput').select();
    generateSum();
  } else if (gameStarted) {
    if (e.key === 'Enter') {
      value = parseInt(document.querySelector('input').value);

      // console.log(correctAnswer, value);
      checkAnswer(correctAnswer, value);
    }
  }
});

//check answer
function checkAnswer(answer, userInput) {
  //add correct or wrong class && call play sound function increment score
  const border = document.querySelector('.container');
  const title = document.querySelector('h3');
  if (userInput === answer) {
    playSound('correct');
    border.classList.add('correct');

    setTimeout(function () {
      border.classList.remove('correct');
    }, 300);
    score += 1;

    title.textContent = 'Score ' + score;
    document.getElementById('userInput').value = '';
    generateSum();
  } else if (userInput !== answer) {
    playSound('wrong');
    border.classList.add('wrong');
    gameStarted = false;

    title.style.color = 'red';
    title.textContent =
      'Game over, Score ' + score + ' Press any key to play again!';
  }
}

//play sound perhaps
function playSound(soundSelector) {
  const audio = new Audio('sounds/' + soundSelector + '.mp3');
  audio.play();
}

function generateSum() {
  const operator = ['+', '-', '/', 'x'];
  let operatorType = operator[randomNumber(4) - 1];
  const number1 = randomNumber(12);
  const number2 = randomNumber(12);
  document.getElementById('userInput').focus();

  if (operatorType === '/' && number1 % number2 !== 0) {
    operatorType = operator[3];
  }
  // console.log(operatorType, number1, number2);

  document.getElementById('num1').textContent = number1;
  document.getElementById('operator').textContent = operatorType;
  document.getElementById('num2').textContent = number2;

  correctAnswer = calculateSum(number1, number2, operatorType);

  document.getElementById('userInput').value = '';
}

function randomNumber(Num) {
  return Math.floor(Math.random() * Num) + 1;
}

function calculateSum(num1, num2, operator) {
  switch (operator) {
    case '+':
      return num1 + num2;
    case '-':
      return num1 - num2;
    case '/':
      return num1 / num2;
    case 'x':
      return num1 * num2;
    default:
      return 'calculation error!';
  }
}

function reset() {
  score = 0;
  document.getElementById('userInput').value = '';
  document.querySelector('h3').style.color = 'red';
  document.querySelector('.container').classList.remove('wrong');
}
