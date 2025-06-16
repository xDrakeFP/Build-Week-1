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

  const intervallo = setInterval(
    () => {
      // setInterval ti permette di ripetere il suo contenuto in un intervallo in millisecondi

      tempoRimanente--; // Diminuisco il timer di un secondo

      if (tempoRimanente >= 0) {
        // Condizione per determinare che il tempo rimanente sia ancora superiore a 0
        timer.textContent = formattaTempo(tempoRimanente); // Aggiorno il timer dopo averlo formattato
      } else if (tempoRimanente <= 0) {
        // Quando il tempo scade fermo setInterval
        clearInterval();
      }
    },
    1000 // L'intervallo che gli passo (1000ms = 1 secondo)
  );
};
timer(61);
