# QuizMaster - Interactive Quiz Application

A comprehensive, responsive quiz application built with HTML, CSS, and JavaScript that allows users to test their knowledge in HTML, CSS, and JavaScript.

## Project Structure

├── index.html          # Main HTML structure
├── styles.css          # All CSS styling and responsive design
├── quiz-data.js        # Quiz questions and answers data
├── script.js           # Main application logic and functionality
└── README.md           # Project documentation
```

 Files Description

 1. `index.html`
- **Purpose**: Main HTML structure and layout
- **Content**: HTML markup for all quiz sections (landing, quiz, results, leaderboard)
- **Dependencies**: Links to external CSS and JavaScript files

 2. `styles.css`
- **Purpose**: Complete styling and responsive design
- **Content**: All CSS rules, animations, media queries, and   responsive breakpoints
- **Features**: 
  - Modern gradient backgrounds
  - Hover effects and transitions
  - Responsive grid layouts
  - Mobile-first approach

### 3. `quiz-data.js`
- **Purpose**: Quiz content and data structure
- **Content**: JavaScript array containing all quiz questions, options, and correct answers
- **Subjects**: HTML (10 questions), CSS (10 questions), JavaScript (10 questions)
- **Structure**: Each question has options array and single correct answer index

### 4. `script.js`
- **Purpose**: Application logic and functionality
- **Content**: 
  - DOM manipulation
  - Event handling
  - Timer functionality
  - Score calculation
  - Leaderboard management
  - Local storage operations

## Features

**Quiz Structure**
- 3 subjects (HTML, CSS, JavaScript)
- 10 MCQs per subject
- Subject selection before starting

**Core Features**
- 15-second countdown timer per question
- Auto-advance when timer expires
- Next/Previous navigation
- Score calculation with percentage
- Answer highlighting
- localStorage leaderboard (top 5 scores)

 **Design & Styling**
- Pure CSS (no frameworks)
- Responsive design (Desktop/Tablet/Mobile)
- CSS animations and hover effects
- Modern UI/UX design

**Additional Features**
- Single correct answer per question
- Answer validation required
- Quiz retake functionality
- Subject selection options
- Landing page and leaderboard page

## How to Use

1. **Open `index.html`** in a web browser
2. **Choose a subject** from the landing page
3. **Answer questions** within the 15-second time limit
4. **Navigate** between questions using Previous/Next buttons
5. **View results** and save score to leaderboard
6. **Check leaderboard** for top scores

## Browser Compatibility

- Modern browsers with ES6+ support
- Responsive design works on all devices
- localStorage for data persistence
- CSS Grid and Flexbox support


## Development Notes

- **No external dependencies** (except Font Awesome CDN for icons)
- **Modular structure** for easy maintenance
- **Clean separation** of concerns
- **Extensible design** for adding more subjects/questions

