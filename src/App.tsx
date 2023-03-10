import { useState } from 'react';
import QuestionCard from "./components/QuestionCard";
import { fetchQuizQuestions } from './API';
import { QuestionState, Difficulty } from './API';

const TOTAL_QUESTIONS = 10;

export type AnswerObject = {
  question: string,
  answer: string,
  correct: boolean,
  correctAnswer: string,
}

function App() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  //console.log(fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY));


  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);
    const newQuestions = await fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY);
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    //getting users answer
    const answer=e.currentTarget.value;
    //checking if it is the correct:
    const correct=questions[number].correct_answer===answer;
    if(correct) setScore(preVal=>preVal+1);
    const answerObject={
      question:questions[number].question,
      answer,
      correct,
      correctAnswer:questions[number].correct_answer
    };
    setUserAnswers((preVal)=>[...preVal,answerObject]);
  }

  const nextQuestion = () => {
    const nextQuestion=number+1;
    //checking if im at the last question:
    if(nextQuestion===TOTAL_QUESTIONS){
      setGameOver(true)
    }else{
      setNumber(nextQuestion);
    }
  }

  return (
    <div className="App">
      <h1>React quiz</h1>
      {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (<button className="start" onClick={startTrivia}>
        Start trivia
      </button>) : null}
      {!gameOver ? (<p className="score">Score: {score}</p>) : null}
      {loading ? (<p>Loading question...</p>):null}
      {!loading && !gameOver && <QuestionCard
         questionNr={number+1}
         totalQuestions={TOTAL_QUESTIONS}
         question={questions[number].question}
         answers={questions[number].answers}
         userAnswer={userAnswers? userAnswers[number]:undefined}
         callback={checkAnswer}
      />}
      {/*Checking if my user has at least responded to something, and that im not at my last question*/}
      {!gameOver && !loading && userAnswers.length===number+1 &&number!==TOTAL_QUESTIONS-1 ? (<button className="next" onClick={nextQuestion}>
        Next question
      </button>):null}
    </div>
  );
}

export default App;
