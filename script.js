const checkBoxes = document.querySelectorAll(".custom-checkbox");
const goalInputs = document.querySelectorAll(".goal-input");
const progressBar = document.querySelector(".progress-bar");
const progressValue = document.querySelector(".progress-value");
const progressMsg = document.querySelector('.progress-msg');

const goalQuotes = [
  "Raise the bar by completing your goals!",
  "Well begun is half done!",
  "Just a step away, keep going!",
  "Whoa! You just completed all the goals, time for chill :D",
];

const allGoals = JSON.parse(localStorage.getItem("allGoals")) || {};
let completedGoalsCount = Object.values(allGoals).filter(
  (goal) => goal.completed
).length;
progressMsg.innerText = goalQuotes[completedGoalsCount];
progressValue.firstElementChild.innerText = `${completedGoalsCount}/${goalInputs.length} Completed`;
progressValue.style.width = `${(completedGoalsCount / goalInputs.length) * 100}%`;

checkBoxes.forEach((checkBox) => {
  checkBox.addEventListener("click", (e) => {
    const allGoalAdded = [...goalInputs].every((goal) => {
      return goal.value;
    });
    if (allGoalAdded) {
      checkBox.parentElement.classList.toggle("completed");
      const inputId = checkBox.nextElementSibling.id;
      allGoals[inputId].completed = !allGoals[inputId].completed;
      completedGoalsCount = Object.values(allGoals).filter(
        (goal) => goal.completed
      ).length;
      progressMsg.innerText = goalQuotes[completedGoalsCount];
      progressValue.firstElementChild.innerText = `${completedGoalsCount}/${goalInputs.length} Completed`;
      progressValue.style.width = `${(completedGoalsCount / goalInputs.length) * 100}%`;
      localStorage.setItem("allGoals", JSON.stringify(allGoals));
    } else {
      progressBar.classList.add("show-error");
    }
  });
});

goalInputs.forEach((input) => {
  if (allGoals[input.id]) {
    input.value = allGoals[input.id].name;

    if (allGoals[input.id].completed) {
      input.parentElement.classList.add("completed");
    }
  }
  input.addEventListener("input", () => {
    if (allGoals[input.id] && allGoals[input.id].completed) {
      input.value = allGoals[input.id].name;
      return;
    }
    allGoals[input.id] = { name: input.value, completed: false };
    localStorage.setItem("allGoals", JSON.stringify(allGoals));
  });

  input.addEventListener("focus", () => {
    progressBar.classList.remove("show-error");
  });
});
