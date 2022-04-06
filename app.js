const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice__text"));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");

let currentQuestion = {};
let acceptionAnswers = true;
let score = 0;
let questionCounter = 0;
let avaliableQuestions = [];

let questions = [
  {
    question: "Es completamente tuyo, sin embargo, todos lo usan... ¿Qué es ?",
    choice1: "Tu vida",
    choice2: "Tu nombre",
    choice3: "Tu tiempo",
    choice4: "Ninguna de las anteriores",
    answer: 2,
  },
  {
    question: "Estás corriendo en una carrera y adelantas a la persona que está en segundo lugar, ¿en qué posición pasas a estar ?",
    choice1: "Primer lugar",
    choice2: "Tercer lugar",
    choice3: "Segundo lugar",
    choice4: "No se :(",
    answer: 3,
  },
  {
    question: "La palabra París comienza con “P” y termina con “T”, ¿cierto o falso ?",
    choice1: "Verdadero",
    choice2: "Falso",
    choice3: "Falta información",
    choice4: "Lol",
    answer: 1,
  },
  {
    question: "¿Si un tren eléctrico se mueve hacia el norte a 100 km/h y sopla el viento hacia el oeste a 10 km/h, hacia dónde irá el humo ?",
    choice1: "Este",
    choice2: "Oeste",
    choice3: "Arriba",
    choice4: "Ninguna de las anteriores",
    answer: 4,
  },
  {
    question: "¿Qué palabra usarías para describir a un hombre que no tiene todos los dedos en una mano ?",
    choice1: "Dedos fusionados",
    choice2: "Habitual",
    choice3: "Polidactilia",
    choice4: "Aspelia",
    answer: 2,
  },
  {
    question: "Antes de que el Monte Everest fuera descubierto, ¿cuál era la montaña más alta del mundo ?",
    choice1: "Cho Oyu",
    choice2: "Java",
    choice3: "Pico del Teibe",
    choice4: "Ninguna de las anteriores",
    answer: 4,
  },
  {
    question: "Si un avión se estrella en la frontera entre los Estados Unidos y Canadá, ¿dónde entierran a los supervivientes ?",
    choice1: "Estados Unidos",
    choice2: "Canada",
    choice3: "No hay restos",
    choice4: "En ningun lugar",
    answer: 4,
  },
  {
    question: "¿Cuánto duró la Guerra de los 100 años ?",
    choice1: "100 años",
    choice2: "120 años",
    choice3: "99 años",
    choice4: "116 años",
    answer: 4,
  },
  {
    question: "¿Cuál es el día más largo de la semana ?",
    choice1: "Miercoles",
    choice2: "Jueves",
    choice3: "Lunes",
    choice4: "Toda la semana",
    answer: 1,
  },
  {
    question: "¿Qué año del siglo XX no cambia si le das la vuelta a las cifras ?",
    choice1: "1961",
    choice2: "2020",
    choice3: "1880",
    choice4: "Ninguno",
    answer: 1,
  },
];

const SCORE__POINTS = 100;
const MAX__QUESTIONS = 10;

startGame = () => {
  questionCounter = 0;
  score = 0;
  avaliableQuestions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (avaliableQuestions.length === 0 || questionCounter > MAX__QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    return window.location.assign("/pages/end.html");
  }
  questionCounter++;
  progressText.innerText = `Pregunta ${questionCounter} de ${MAX__QUESTIONS}`;
  progressBarFull.style.width = `${(questionCounter / MAX__QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * avaliableQuestions.length);
  currentQuestion = avaliableQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choise) => {
    const number = choise.dataset["number"];
    choise.innerText = currentQuestion["choice" + number];
  });

  avaliableQuestions.splice(questionIndex, 1);

  acceptionAnswers = true;
  console.log(avaliableQuestions)
};


choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptionAnswers) return

    acceptionAnswers = false;
    const selectedChoice = e.target

    const selectedAnswer = selectedChoice.dataset["number"];

    let classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(SCORE__POINTS);
    }

    selectedChoice.parentElement.classList.add(classToApply);
    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1500);
  });
});


incrementScore = num =>{
    score +=num
    scoreText.innerText = score
}

startGame()