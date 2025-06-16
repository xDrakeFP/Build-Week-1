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

const score = 2;
const passed = score >= 6;

const messageSelected = passed ? messageCorrect : messageWrong;

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
        shadowColor: "rgba(0,0,0,0.45)",
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
        chart.ctx.restore();
      },
    },
  ],
});

const answersPercent = (score) => {
  const correct = score * 10;
  document.getElementById("correctH2").innerHTML = `Correct <br /> ${correct}%`;
  document.getElementById("correctP").innerText = `${score}/10 questions.`;
  document.getElementById("wrongH2").innerHTML = `Wrong <br /> ${
    100 - correct
  }%`;
  document.getElementById("wrongP").innerText = `${10 - score}/10 questions.`;
};
