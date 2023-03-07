export enum Difficulty{
   EASY="easy",
   MEDIUM="medium",
   HARD="hard"
}

export const fetchQuizQuestions=async(amount:number,difficulty:Difficulty)=>{
   const endpoint=`https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
   //First waiting to fetch the endpoint and then wait for the json, all in the same line:
   const data=await (await fetch(endpoint)).json();
   console.log(data);
   
}