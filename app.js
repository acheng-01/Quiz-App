'use strict';

const store = {
  // 5 or more questions are required
  questions: [
    {
      question: 'The Wankel engine is also known as...',
      answers: [
        'the inline 6 engine',
        'the rotary engine',
        'the boxer engine',
        'the radial engine'
      ],
      correctAnswer: 'the rotary engine'
    },
    {
      question: `What did Mazda start off producing?`,
      answers: [
        'Cars, duh',
        'Steam-powered trains',
        'Cork',
        'Soap'
      ],
      correctAnswer: 'Cork'
    },
    {
      question: 'What is the BMW logo reflective of?',
      answers: [
        'The crash dummy',
        'The household fan',
        'The propellers on early planes',
        'Their cars drifting donuts'
      ],
      correctAnswer: 'The propellers on early planes'
    },
    {
      question: 'The Volkswagen Group own all of the following except...',
      answers: [
        'Porsche',
        'Audi',
        'Lamborghini',
        'Volvo'
      ],
      correctAnswer: 'Volvo'
    },
    {
      question: 'In 2015, which car manufacturer was found guilty of a major emissions scandal?',
      answers: [
        'Subaru',
        'Volkswagen',
        'BMW',
        'Hyundai'
      ],
      correctAnswer: 'Volkswagen'
    },
    {
      question: 'Which grade of fuel does not exist at most gas stations?',
      answers: [
        '85 octane',
        '87 octane',
        '89 octane',
        '91 octane'
      ],
      correctAnswer: '85 octane'
    },
    {
      question: 'You are least likely to be able to drift with which of the following powertrains?',
      answers: [
        'Rear-wheel drive',
        'Front-wheel drive',
        '4x4',
        'All-wheel drive'
      ],
      correctAnswer: 'Front-wheel drive'
    },
    {
      question: 'In a manual (stickshift) vehicle, what happens if you turn the key while stepping on the third pedal?',
      answers: [
        'The battery shorts out',
        'The car turns on',
        'The alarm starts screaming',
        'Your car takes a screenshot'
      ],
      correctAnswer: 'The car turns on'
    },
    {
      question: 'ABS has been mandated on cars since 2012 in the US. It stands for...',
      answers: [
        'Airbag Blowout System',
        'Alarm for Battery Shortage',
        'Arnold Brunswick Shaft',
        'Anti-lock Brake System'
      ],
      correctAnswer: 'Anti-lock Brake System'
    },
    {
      question: 'Which of the following has the fastest 0 - 60 mph time? (Among the selection below.)',
      answers: [
        'Lamborghini Huracan Performante',
        'Toyota Prius GT',
        'Tesla Model S Plaid',
        'Nissan GT-R Nismo'
      ],
      correctAnswer: 'Tesla Model S Plaid'
    },
  ],
  quizStarted: false,
  questionNumber: 0,
  score: 0
};

/********** TEMPLATE GENERATION FUNCTIONS **********/

// These functions return HTML templates

let num = 0;

let correctAnsNum = 0;

const currentCode = [];

function statusKeeper() {
  console.log('initializing question and score counters')
  return `
    <div class='question-score-number'>
        <p>Question Number: ${store.questionNumber}/10</p>
        <p>Score: ${store.score}/100</p>
    </div>`;
}

function initialScreen() {
  console.log('initializing initial screen')
  return `
    <div class='home-screen'>
      <p>Welcome! This quiz will test you on how much you know about things in the automotive world. Click "BEGIN" when ready.</p>
    </div>
    <button class='begin-button'>BEGIN</button>`;
}

function questionScreens() {
  console.log('initializing question screens')
  return `
    <div class='questions'>
      <form id="question-form">
        <fieldset>
          <div class='question'>
            <legend>${store.questions[num].question}</legend>
          </div>

          <div class='options'>
            <div class='option-container-0'>
              <input type='radio' name='answer-choice' id='ans-1' value='0' required>
              <label for='ans-1'> ${store.questions[num].answers[0]}</label>
            </div>

            <div class='option-container-1'>
              <input type='radio' name='answer-choice' id='ans-2' value='1' required>
              <label for='ans-2'> ${store.questions[num].answers[1]}</label>
            </div>

            <div class='option-container-2'>
              <input type='radio' name='answer-choice' id='ans-3' value='2' required>
              <label for='ans-3'> ${store.questions[num].answers[2]}</label>
            </div>

            <div class='option-container-3'>
              <input type='radio' name='answer-choice' id='ans-4' value='3' required>
              <label for='ans-4'> ${store.questions[num].answers[3]}</label>
            </div>
          </div>
        </fieldset>
        <button type="submit" class='submit-button' tabindex='5'>Submit</button>
      </form>
    </div>`;
}

function incorrectMessage() {
  console.log('initializing message for wrong answer');
  return `
    <div class='incorrect-answer'>
      <p>Whoops, the right answer is actually '${store.questions[num].correctAnswer}'.</p>
    </div>
    <button class='next-button'>Next</button>`;
}

function correctMessage() {
  console.log('initializing message for right answer');
  return `
    <div class='correct-answer'
      <p>You are correct! You get 10 points.</p>
    </div>
    <button class='next-button'>Next</button>`;
}

function finalScreen() {
  console.log('initializing final screen');
  return `
    <div class='last-screen'>
      <p>Congrats, you finished!<br>
      Your final score is: ${store.score}!</p>
    </div>
    <button class='restart'>Restart Quiz</button>`;
}

/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store

function renderInitialScreen () {;
  currentCode.push(initialScreen())
}

function renderQuestionScreen() {
  console.log('starting render of question screen');
  currentCode.push(questionScreens())
}

function renderFinalScreen() {
  console.log('starting render of last screen');
  currentCode.push(finalScreen());
}

function renderScores() {
  currentCode.push(statusKeeper());
}

function renderCorrectMessage() {
  console.log('user was correct');
  currentCode.push(correctMessage());
  return $('.main-screen').html(currentCode);
}

function renderWrongMessage() {
  console.log('user was wrong');
  currentCode.push(incorrectMessage());
  return $('.main-screen').html(currentCode);
}

function renderMain() {
  if (store.quizStarted == false) {
    renderInitialScreen();
  }
  else if (store.quizStarted === true && store.questionNumber > 10) {
    renderFinalScreen();
  }
  else {
    renderScores();
    renderQuestionScreen();
  }
  return $('main').html(currentCode);
}

/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)

function handleBegin() {
  $('.main-screen').on('click', '.begin-button', function(event) {
    console.log(`'handleBegin' ran`);
    store.quizStarted = true;
    store.questionNumber += 1;
    currentCode.splice(0,1)
    renderMain();
  })
}

function handleQuestion() {
  $('.main-screen').submit(function(event) {
    event.preventDefault();
    console.log(`'handleQuestion' ran`);
    currentCode.splice(1,2);

    if (checkResponse() === true) {
      store.score += 10;
      renderCorrectMessage();
    }
    else {
      renderWrongMessage();
    }
  });
}

function handleTransition() {
  $('.main-screen').on('click', '.next-button', function(event) {
    store.questionNumber += 1;
    currentCode.splice(0,currentCode.length);
    num += 1;
    renderMain();
  });
}

function handleReset() {
  $('.main-screen').on('click', '.restart', function(event) {
    console.log('initiating reset');
    store.questionNumber = 0;
    store.score = 0;
    store.quizStarted = false;
    num = 0;
    currentCode.splice(0,currentCode.length);
    renderMain();
  });
}

function checkResponse() {
  console.log('handler for response checking initiated');
  correctAnsNum = store.questions[num].answers.findIndex(item => item === store.questions[num].correctAnswer);
  const choices = document.getElementsByName('answer-choice');
  return document.getElementsByName('answer-choice')[correctAnsNum].checked;
}

function handleController() {
  renderMain();
  handleBegin();
  handleQuestion();
  handleTransition();
  handleReset();
}

$(handleController);
