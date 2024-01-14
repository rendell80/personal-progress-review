document.addEventListener('DOMContentLoaded', function() {
  loadGoals('goals.json');
  loadQuestions('questions-annual.json', 'annual');
  loadQuestions('questions-monthly.json', 'monthly');
  loadQuestions('questions-weekly.json', 'weekly');
});

function loadGoals(jsonFile) {
  fetch(jsonFile)
    .then(response => response.json())
    .then(goals => displayGoals(goals))
    .catch(error => {
      console.error(`Error fetching goals from ${jsonFile}:`, error);
    });
}

function loadQuestions(jsonFile, containerId) {
  fetch(jsonFile)
    .then(response => response.json())
    .then(questions => createQuestionElements(questions, containerId))
    .catch(error => {
      console.error(`Error fetching questions from ${jsonFile}:`, error);
    });
}

function createQuestionElements(questions, containerId) {
  const container = document.getElementById(containerId);

  questions.forEach((question, index) => {
    const questionWithNumber = {
      ...question,
      question: `${index + 1}. ${question.question}`
    };
    const questionDiv = buildQuestionDiv(questionWithNumber);
    container.appendChild(questionDiv);
  });
}

function buildQuestionDiv(question) {
  const questionDiv = document.createElement('div');
  const label = createLabelForQuestion(question);
  questionDiv.appendChild(label);
  questionDiv.className = 'question';
  return questionDiv;
}

function createLabelForQuestion(question) {
  const label = document.createElement('label');
  label.htmlFor = question.id;
  label.textContent = question.question;
  return label;
}

function displayGoals(goals) {
  const goalsContainer = document.getElementById('goals');
  const goalsList = document.createElement('ul');

  goals.forEach(goal => {
    const latestMonthProgress = goal.current[goal.current.length - 1]; // Get the lastest month's progress
    const listItem = document.createElement('li');
    const isComplete = latestMonthProgress >= goal.goal;
    listItem.textContent = `${goal.text}: ${latestMonthProgress}/${goal.goal}`;
    if (isComplete) {
      listItem.textContent += ' ✅';
      listItem.className = 'goal-done'
    }
    goalsList.appendChild(listItem);
  });
  goalsContainer.appendChild(goalsList);
}
