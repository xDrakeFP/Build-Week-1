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
