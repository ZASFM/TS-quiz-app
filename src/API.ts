import { shuffleArray } from "./utils"

export type Question={
   category:string,
   correct_answer:string,
   difficulty:string,
   incorrect_answers:string[],
   question:string,
   type:string
}

export type QuestionState=Question & {
   answers:string[]
}

export enum Difficulty{
   EASY="easy",
   MEDIUM="medium",
   HARD="hard"
}

export const fetchQuizQuestions=async(amount:number,difficulty:Difficulty)=>{
   const endpoint=`https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
   //First waiting to fetch the endpoint and then wait for the json, all in the same line:
   const data=await (await fetch(endpoint)).json();
   return data.results.map((question:Question)=>(
      {
         ...question,
         //I want to add the answers into a single answer property so I can later map through it:
         answers:shuffleArray([...question.incorrect_answers,question.correct_answer])
      }
   ))  
}