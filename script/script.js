const checkbox = document.getElementById("checkbox");
const button = document.getElementsByClassName("blueButton")[0];

checkbox.addEventListener("change", () => {
  button.disabled = !checkbox.checked;
});
