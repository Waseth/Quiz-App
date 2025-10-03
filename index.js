const questions = [
    // Question 1
    {
        question: "Who is the greatest footballer of all time?",
        answers:[
            {text:"Diego Maradona", correct:false},
            {text:"Lionel Messi", correct:true},
            {text:"Cristiano Ronaldo", correct:false},
            {text:"Pele", correct:false},
        ]
    },
    // Question 2
    {
        question: "Who won the ballon D'or in 2025",
        answers:[
            {text:"Ousmane Dembele", correct:true},
            {text:"Lamine Yamal", correct:false},
            {text:"Lionel Messi", correct:false},
            {text:"Cristiano Ronaldo", correct:false},
        ]
    },
    // Question 3
    {
        question: "Which is the largest animal in the world?",
        answers:[
            {text:"Shark", correct:false},
            {text:"Blue Whale", correct:true},
            {text:"Elephant", correct:false},
            {text:"Giraffe", correct:false},
        ]
    },
    // Question 4
    {
        question: "Which is the largest desert in the world?",
        answers:[
            {text:"Kalahari", correct:false},
            {text:"Sahara", correct:false},
            {text:"Antarctica", correct:true},
            {text:"Gobi", correct:false},
        ]
    }
];

const questionElem = document.getElementById("question");
const answerBtn = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}
function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElem.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
        const button =document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerBtn.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    })
}
function resetState(){
    nextButton.style.display= "none";
    while(answerBtn.firstChild){
        answerBtn.removeChild(answerBtn.firstChild);
    }
}
function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score ++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerBtn.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    })
    nextButton.style.display = "block";
}
function showScore(){
    resetState();
    questionElem.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again"
    nextButton.style.display ="block";
}
function handleNextBtn(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }

}
nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextBtn();
    }else{
        startQuiz();
    }
})

startQuiz();