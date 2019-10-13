// javascript document
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const optionA = document.getElementById("A");
const optionB = document.getElementById("B");
const optionC = document.getElementById("C");
const counter = document.getElementById("counter");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");


let questions = [
    {
        question : "What is the surname of Merry from 'The Lord of the Rings'?",
        optionA : "Brandybuck",
        optionB : "Buckleberry",
        optionC : "Brandywine",
        correct : "A"
    }, {
        question : "How old is Aragorn?",
        optionA : "45",
        optionB : "87",
        optionC : "60",
        correct : "B"
    }, {
        question : "What is the name of Frodo's sword?",
        optionA : "Lil fella",
        optionB : "Stabby",
        optionC : "Sting",
        correct : "C"
    }, {
        question : "How tall is Minas Tirith?",
        optionA : "300 feet",
        optionB : "500 feet",
        optionC : "250 feet",
        correct : "A"
    },{
        question : "How many Academy Awards did 'The Lord of the Rings' trilogy win?",
        optionA : "10",
        optionB : "17",
        optionC : "8",
        correct : "B"
    }
];


const lastQuestion = questions.length - 1;
let currentQuestion = 0;
let count = 0;
const questionTime = 15; 
let TIMER;
let score = 0;

function renderQuestion(){
    let q = questions[currentQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    optionA.innerHTML = q.optionA;
    optionB.innerHTML = q.optionB;
    optionC.innerHTML = q.optionC;
};

start.addEventListener("click",startQuiz);

function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); 
};

function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
};

function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        count++
    } else{
        count = 0;
        answerIsWrong();
        if(currentQuestion < lastQuestion){
            currentQuestion++;
            renderQuestion();
        } else{
            clearInterval(TIMER);
            scoreRender();
        }
    };
};

function checkAnswer(answer){
    if(answer == questions[currentQuestion].correct){
        score++;
        answerIsCorrect();
    }else{
        answerIsWrong();
    };
    count = 0;
    if(currentQuestion < lastQuestion){
        currentQuestion++;
        renderQuestion();
    }else{
        clearInterval(TIMER);
        scoreRender();
    };
};

function answerIsCorrect(){
    document.getElementById(currentQuestion).style.backgroundColor = "#0f0";
};

function answerIsWrong(){
    document.getElementById(currentQuestion).style.backgroundColor = "#f00";
};

function scoreRender(){
    scoreDiv.style.display = "block";
    
    const scorePerCent = Math.round(100 * score/questions.length);

    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
};