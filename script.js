// DOM elements
const landingContainer = document.getElementById('landing-container');
const quizContainer = document.getElementById('quiz-container');
const resultsContainer = document.getElementById('results-container');
const leaderboardContainer = document.getElementById('leaderboard-container');

const subjectCards = document.querySelectorAll('.subject-card');
const viewLeaderboardBtn = document.getElementById('view-leaderboard');
const backToHomeBtn = document.getElementById('back-to-home');

const quizSubject = document.getElementById('quiz-subject');
const timerElement = document.getElementById('timer');
const progressBar = document.getElementById('progress-bar');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const submitBtn = document.getElementById('submit-btn');

const scoreDisplay = document.getElementById('score-display');
const percentageDisplay = document.getElementById('percentage');
const usernameInput = document.getElementById('username');
const saveScoreBtn = document.getElementById('save-score');
const retryQuizBtn = document.getElementById('retry-quiz');
const chooseSubjectBtn = document.getElementById('choose-subject');

const leaderboardBody = document.getElementById('leaderboard-body');

// Quiz state variables
let currentSubject = null;
let currentQuestions = [];
let currentQuestionIndex = 0;
let userAnswers = [];
let score = 0;
let timer = null;
let timeLeft = 15;

// Initialize the application
function init() {
    // Add event listeners to subject cards
    subjectCards.forEach(card => {
        card.addEventListener('click', () => {
            currentSubject = card.getAttribute('data-subject');
            startQuiz();
        });
    });
    
    // Event listeners for navigation buttons
    viewLeaderboardBtn.addEventListener('click', showLeaderboard);
    backToHomeBtn.addEventListener('click', showLanding);
    
    prevBtn.addEventListener('click', showPreviousQuestion);
    nextBtn.addEventListener('click', showNextQuestion);
    submitBtn.addEventListener('click', showResults);
    
    saveScoreBtn.addEventListener('click', saveScore);
    retryQuizBtn.addEventListener('click', retryQuiz);
    chooseSubjectBtn.addEventListener('click', showLanding);
    
    // Load leaderboard data
    loadLeaderboard();
}

// Start the quiz
function startQuiz() {
    currentQuestions = quizData[currentSubject];
    currentQuestionIndex = 0;
    userAnswers = new Array(currentQuestions.length).fill(null);
    score = 0;
    
    // Clear any existing results data
    clearResultsData();
    
    // Update UI
    quizSubject.textContent = `${currentSubject.toUpperCase()} Quiz`;
    landingContainer.style.display = 'none';
    quizContainer.style.display = 'block';
    resultsContainer.style.display = 'none';
    leaderboardContainer.style.display = 'none';
    
    showQuestion();
    startTimer();
}

// Show current question
function showQuestion() {
    const question = currentQuestions[currentQuestionIndex];
    questionText.textContent = question.question;
    
    // Clear previous options
    optionsContainer.innerHTML = '';
    
    // Add new options
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.classList.add('option');
        
        // Check if this option was previously selected
        if (userAnswers[currentQuestionIndex] === index) {
            optionElement.classList.add('selected');
        }
        
        optionElement.textContent = option;
        optionElement.addEventListener('click', () => selectOption(index));
        optionsContainer.appendChild(optionElement);
    });
    
    // Update navigation buttons
    prevBtn.disabled = currentQuestionIndex === 0;
    nextBtn.disabled = false;
    
    if (currentQuestionIndex === currentQuestions.length - 1) {
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'inline-block';
        
        // Check if all questions are answered before enabling submit
        const allAnswered = userAnswers.every(answer => answer !== null);
        submitBtn.disabled = !allAnswered;
    } else {
        nextBtn.style.display = 'inline-block';
        submitBtn.style.display = 'none';
    }
    
    // Update progress bar
    const progress = ((currentQuestionIndex + 1) / currentQuestions.length) * 100;
    progressBar.style.width = `${progress}%`;
}

// Select an option
function selectOption(optionIndex) {
    userAnswers[currentQuestionIndex] = optionIndex;
    
    // Update UI to show selected option
    const options = optionsContainer.querySelectorAll('.option');
    options.forEach((option, index) => {
        if (index === optionIndex) {
            option.classList.add('selected');
        } else {
            option.classList.remove('selected');
        }
    });
    
    // Update submit button state if on last question
    if (currentQuestionIndex === currentQuestions.length - 1) {
        const allAnswered = userAnswers.every(answer => answer !== null);
        submitBtn.disabled = !allAnswered;
    }
}

// Show next question
function showNextQuestion() {
    // Check if user has selected an option for current question
    if (userAnswers[currentQuestionIndex] === null) {
        showWarningMessage("Please select an option before proceeding to the next question.");
        return; // Don't proceed
    }
    
    resetTimer();
    currentQuestionIndex++;
    showQuestion();
    startTimer();
}

// Show previous question
function showPreviousQuestion() {
    resetTimer();
    currentQuestionIndex--;
    showQuestion();
    startTimer();
}

// Start the timer
function startTimer() {
    timeLeft = 15;
    updateTimerDisplay();
    
    timer = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            // If no answer selected, mark as incorrect and move to next
            if (userAnswers[currentQuestionIndex] === null) {
                userAnswers[currentQuestionIndex] = -1; // Mark as unanswered
            }
            if (currentQuestionIndex < currentQuestions.length - 1) {
                showNextQuestion();
            } else {
                showResults();
            }
        }
    }, 1000);
}

// Reset the timer
function resetTimer() {
    clearInterval(timer);
}

// Update timer display
function updateTimerDisplay() {
    timerElement.textContent = `${timeLeft}s`;
    
    // Change color based on time left
    if (timeLeft <= 5) {
        timerElement.classList.add('danger');
        timerElement.classList.remove('warning');
    } else if (timeLeft <= 10) {
        timerElement.classList.add('warning');
        timerElement.classList.remove('danger');
    } else {
        timerElement.classList.remove('warning', 'danger');
    }
}

// Show results
function showResults() {
    resetTimer();
    
    // Calculate score
    score = 0;
    let unansweredCount = 0;
    currentQuestions.forEach((question, index) => {
        if (userAnswers[index] === question.correct) {
            score++;
        } else if (userAnswers[index] === null || userAnswers[index] === -1) {
            unansweredCount++;
        }
    });
    
    const percentage = (score / currentQuestions.length) * 100;
    
    // Clear any existing breakdown first
    const existingBreakdown = document.querySelector('.score-breakdown');
    if (existingBreakdown) {
        existingBreakdown.remove();
    }
    
    // Update UI
    scoreDisplay.textContent = `Score: ${score}/${currentQuestions.length}`;
    percentageDisplay.textContent = `Percentage: ${percentage.toFixed(1)}%`;
    
    // Show answer breakdown
    const correctCount = score;
    const incorrectCount = currentQuestions.length - score - unansweredCount;
    
    const breakdownDiv = document.createElement('div');
    breakdownDiv.className = 'score-breakdown';
    breakdownDiv.style.cssText = `
        display: flex;
        justify-content: center;
        gap: 20px;
        margin: 20px 0;
        flex-wrap: wrap;
    `;
    
    // Correct answers
    const correctDiv = document.createElement('div');
    correctDiv.style.cssText = `
        background: #d4edda;
        color: #155724;
        padding: 10px 20px;
        border-radius: 25px;
        font-weight: bold;
        border: 2px solid #c3e6cb;
    `;
    correctDiv.innerHTML = `✓ Correct: ${correctCount}`;
    breakdownDiv.appendChild(correctDiv);
    
    // Incorrect answers
    if (incorrectCount > 0) {
        const incorrectDiv = document.createElement('div');
        incorrectDiv.style.cssText = `
            background: #f8d7da;
            color: #721c24;
            padding: 10px 20px;
            border-radius: 25px;
            font-weight: bold;
            border: 2px solid #f5c6cb;
        `;
        incorrectDiv.innerHTML = `✗ Incorrect: ${incorrectCount}`;
        breakdownDiv.appendChild(incorrectDiv);
    }
    
    // Unanswered questions
    if (unansweredCount > 0) {
        const unansweredDiv = document.createElement('div');
        unansweredDiv.style.cssText = `
            background: #fff3cd;
            color: #856404;
            padding: 10px 20px;
            border-radius: 25px;
            font-weight: bold;
            border: 2px solid #ffeaa7;
        `;
        unansweredDiv.innerHTML = `⚠ Not Answered: ${unansweredCount}`;
        breakdownDiv.appendChild(unansweredDiv);
    }
    
    scoreDisplay.parentNode.insertBefore(breakdownDiv, scoreDisplay.nextSibling);
    
    // Add toggle button for answers review
    addAnswersToggleButton();
    
    quizContainer.style.display = 'none';
    resultsContainer.style.display = 'block';
}

// Display questions with answer highlighting
function displayResultsWithAnswers() {
    const resultsContainer = document.getElementById('results-container');
    
    // Find or create the questions review section
    let questionsReview = document.getElementById('questions-review');
    if (!questionsReview) {
        questionsReview = document.createElement('div');
        questionsReview.id = 'questions-review';
        questionsReview.className = 'questions-review';
        resultsContainer.appendChild(questionsReview);
    }
    
    // Clear previous content
    questionsReview.innerHTML = '';
    
    // Initially hide the review section
    questionsReview.style.display = 'none';
    
    // Add heading
    const reviewHeading = document.createElement('h3');
    reviewHeading.textContent = 'Question Review';
    reviewHeading.style.marginTop = '30px';
    reviewHeading.style.marginBottom = '20px';
    reviewHeading.style.color = '#6a11cb';
    questionsReview.appendChild(reviewHeading);
    
    // Display each question with answers
    currentQuestions.forEach((question, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'review-question';
        questionDiv.style.cssText = `
            background: #f8f9fa;
            padding: 20px;
            border-radius: 10px;
            margin-bottom: 20px;
            border-left: 4px solid #e9ecef;
        `;
        
        // Question text
        const questionText = document.createElement('h4');
        questionText.textContent = `Question ${index + 1}: ${question.question}`;
        questionText.style.marginBottom = '15px';
        questionText.style.color = '#333';
        questionDiv.appendChild(questionText);
        
        // Options with highlighting
        question.options.forEach((option, optionIndex) => {
            const optionDiv = document.createElement('div');
            optionDiv.className = 'review-option';
            optionDiv.style.cssText = `
                padding: 10px 15px;
                margin: 5px 0;
                border-radius: 8px;
                border: 2px solid #e9ecef;
                background: white;
                position: relative;
            `;
            
            // Determine option styling based on correctness
            if (optionIndex === question.correct) {
                // Correct answer - always show in green
                optionDiv.style.borderColor = '#28a745';
                optionDiv.style.background = '#d4edda';
                optionDiv.style.color = '#155724';
                optionDiv.innerHTML = `${option} <span style="color: #28a745; font-weight: bold;">✓ Correct Answer</span>`;
            } else if (userAnswers[index] === optionIndex) {
                // User's wrong answer - show in red
                optionDiv.style.borderColor = '#dc3545';
                optionDiv.style.background = '#f8d7da';
                optionDiv.style.color = '#721c24';
                optionDiv.innerHTML = `${option} <span style="color: #dc3545; font-weight: bold;">✗ Your Answer</span>`;
            } else {
                // Other options - show in neutral gray
                optionDiv.style.borderColor = '#e9ecef';
                optionDiv.style.background = '#f8f9fa';
                optionDiv.style.color = '#6c757d';
                optionDiv.textContent = option;
            }
            
            questionDiv.appendChild(optionDiv);
        });
        
        // Add result indicator
        const resultIndicator = document.createElement('div');
        resultIndicator.style.cssText = `
            margin-top: 10px;
            font-weight: bold;
            font-size: 1.1rem;
        `;
        
        if (userAnswers[index] === question.correct) {
            resultIndicator.style.color = '#28a745';
            resultIndicator.textContent = '✓ Correct!';
        } else if (userAnswers[index] === null || userAnswers[index] === -1) {
            resultIndicator.style.color = '#ffc107';
            resultIndicator.textContent = '⚠ Not Answered';
        } else {
            resultIndicator.style.color = '#dc3545';
            resultIndicator.textContent = '✗ Incorrect';
            
            // Add explanation for wrong answers
            const explanation = document.createElement('div');
            explanation.style.cssText = `
                margin-top: 5px;
                font-size: 0.9rem;
                color: #6c757d;
                font-style: italic;
            `;
            explanation.textContent = `The correct answer was: "${question.options[question.correct]}"`;
            resultIndicator.appendChild(explanation);
        }
        
        questionDiv.appendChild(resultIndicator);
        questionsReview.appendChild(questionDiv);
    });
}

// Clear results data when starting new quiz
function clearResultsData() {
    // Clear any existing score breakdown
    const existingBreakdown = document.querySelector('.score-breakdown');
    if (existingBreakdown) {
        existingBreakdown.remove();
    }
    
    // Clear any existing questions review
    const existingReview = document.getElementById('questions-review');
    if (existingReview) {
        existingReview.remove();
    }
    
    // Clear any existing toggle button
    const existingToggle = document.getElementById('toggle-answers');
    if (existingToggle) {
        existingToggle.remove();
    }
}

// Add toggle button for answers review
function addAnswersToggleButton() {
    const resultsContainer = document.getElementById('results-container');
    
    // Find or create the toggle button
    let toggleButton = document.getElementById('toggle-answers');
    if (!toggleButton) {
        toggleButton = document.createElement('button');
        toggleButton.id = 'toggle-answers';
        toggleButton.className = 'btn';
        toggleButton.style.cssText = `
            margin: 20px auto;
            display: block;
            background: #6a11cb;
        `;
        toggleButton.textContent = 'Show Answer Review';
        resultsContainer.appendChild(toggleButton);
        
        // Add event listener
        toggleButton.addEventListener('click', () => {
            let questionsReview = document.getElementById('questions-review');
            if (questionsReview && questionsReview.style.display !== 'none') {
                questionsReview.style.display = 'none';
                toggleButton.textContent = 'Show Answer Review';
            } else {
                if (!questionsReview) {
                    displayResultsWithAnswers();
                    // Show the review section immediately after creating it
                    questionsReview = document.getElementById('questions-review');
                    if (questionsReview) {
                        questionsReview.style.display = 'block';
                    }
                } else {
                    questionsReview.style.display = 'block';
                }
                toggleButton.textContent = 'Hide Answer Review';
            }
        });
    }
}

// Save score to leaderboard
function saveScore() {
    const username = usernameInput.value.trim() || 'Anonymous';
    const percentage = (score / currentQuestions.length) * 100;
    
    // Get existing leaderboard or create new one
    const leaderboard = JSON.parse(localStorage.getItem('quizLeaderboard')) || [];
    
    // Add new score
    leaderboard.push({
        name: username,
        subject: currentSubject.toUpperCase(),
        score: score,
        total: currentQuestions.length,
        percentage: percentage,
        date: new Date().toISOString()
    });
    
    // Sort by percentage (descending) and keep only top 5
    leaderboard.sort((a, b) => b.percentage - a.percentage);
    const topScores = leaderboard.slice(0, 5);
    
    // Save back to localStorage
    localStorage.setItem('quizLeaderboard', JSON.stringify(topScores));
    
    // Update leaderboard display
    loadLeaderboard();
    
    // Show confirmation message
    alert('Score saved to leaderboard!');
}

// Retry the quiz
function retryQuiz() {
    startQuiz();
}

// Show landing page
function showLanding() {
    // Clear any existing results data
    clearResultsData();
    
    landingContainer.style.display = 'block';
    quizContainer.style.display = 'none';
    resultsContainer.style.display = 'none';
    leaderboardContainer.style.display = 'none';
}

// Show leaderboard
function showLeaderboard() {
    // Clear any existing results data
    clearResultsData();
    
    landingContainer.style.display = 'none';
    quizContainer.style.display = 'none';
    resultsContainer.style.display = 'none';
    leaderboardContainer.style.display = 'block';
    
    loadLeaderboard();
}

// Load leaderboard data
function loadLeaderboard() {
    const leaderboard = JSON.parse(localStorage.getItem('quizLeaderboard')) || [];
    leaderboardBody.innerHTML = '';
    
    if (leaderboard.length === 0) {
        leaderboardBody.innerHTML = '<tr><td colspan="5" style="text-align: center;">No scores yet. Be the first!</td></tr>';
        return;
    }
    
    leaderboard.forEach((entry, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${entry.name}</td>
            <td>${entry.subject}</td>
            <td>${entry.score}/${entry.total}</td>
            <td>${entry.percentage.toFixed(1)}%</td>
        `;
        leaderboardBody.appendChild(row);
    });
}

// Show warning message
function showWarningMessage(message) {
    // Create warning element if it doesn't exist
    let warningElement = document.getElementById('warning-message');
    if (!warningElement) {
        warningElement = document.createElement('div');
        warningElement.id = 'warning-message';
        warningElement.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #ffc107;
            color: #856404;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            z-index: 1000;
            font-weight: bold;
            animation: slideIn 0.3s ease;
        `;
        document.body.appendChild(warningElement);
    }
    
    warningElement.textContent = message;
    warningElement.style.display = 'block';
    
    // Auto-hide after 3 seconds
    setTimeout(() => {
        warningElement.style.display = 'none';
    }, 3000);
}

// Add CSS animation for warning
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
`;
document.head.appendChild(style);

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', init);
