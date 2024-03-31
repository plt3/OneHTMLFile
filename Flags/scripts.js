const flagWrappers = [...document.querySelectorAll("div.flag-wrapper")];
const statsHeader = document.getElementById("stats-header");
const answerForm = document.querySelector("form");
const inputElem = document.querySelector("input");
let flagIndex = 0;
let correctNum = 0;
let isFirstTry = true;

function focusNextFlag() {
  if (flagIndex + 1 < flagWrappers.length) {
    flagWrappers[flagIndex].style.display = "none";
    flagIndex++;
    flagWrappers[flagIndex].style.display = "flex";
  } else {
    answerForm.style.display = "none";
    flagWrappers[flagIndex].style.display = "none";
    flagIndex++;
    document.getElementById("incorrect-title").style.display = "block";
    for (const flag of flagWrappers) {
      if (flag.dataset.correct === "0") {
        const flagName = document.createElement("p");
        flagName.className = "flag-name";
        flagName.textContent = flag.id.split(";")[0];
        flag.appendChild(flagName);
        flag.style.display = "flex";
      }
    }
  }
}

function updateStatsHeader(numAttempted) {
  statsHeader.textContent = `${flagIndex}/${flagWrappers.length} done, ${correctNum}/${numAttempted} correct`;
}

function checkAnswer(guess, answer) {
  // remove all accents, lowercase, and trim whitespace before comparison
  const lowerGuess = guess
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim();
  const answerArray = answer
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .split(";");

  for (const possibleAnswer of answerArray) {
    if (lowerGuess === possibleAnswer) {
      return true;
    }
  }

  return false;
}

answerForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (checkAnswer(inputElem.value, flagWrappers[flagIndex].id)) {
    inputElem.value = "";
    inputElem.className = "correct";
    if (isFirstTry) {
      correctNum++;
      flagWrappers[flagIndex].dataset.correct = "1";
    }
    isFirstTry = true;
    focusNextFlag();
    updateStatsHeader(flagIndex);
  } else {
    if (inputElem.value.trim() === "") {
      inputElem.value = flagWrappers[flagIndex].id.split(";")[0];
      inputElem.className = "info";
    } else {
      inputElem.className = "incorrect";
    }
    flagWrappers[flagIndex].dataset.correct = "0";
    isFirstTry = false;
    updateStatsHeader(flagIndex + 1);
  }
});

window.onload = () => {
  updateStatsHeader(flagIndex);

  for (let i = flagWrappers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [flagWrappers[i], flagWrappers[j]] = [flagWrappers[j], flagWrappers[i]];
  }
  flagWrappers[0].style.display = "flex";
};
