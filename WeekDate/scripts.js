const MIN_DATE = new Date(1753, 0, 1);
const MAX_DATE = new Date(2399, 12, 31);
const MS_RANGE = MAX_DATE.getTime() - MIN_DATE.getTime() + 1;

let paused = false;
let separated = false;
let secondHalf = false;
let currentDate = null;
let startTime = null;
let yearTime = null;
let endTime = null;
let attempted = false;
let yearTimes = [];
let restTimes = [];
let fullTimes = [];
let timesAttempted = 0;
const pauseButton = document.getElementById("pause-button");
const separateButton = document.getElementById("separate-button");
const dateText = document.getElementById("date-text");
const correctText = document.getElementById("correct");

const statsDefs = {
  last: {
    label: "Last: ",
    func: (arr) => {
      return arr[arr.length - 1];
    },
  },
  average: {
    label: "Avg: ",
    func: (arr) => {
      return arr.reduce((pSum, elem) => pSum + elem, 0) / arr.length;
    },
  },
  best: {
    label: "Best: ",
    func: (arr) => {
      return Math.min.apply(Math, arr);
    },
  },
  worst: {
    label: "Worst: ",
    func: (arr) => {
      return Math.max.apply(Math, arr);
    },
  },
};

function setNewDate() {
  currentDate = new Date(MIN_DATE.getTime() + Math.random() * MS_RANGE);
  if (separated) {
    changeButtonsDisplayed(true);
    secondHalf = false;
    pauseButton.disabled = false;
    separateButton.disabled = false;
    dateText.textContent = currentDate.toLocaleString("en", {
      year: "numeric",
    });
  } else {
    dateText.textContent = currentDate.toLocaleString("en", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }
  dateText.className = "right";
  attempted = false;
  startTime = new Date().getTime();
}

function refreshStats(isCorrect, clear) {
  correctText.textContent = `${fullTimes.length}/${timesAttempted} `;
  if (timesAttempted !== 0) {
    const correctPercentage = (fullTimes.length / timesAttempted) * 100;
    correctText.textContent += `(${correctPercentage.toFixed(2)}%) correct`;
  } else {
    correctText.textContent += ` correct`;
  }
  if (isCorrect) {
    const statsTypes = {
      total: fullTimes,
    };
    if (separated || clear) {
      statsTypes.year = yearTimes;
      statsTypes.rest = restTimes;
    }
    for (let [prefix, currArr] of Object.entries(statsTypes)) {
      for (let [stat, statFunc] of Object.entries(statsDefs)) {
        const statElem = document.getElementById(prefix + "-" + stat);
        if (clear) {
          statElem.textContent = statFunc.label + "-";
        } else {
          statElem.textContent =
            statFunc.label + statFunc.func(currArr).toFixed(2);
        }
      }
    }
  }
}

function handleAnswer(event) {
  const answerDay = parseInt(event.target.id);
  if (answerDay === currentDate.getDay()) {
    if (!attempted) {
      timesAttempted++;
      endTime = new Date().getTime();
      const lastTime = (endTime - startTime) / 1000;
      if (separated) {
        const yearCalcTime = (yearTime - startTime) / 1000;
        yearTimes.push(yearCalcTime);
        restTimes.push(lastTime - yearCalcTime);
      }
      fullTimes.push(lastTime);
      refreshStats(true, false);
    }
    setNewDate();
  } else {
    if (!attempted) {
      dateText.className = "wrong";
      timesAttempted++;
      attempted = true;
      refreshStats(false, false);
    }
  }
}

function changeButtonsDisplayed(hide) {
  if (hide) {
    document.getElementById("button-container").style.display = "none";
    document.getElementById("next-container").style.display = "flex";
  } else {
    document.getElementById("button-container").style.display = "flex";
    document.getElementById("next-container").style.display = "none";
  }
}

pauseButton.onclick = () => {
  if (!paused) {
    document.getElementById("popup").style.display = "flex";
    pauseButton.textContent = "Unpause";
  } else {
    document.getElementById("popup").style.display = "none";
    pauseButton.textContent = "Pause";
    startTime = new Date().getTime();
  }
  paused = !paused;
};

separateButton.onclick = () => {
  separated = !separated;
  yearTimes = [];
  restTimes = [];
  fullTimes = [];
  timesAttempted = 0;
  if (separated) {
    changeButtonsDisplayed(true);
    document.getElementById("year-column").style.display = "flex";
    document.getElementById("rest-column").style.display = "flex";
    document.getElementById("total-time-label").style.display = "inline";
    separateButton.textContent = "Join";
  } else {
    changeButtonsDisplayed(false);
    document.getElementById("year-column").style.display = "none";
    document.getElementById("rest-column").style.display = "none";
    document.getElementById("total-time-label").style.display = "none";
    separateButton.textContent = "Separate";
  }
  refreshStats(true, true);
  setNewDate();
  startTime = new Date().getTime();
};

document.getElementById("next-button").onclick = () => {
  changeButtonsDisplayed(false);
  secondHalf = true;
  pauseButton.disabled = true;
  separateButton.disabled = true;
  dateText.textContent = currentDate.toLocaleString("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  yearTime = new Date().getTime();
};

window.onload = () => {
  setNewDate();
  document.querySelectorAll("button.choice-button").forEach((elem) => {
    elem.onclick = handleAnswer;
  });
  const qCont = document.getElementById("quiz-container");
  const bCont = document.getElementById("button-container");
  qCont.style.height = qCont.offsetHeight.toString() + "px";
  document.getElementById("next-container").style.height =
    bCont.offsetHeight.toString() + "px";
};
