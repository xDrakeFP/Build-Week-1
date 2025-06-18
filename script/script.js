document.addEventListener("DOMContentLoaded", () => {
  const formattaTempo = (secs) => {
    // Funzione per formattare il tempo in: --:--, gli passo i secondi
    const minuti = Math.floor(secs / 60); // Calcolo i minuti interi, nel nostro caso sempre 1 o 0
    const secondi = secs % 60; // Calcolo i secondi tramite il resto di secondi/60
    const minutiFormat = String(minuti).padStart(2, "0"); // Aggiungo uno zero come prima cifra se il numero è minore di 10
    const secondiFormat = String(secondi).padStart(2, "0");

    return `${minutiFormat}:${secondiFormat}`;
  };

  const timer = (secondi) => {
    // Funzione effettiva del timer
    const timer = document.getElementById("timer");

    let tempoRimanente = secondi; // Inizializzo la variabile che userò per contare i secondi rimanenti

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
  timer(30);
});
