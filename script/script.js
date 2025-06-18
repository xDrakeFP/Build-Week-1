document.addEventListener("DOMContentLoaded", () => {
  const bodyId = document.body.id;
  if (bodyId === "welcome") {
    // codice solo per welcome.html
    const checkboxWelcome = document.getElementById("choice1-1");

    const buttonWelcome = document.getElementById("welcomeButton");

    checkboxWelcome.addEventListener("change", () => {
      buttonWelcome.disabled = !checkboxWelcome.checked; //
    });
  } else if (bodyId === "benchmark") {
    // codice solo per benchmark.html
    const formattaTempo = (secs) => {
      // Funzione per formattare il tempo in: --:--, gli passo i secondi
      const minuti = Math.floor(secs / 60); // Calcolo i minuti interi, nel nostro caso sempre 1 o 0
      const secondi = secs % 60; // Calcolo i secondi tramite il resto di secondi/60
      const minutiFormat = String(minuti).padStart(2, "0"); // Aggiungo uno zero come prima cifra se il numero è minore di 10
      const secondiFormat = String(secondi).padStart(2, "0");

      return `${minutiFormat}:${secondiFormat}`;
    };
    let tempoRimanente = 0;
    const timer = (secondi) => {
      // Funzione effettiva del timer
      const timer = document.getElementById("timer");

      tempoRimanente = secondi; // Inizializzo la variabile che userò per contare i secondi rimanenti

      timer.textContent = formattaTempo(tempoRimanente); // Formatto il tempo e lo inserisco nel div #timer
      const canvasTime = document.getElementById("canvasTimer");
      // const chartArray = ["SECONDS", tempoRimanente, "REMAINING"];
      const myChart = new Chart(canvasTime, {
        type: "doughnut",
        data: {
          datasets: [
            {
              data: [secondi - tempoRimanente, tempoRimanente], //array con valori per il grafico 1 secondi passati 2 secondi rimanenti
              cutout: "70%", //quanto spazio lasciare al centro
              backgroundColor: [
                "#FFFFFF30", //colore di secondi passati
                "#00FFFF", //colore di secondi rimanenti
              ],
              borderWidth: 0,
            },
          ],
        },
        options: {
          responsive: true, //permette di adattare il grafico alla pagina
          plugins: {
            legend: {
              position: "none", //elimina la legenda di default
            },
            tooltip: {
              enabled: false, //disattiva tooltip del grafico
            },
            centerText: {
              display: true,
              lines: ["SECONDS", tempoRimanente, "REMAINING"],
            },
          },
        },
        plugins: [
          {
            id: "centerText",
            beforeDraw(chart, args, pluginOptions) {
              //args mai richiamato serve solo per arrivare a pluginOptions
              if (!pluginOptions.display) return; //plugin attivo solo se display è true e quindi è presente qualche scritta

              const ctx = chart.ctx; //context = zona in cui è fatto il chart in questo caso canvas (è stato selezionato qui new Chart(CANVAS, { ad inizio grafico)
              const { width, height } = chart; //ottieni dimensioni canvas
              const lines = pluginOptions.lines || []; //ottieni array di stringhe che va scritto

              ctx.save(); //salva stato canvas prima della modifica, che poi verrà ripristinato finite di fare le scritte, in questo modo non vai in conflitto
              ctx.textAlign = "center"; //allinea testo al centro orizzontalmente
              ctx.textBaseline = "middle"; //allinea il testo al centro verticalmente

              const lineHeight = 52; //altezza in pixel fra le righe
              const totalHeight = lineHeight * lines.length; //altezza totale del  blocco di testo
              const startY = height / 2 - totalHeight / 3; //calcola dove iniziare a scrivere

              // cicla su ogni riga di testo

              lines.forEach((line, i) => {
                if (i === 0) {
                  // prima linea
                  ctx.font = "0.8em Poppins";
                  ctx.fillStyle = "#FFF";
                } else if (i === 1) {
                  // seconda linea
                  ctx.font = " 5em Poppins";
                  ctx.fillStyle = "#FFF";
                } else {
                  //resto del paragrafo
                  ctx.font = "0.8em Poppins";
                  ctx.fillStyle = "#FFF";
                }
                //disegna il testo al centro della orizzontale usando la Y calcolata per il verticale
                ctx.fillText(line, width / 2, startY + i * lineHeight);
              });
              ctx.restore(); // riprstina stato inizale del canvas salvato prima
            },
          },
        ],
      });

      const intervallo = setInterval(
        () => {
          // setInterval ti permette di ripetere il suo contenuto in un intervallo in millisecondi
          tempoRimanente--; // Diminuisco il timer di un secondo

          if (tempoRimanente >= 0) {
            // Condizione per determinare che il tempo rimanente sia ancora superiore a 0
            timer.textContent = formattaTempo(tempoRimanente); // Aggiorno il timer dopo averlo formattato
            myChart.data.datasets[0].data = [
              secondi - tempoRimanente,
              tempoRimanente,
            ];
            myChart.options.plugins.centerText.lines = [
              "SECONDS",
              tempoRimanente,
              "REMAINING",
            ];
            myChart.update();
            console.log(chartArray);
          } else if (tempoRimanente <= 0) {
            // Quando il tempo scade fermo setInterval
            clearInterval();
          }
        },
        1000 // L'intervallo che gli passo (1000ms = 1 secondo)
      );
    };
    timer(60);
    //   Funzione per mescolare l'array e randomizzata l'ordine delle domande e delle opzioni
    const shuffleArray = (questions) => {
      for (let i = questions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [questions[i], questions[j]] = [questions[j], questions[i]];
      }
      return questions;
    };

    //   Score
    let score = 0;

    //  Gestione Array delle domande + risposte vere e false

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

    //   Selezione dell'utente
    let selectedOption = null;

    //   randomizza
    const randomQuestions = shuffleArray(questions);
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
      localStorage.setItem("quizScore", score.toString());
      window.location.href = "results.html";
    };

    //   Funzione principale per visualizzare la domanda corrente e le sue opzioni
    const displayQuestion = () => {
      //  controllo che le domande siano state fatte tutte
      if (currentQuestionIndex >= randomQuestions.length) {
        endQuiz();
        return;
      }
      // aggiornamento timer
      tempoRimanente = 61;
      // Resetta lo stato per la nuova domanda:
      // Nessuna opzione è ancora stata selezionata
      selectedOption = null;
      // Nasconde bottone di conferma
      confirmButton.style.display = "none";
      // Lo disabilità
      confirmButton.disabled = true;

      // L'oggetto domanda corrente dell'array
      const currentQuestion = randomQuestions[currentQuestionIndex];
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
      const currentQuestion = randomQuestions[currentQuestionIndex];
      // La risposta è corretta???
      const isCorrect = selectedOption === currentQuestion.correct_answer;
      if (isCorrect && tempoRimanente > 0) {
        score++;
        console.log("Risposta Corretta");
        console.log(score);
      } else {
        console.log("Risposta Sbagliata");
        console.log(score);
      }
      currentQuestionIndex++;
      displayQuestion();
      return score;
    };
    //   aggiunta event listener al bottone di conferma
    confirmButton.addEventListener("click", confirmAnswer);
    // aggiungere rimozione bottone finito il test

    displayQuestion();
  } else if (bodyId === "results") {
    // codice solo per results.html
    // recupero il punteggio local
    const score = parseInt(localStorage.getItem("quizScore")) || 0;
    const canvas = document.getElementById("doughnut");
    const messageCorrect = [
      "Congratulations!",
      "You passed the exam.",
      "",
      "We'll send you the certificate",
      "in few minutes.",
      "Check your email (including",
      "promotions / spam folder",
    ];
    const messageWrong = [
      "Unfortunately,",
      "You didn't pass the exam.",
      "",
      "Please review the material",
      "and try again later.",
      "Keep an eye on your email",
      "for further instructions.",
    ];

    const passed = score >= 6;

    let messageSelected = passed ? messageCorrect : messageWrong;

    new Chart(canvas, {
      type: "doughnut",
      data: {
        datasets: [
          {
            data: [10 - score, score], //array con valori per il grafico
            cutout: "70%", //quanto spazio lasciare al centro
            backgroundColor: [
              "#D20094", //colore di wrong
              "#00FFFF", //colore di correct
            ],
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true, //permette di adattare il grafico alla pagina
        plugins: {
          legend: {
            position: "none", //elimina la legenda di default
          },
          tooltip: {
            enabled: false, //disattiva tooltip del grafico
          },
          centerText: {
            //plugin per la scritta al centro
            display: true,
            lines: messageSelected,
          },
          shadowPlugin: {
            shadowColor: "rgba(0,0,0,0.45)", //plugin per le ombre
            shadowBlur: 10,
            shadowOffsetX: 2,
            shadowOffsetY: 2,
          },
        },
      },
      plugins: [
        {
          id: "centerText",
          beforeDraw(chart, args, pluginOptions) {
            //args mai richiamato serve solo per arrivare a pluginOptions
            if (!pluginOptions.display) return; //plugin attivo solo se display è true e quindi è presente qualche scritta

            const ctx = chart.ctx; //context = zona in cui è fatto il chart in questo caso canvas (è stato selezionato qui new Chart(CANVAS, { ad inizio grafico)
            const { width, height } = chart; //ottieni dimensioni canvas
            const lines = pluginOptions.lines || []; //ottieni array di stringhe che va scritto

            ctx.save(); //salva stato canvas prima della modifica, che poi verrà ripristinato finite di fare le scritte, in questo modo non vai in conflitto
            ctx.textAlign = "center"; //allinea testo al centro orizzontalmente
            ctx.textBaseline = "middle"; //allinea il testo al centro verticalmente

            const lineHeight = 36; //altezza in pixel fra le righe
            const totalHeight = lineHeight * lines.length; //altezza totale del  blocco di testo
            const startY = height / 2 - totalHeight / 2; //calcola dove iniziare a scrivere

            // cicla su ogni riga di testo

            lines.forEach((line, i) => {
              if (i === 0) {
                // prima linea
                ctx.font = "bold 2em sans-serif";
                ctx.fillStyle = "#000";
              } else if (i === 1) {
                // seconda linea
                ctx.font = "bold 2em sans-serif";
                ctx.fillStyle = "#00FFFF";
              } else {
                //resto del paragrafo
                ctx.font = "1.5em sans-serif";
                ctx.fillStyle = "#000";
              }
              //disegna il testo al centro della orizzontale usando la Y calcolata per il verticale
              ctx.fillText(line, width / 2, startY + i * lineHeight);
            });
            ctx.restore(); // riprstina stato inizale del canvas salvato prima
          },
        },
        {
          //impostazioni plugin ombre
          id: "shadowPlugin",
          beforeDatasetDraw(chart, args, options) {
            const ctx = chart.ctx;
            ctx.save();
            ctx.shadowColor = options.shadowColor || "rgba(0, 0, 0, 0.5)";
            ctx.shadowBlur = options.shadowBlur || 5;
            ctx.shadowOffsetX = options.shadowOffsetX || 8;
            ctx.shadowOffsetY = options.shadowOffsetY || 8;
          },
          afterDatasetDraw(chart) {
            //importante per far si che solo il grafico abbia l'ombra e non anche le scritte
            chart.ctx.restore();
          },
        },
      ],
    });

    //funzione calcola punteggi
    const answersPercent = () => {
      const correct = score * 10;
      document.getElementById(
        "correctH2"
      ).innerHTML = `Correct <br /> ${correct}%`;
      document.getElementById("correctP").innerText = `${score}/10 questions.`;
      document.getElementById("wrongH2").innerHTML = `Wrong <br /> ${
        100 - correct
      }%`;
      document.getElementById("wrongP").innerText = `${
        10 - score
      }/10 questions.`;
    };

    answersPercent();
  } else if (bodyId === "feedback") {
    // codice solo per feedback.html
    const stelle = document.getElementsByClassName("star");

    for (let i = 0; i < stelle.length; i++) {
      // Aggiungo click ad ogni stella
      stelle[i].addEventListener("click", function () {
        const punteggio = i + 1; // Uso punteggio per tenere conto di che stella viene cliccata, e i+1 perché la prima stella ha 0 come index

        for (let j = 0; j < stelle.length; j++) {
          // ciclo le stelle per controllare a quante aggiungere la classe attivo
          if (j < punteggio) {
            stelle[j].classList.add("attivo"); // aggiungo classe a tutte le stelle che hanno index minore o uguale di punteggio
          } else {
            stelle[j].classList.remove("attivo"); // rimuovo la classe dalle stelle che sono fuori range
          }
        }
      });
    }
  }
});
