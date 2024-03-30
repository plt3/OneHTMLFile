const flagImgs = [...document.querySelectorAll("#flag-container img")];
const statsHeader = document.getElementById("stats-header");
const inputElem = document.querySelector("input");
let flagIndex = 0;
let correctNum = 0;
let isFirstTry = true;

function focusNextFlag() {
  if (flagIndex + 1 < flagImgs.length) {
    flagImgs[flagIndex].style.display = "none";
    flagIndex++;
    flagImgs[flagIndex].style.display = "block";
  }
}

function updateStatsHeader(numAttempted) {
  statsHeader.textContent = `${flagIndex}/${flagImgs.length} done, ${correctNum}/${numAttempted} correct`;
}

document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
  if (
    inputElem.value.toLowerCase().trim() ===
    flagImgs[flagIndex].id.toLowerCase()
  ) {
    focusNextFlag();
    inputElem.value = "";
    inputElem.className = "correct";
    if (isFirstTry) {
      correctNum++;
    }
    isFirstTry = true;
    updateStatsHeader(flagIndex);
  } else {
    if (inputElem.value.trim() === "") {
      inputElem.value = flagImgs[flagIndex].id;
      inputElem.className = "info";
    } else {
      inputElem.className = "incorrect";
    }
    isFirstTry = false;
    updateStatsHeader(flagIndex + 1);
  }
});

window.onload = () => {
  updateStatsHeader(flagIndex);

  for (let i = flagImgs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [flagImgs[i], flagImgs[j]] = [flagImgs[j], flagImgs[i]];
  }
  flagImgs[0].style.display = "block";
};
