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
    } else {
        hypothesisOutput.textContent = 'Please fill in both parts of the hypothesis.';
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
    } else {
        questionOutput.textContent = 'Please enter a question.';
    }
});

// Load and display saved data on page load
window.onload = function() {
    displayList('hypotheses', 'savedHypotheses');
    displayList('questions', 'savedQuestions');
};

// Template event listeners
document.getElementById('hypothesisTemplate').addEventListener('change', function() {
    const template = this.value;
    const ifPart = document.getElementById('ifPart');
    const thenPart = document.getElementById('thenPart');

    if (template) {
        const parts = template.split('[condition]');
        ifPart.value = parts[0];
        thenPart.value = parts[1].replace(' [result].', '');
    } else {
        ifPart.value = '';
        thenPart.value = '';
    }
});

document.getElementById('questionTemplate').addEventListener('change', function() {
    const template = this.value;
    const questionPart = document.getElementById('questionPart');

    if (template) {
        questionPart.value = template.replace('[variable]', '');
    } else {
        questionPart.value = '';
    }
});
