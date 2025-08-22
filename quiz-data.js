// Quiz data
const quizData = {
    html: [
        {
            question: "What does HTML stand for?",
            options: [
                "Hyper Text Markup Language",
                "High Tech Modern Language",
                "Hyper Transfer Markup Language",
                "Home Tool Markup Language"
            ],
            correct: 0
        },
        {
            question: "Which tag is used to create a hyperlink in HTML?",
            options: [
                "<link>",
                "<a>",
                "<href>",
                "<hyperlink>"
            ],
            correct: 1
        },
        {
            question: "Which attribute is used to specify an alternate text for an image?",
            options: [
                "src",
                "alt",
                "title",
                "href"
            ],
            correct: 1
        },
        {
            question: "Which tag is used to define an unordered list?",
            options: [
                "<ol>",
                "<ul>",
                "<li>",
                "<list>"
            ],
            correct: 1
        },
        {
            question: "Which character is used to indicate an end tag?",
            options: [
                "*",
                "/",
                "<",
                ">"
            ],
            correct: 1
        },
        {
            question: "Which element is used for the largest heading?",
            options: [
                "<h6>",
                "<head>",
                "<heading>",
                "<h1>"
            ],
            correct: 3
        },
        {
            question: "Which tag is used to define a table row?",
            options: [
                "<td>",
                "<th>",
                "<tr>",
                "<table>"
            ],
            correct: 2
        },
        {
            question: "Which attribute is used to define inline styles?",
            options: [
                "class",
                "styles",
                "style",
                "font"
            ],
            correct: 2
        },
        {
            question: "Which input type defines a slider control?",
            options: [
                "search",
                "range",
                "slider",
                "controls"
            ],
            correct: 1
        },
        {
            question: "Which tag is used to define a paragraph?",
            options: [
                "<para>",
                "<paragraph>",
                "<p>",
                "<text>"
            ],
            correct: 2
        }
    ],
    css: [
        {
            question: "What does CSS stand for?",
            options: [
                "Creative Style Sheets",
                "Cascading Style Sheets",
                "Computer Style Sheets",
                "Colorful Style Sheets"
            ],
            correct: 1
        },
        {
            question: "Which property is used to change the background color?",
            options: [
                "color",
                "bgcolor",
                "background-color",
                "background"
            ],
            correct: 2
        },
        {
            question: "How do you add a comment in CSS?",
            options: [
                "/* this is a comment */",
                "// this is a comment",
                "<!-- this is a comment -->",
                "' this is a comment"
            ],
            correct: 0
        },
        {
            question: "Which property is used to change the font of an element?",
            options: [
                "font-style",
                "font-weight",
                "font-family",
                "text-font"
            ],
            correct: 2
        },
        {
            question: "How do you select an element with id 'demo'?",
            options: [
                ".demo",
                "#demo",
                "*demo",
                "demo"
            ],
            correct: 1
        },
        {
            question: "Which property is used to change the left margin of an element?",
            options: [
                "margin-left",
                "padding-left",
                "indent",
                "left-margin"
            ],
            correct: 0
        },
        {
            question: "How do you make each word in a text start with a capital letter?",
            options: [
                "text-transform: capitalize",
                "text-style: capital",
                "transform: capitalize",
                "font-capital: true"
            ],
            correct: 0
        },
        {
            question: "Which property is used to change the text color of an element?",
            options: [
                "text-color",
                "color",
                "font-color",
                "text-style"
            ],
            correct: 1
        },
        {
            question: "Which property controls the text size?",
            options: [
                "text-size",
                "font-size",
                "text-style",
                "size"
            ],
            correct: 1
        },
        {
            question: "How do you display a border like this: top=10px, bottom=15px, left=5px, right=20px?",
            options: [
                "border-width: 10px 20px 15px 5px",
                "border-width: 10px 15px 5px 20px",
                "border-width: 10px 5px 15px 20px",
                "border-width: 10px 20px 5px 15px"
            ],
            correct: 0
        }
    ],
    javascript: [
        {
            question: "Which of the following is a JavaScript data type?",
            options: [
                "style",
                "boolean",
                "div",
                "class"
            ],
            correct: 1
        },
        {
            question: "How do you create a function in JavaScript?",
            options: [
                "function = myFunction()",
                "function myFunction()",
                "function:myFunction()",
                "create myFunction()"
            ],
            correct: 1
        },
        {
            question: "How do you call a function named 'myFunction'?",
            options: [
                "call myFunction()",
                "myFunction()",
                "call function myFunction()",
                "myFunction"
            ],
            correct: 1
        },
        {
            question: "How to write an IF statement in JavaScript?",
            options: [
                "if i == 5 then",
                "if (i == 5)",
                "if i = 5",
                "if i = 5 then"
            ],
            correct: 1
        },
        {
            question: "How does a WHILE loop start?",
            options: [
                "while (i <= 10)",
                "while i = 1 to 10",
                "while (i <= 10; i++)",
                "while (i <= 10) then"
            ],
            correct: 0
        },
        {
            question: "How can you add a comment in JavaScript?",
            options: [
                "//This is a comment",
                "'This is a comment",
                "<!--This is a comment-->",
                "*This is a comment*"
            ],
            correct: 0
        },
        {
            question: "How do you declare a JavaScript variable?",
            options: [
                "variable carName;",
                "v carName;",
                "var carName;",
                "let carName;"
            ],
            correct: 3
        },
        {
            question: "Which operator is used to assign a value to a variable?",
            options: [
                "*",
                "=",
                "-",
                "x"
            ],
            correct: 1
        },
        {
            question: "What will the following code return: Boolean(10 > 9)",
            options: [
                "true",
                "false",
                "NaN",
                "undefined"
            ],
            correct: 0
        },
        {
            question: "Which method can be used to convert a string to a number?",
            options: [
                "toNumber()",
                "parseInt()",
                "changeNumber()",
                "int()"
            ],
            correct: 1
        }
    ]
};
