//  Array che conterrà le domande mescolate
let shuffledQuestions = [];

//   Funzione per mescolare l'array e randomizzata l'ordine delle domande e delle opzioni
const shuffleArray = (questions) => {
  for (let i = questions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [questions[i], questions[j]] = [questions[j], questions[i]];
  }
  return questions;
};
//  Gestione Array delle domande + risposte vere e false

document.addEventListener("DOMContentLoaded", () => {
  const questions = [
    {
      category: "Science: Computers",
      type: "multiple",
      difficulty: "easy",
      question: "What does CPU stand for?",
      correct_answer: "Central Processing Unit",
      incorrect_answers: [
        "Central Process Unit",
        "Computer Personal Unit",
        "Central Processor Unit",
      ],
    },
    {
      category: "Science: Computers",
      type: "multiple",
      difficulty: "easy",
      question:
        "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn&#039;t get modified?",
      correct_answer: "Final",
      incorrect_answers: ["Static", "Private", "Public"],
    },
    {
      category: "Science: Computers",
      type: "boolean",
      difficulty: "easy",
      question: "The logo for Snapchat is a Bell.",
      correct_answer: "False",
      incorrect_answers: ["True"],
    },
    {
      category: "Science: Computers",
      type: "boolean",
      difficulty: "easy",
      question:
        "Pointers were not used in the original C programming language; they were added later on in C++.",
      correct_answer: "False",
      incorrect_answers: ["True"],
    },
    {
      category: "Science: Computers",
      type: "multiple",
      difficulty: "easy",
      question:
        "What is the most preferred image format used for logos in the Wikimedia database?",
      correct_answer: ".svg",
      incorrect_answers: [".png", ".jpeg", ".gif"],
    },
    {
      category: "Science: Computers",
      type: "multiple",
      difficulty: "easy",
      question: "In web design, what does CSS stand for?",
      correct_answer: "Cascading Style Sheet",
      incorrect_answers: [
        "Counter Strike: Source",
        "Corrective Style Sheet",
        "Computer Style Sheet",
      ],
    },
    {
      category: "Science: Computers",
      type: "multiple",
      difficulty: "easy",
      question:
        "What is the code name for the mobile operating system Android 7.0?",
      correct_answer: "Nougat",
      incorrect_answers: ["Ice Cream Sandwich", "Jelly Bean", "Marshmallow"],
    },
    {
      category: "Science: Computers",
      type: "multiple",
      difficulty: "easy",
      question: "On Twitter, what is the character limit for a Tweet?",
      correct_answer: "140",
      incorrect_answers: ["120", "160", "100"],
    },
    {
      category: "Science: Computers",
      type: "boolean",
      difficulty: "easy",
      question: "Linux was first created as an alternative to Windows XP.",
      correct_answer: "False",
      incorrect_answers: ["True"],
    },
    {
      category: "Science: Computers",
      type: "multiple",
      difficulty: "easy",
      question:
        "Which programming language shares its name with an island in Indonesia?",
      correct_answer: "Java",
      incorrect_answers: ["Python", "C", "Jakarta"],
    },
  ];

  // Variabili del quiz:
  // Domanda corrente
  let currentQuestionIndex = 0;

  //   Score
  let score = 0;

  //   Selezione dell'utente
  let selectedOption = null;

  //   randomizza
  const shuffledQuestions = shuffleArray(questions);
  // Riferimenti agli elementi HTML
  const questionTextElement = document.getElementById("question-text");
  const optionsContainer = document.getElementById("options-container");
  const questionCounterElement = document.getElementById("question-counter");
  const confirmButton = document.getElementById("confirm-button");

  //   funzione per gestire la selezione di un opzione
  const handleOptionSelection = (clickedButton, optionText) => {
    // rimuove la classe selected da tutti i bottoni
    Array.from(optionsContainer.children).forEach((btn) => {
      btn.classList.remove("selected");
    });
    // aggiungi la classe selected al bottone cliccato
    clickedButton.classList.add("selected");
    // memorizza l'opzione selezionata
    selectedOption = optionText;
    // mostra e abilita il bottone di conferma
    confirmButton.style.display = "block";
    confirmButton.disabled = false;
  };

  //   funzione per terminare il quiz e mostrare i risultati
  const endQuiz = () => {
    alert(`Quiz terminato! il tuo punteggio: ${score} su ${questions.length}`);
  };

  //   Funzione principale per visualizzare la domanda corrente e le sue opzioni
  const displayQuestion = () => {
    //  controllo che le domande siano state fatte tutte
    if (currentQuestionIndex >= shuffledQuestions.length) {
      endQuiz();
      return;
    }

    // Resetta lo stato per la nuova domanda:
    // Nessuna opzione è ancora stata selezionata
    selectedOption = null;
    // Nasconde bottone di conferma
    confirmButton.style.display = "none";
    // Lo disabilità
    confirmButton.disabled = true;

    // L'oggetto domanda corrente dell'array
    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    // Aggiorniamo il testo della domanda
    questionTextElement.innerHTML = currentQuestion.question;
    // pulizia del contenitore delle opzioni bottoni della domanda precedente
    optionsContainer.innerHTML = "";
    // Combina la risposta corretta  con quelle incorette in un unico array
    let allOptions = [
      ...currentQuestion.incorrect_answers,
      currentQuestion.correct_answer,
    ];
    // mescola le opzioni
    allOptions = shuffleArray(allOptions);

    // Per ogni azione crea un bottone e lo aggiunge al contenitore
    allOptions.forEach((option) => {
      // creazione bottone
      const button = document.createElement("button");
      //   aggiunta classe CSS
      button.classList.add("option-button");
      //   impostazione testo
      button.innerHTML = option;
      //   aggiuta event listener al bottone
      button.addEventListener("click", () =>
        handleOptionSelection(button, option)
      );
      //   aggiunta bottone al DOM
      optionsContainer.appendChild(button);
    });
    // Aggiorna il contatore delle domande
    questionCounterElement.textContent = `QUESTION ${
      currentQuestionIndex + 1
    } / ${questions.length} `;
  };
  // Funzione per gestire la conferma della risposta.
  const confirmAnswer = () => {
    // se non è stato selezionato nulla non fare niente
    if (selectedOption === null) {
      return;
    }
    // Domanda corrente
    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    // La risposta è corretta???
    const isCorrect = selectedOption === currentQuestion.correct_answer;
    if (isCorrect) {
      score++;
      console.log("Risposta Corretta");
    } else {
      console.log("Risposta Sbagliata");
    }
    currentQuestionIndex++;
    displayQuestion();
  };
  //   aggiunta event listener al bottone di conferma
  confirmButton.addEventListener("click", confirmAnswer);

  displayQuestion();
});
