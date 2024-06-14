// Utility functions to handle localStorage
function saveToLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function loadFromLocalStorage(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
}

function addToList(key, item) {
    const items = loadFromLocalStorage(key);
    items.push(item);
    saveToLocalStorage(key, items);
}

function displayList(key, elementId) {
    const items = loadFromLocalStorage(key);
    const outputElement = document.getElementById(elementId);
    outputElement.innerHTML = items.map(item => `<p>${item}</p>`).join('');
}

// Event listeners for generating hypotheses and questions
document.getElementById('generateHypothesis').addEventListener('click', function() {
    const ifPart = document.getElementById('ifPart').value;
    const thenPart = document.getElementById('thenPart').value;
    const hypothesisOutput = document.getElementById('hypothesisOutput');

    if (ifPart && thenPart) {
        const hypothesis = `If ${ifPart}, then ${thenPart}.`;
        hypothesisOutput.textContent = hypothesis;
        addToList('hypotheses', hypothesis);
        displayList('hypotheses', 'savedHypotheses');
        showFeedback('Hypothesis generated successfully!', 'success');
        displayExample('exampleHypotheses');
    } else {
        hypothesisOutput.textContent = 'Please fill in both parts of the hypothesis.';
        showFeedback('Please fill in both parts of the hypothesis.', 'error');
    }
});

document.getElementById('generateQuestion').addEventListener('click', function() {
    const questionPart = document.getElementById('questionPart').value;
    const questionOutput = document.getElementById('questionOutput');

    if (questionPart) {
        const question = `What happens if ${questionPart}?`;
        questionOutput.textContent = question;
        addToList('questions', question);
        displayList('questions', 'savedQuestions');
        showFeedback('Question generated successfully!', 'success');
        displayExample('exampleQuestions');
    } else {
        questionOutput.textContent = 'Please enter a question.';
        showFeedback('Please enter a question.', 'error');
    }
});

// Load and display saved data on page load
window.onload = function() {
    displayList('hypotheses', 'savedHypotheses');
    displayList('questions', 'savedQuestions');
};

// Show feedback in modal
function showFeedback(message, type) {
    const feedbackText = document.getElementById('feedbackText');
    feedbackText.textContent = message;
    feedbackText.className = type;
    const feedbackModal = document.getElementById('feedbackModal');
    feedbackModal.style.display = 'block';
    setTimeout(() => {
        feedbackModal.style.display = 'none';
    }, 2000);
}

// Get the modal
var modal = document.getElementById('feedbackModal');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName('close')[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = 'none';
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// Save and Load Progress
document.getElementById('saveProgress').addEventListener('click', function() {
    const hypotheses = loadFromLocalStorage('hypotheses');
    const questions = loadFromLocalStorage('questions');
    saveToLocalStorage('savedHypotheses', hypotheses);
    saveToLocalStorage('savedQuestions', questions);
    showFeedback('Progress saved successfully!', 'success');
});

document.getElementById('loadProgress').addEventListener('click', function() {
    const savedHypotheses = loadFromLocalStorage('savedHypotheses');
    const savedQuestions = loadFromLocalStorage('savedQuestions');
    saveToLocalStorage('hypotheses', savedHypotheses);
    saveToLocalStorage('questions', savedQuestions);
    displayList('hypotheses', 'savedHypotheses');
    displayList('questions', 'savedQuestions');
    showFeedback('Progress loaded successfully!', 'success');
});

// Display examples
function displayExample(exampleId) {
    const exampleElement = document.getElementById(exampleId);
    exampleElement.style.display = 'block';
    exampleElement.style.opacity = 0;
    setTimeout(() => {
        exampleElement.style.opacity = 1;
    }, 100);
}
