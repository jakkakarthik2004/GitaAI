import React, { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'

import { useForm } from "react-hook-form";
import { FaRegCircle } from "react-icons/fa";
import { CiCircleCheck } from "react-icons/ci";
import { BiSolidCoinStack } from "react-icons/bi";

function QuizPage() {

    const [quiz, setQuiz] = useState([])

    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();
    const [quizIndex, setQuizIndex] = useState(0);
    const [quizId, setQuizId] = useState('');
    const [score, setScore] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]);
    const [quizDone, setQuizDone] = useState(false);
    const [circle, setCircle] = useState(null);
    const [leaderBoard,setLeaderBoard] = useState([]);
    const [formDone,setFormDone] = useState(false);

    
    async function onSubmit(data) {
        console.log(data);
        setQuizId(data.id);
        setQuizDone(false);
        setFormDone(true);
        setQuizIndex(0);
        setScore(0);
        setUserAnswers([]);
        axios
          .post(`http://localhost:4000/quiz-api/create/${data.chapter}`)
          .then((res) => setQuiz(res.data.quiz))
          .catch((err) => console.log(err));
      }


      function insertuserAnswers(questionIndex, option) {
        for (let i = 0; i < userAnswers.length; i++) {
          if (userAnswers[i].questionIndex === questionIndex) {
            userAnswers[i].option = option;
            console.log(userAnswers);
            return;
          }
        }
        console.log(userAnswers);
        setUserAnswers([...userAnswers, { questionIndex, option }]);
      }
    
      function eraseInsertedAnswers(questionIndex) {
        for (let i = 0; i < userAnswers.length; i++) {
          if (userAnswers[i].questionIndex === questionIndex) {
            userAnswers[i].option.option = null;
            console.log(userAnswers);
            return;
          }
        }
      }
  
      async function evaluateQuiz() {

        console.log("evaluating user answers ",userAnswers);
    
        let score = 0;
    
        for (let i = 0; i < userAnswers.length; i++) {
          console.log("here");
          if (
            quiz[userAnswers[i].questionIndex].answer === userAnswers[i].option.option
          ) {
            score+=1;
            console.log(quiz[userAnswers[i].questionIndex].answer);
          }
        }
        setQuizDone(true);
        setScore(score)
        
    
        console.log("score",score)
    
      }

  return (
    <div>
      <h1 className='bg-zinc-900 text-center text-white text-3xl pt-10'>Bhagavath Gita Quiz Generation</h1>
      {
        quiz.length>0?(
          <div className='h-screen bg-zinc-900 text-white p-20'>
            {
              quizDone ?(
                <div className='' >
                  <h1 className='text-3xl m-auto text-center'>Score : {score}</h1>
                </div>
              ):(
                <div className='w-3/5 m-auto'>
              <h5>
              <div className="text-white  p-7 border-b-2 border-blue-950 rounded-[20px] " style={{boxShadow:"rgb(38, 57, 77) 0px 20px 30px -10px"}} onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "rgb(38, 57, 77) 0px 30px 40px -10px";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "rgb(38, 57, 77) 0px 20px 30px -10px";
                }}>
                  <h4 className="text-xl " >{quizIndex+1}. {quiz[quizIndex].question}</h4>
  
                  {/* Iterate over the array of options for the current question */}
                  <ul className="pt-2">
                    {quiz[quizIndex].options.map((option, index) => (
                      <li key={index} className="p-2 ps-0 text-lg">
                        <div className="inline">
                          {circle === index ? (
                            <CiCircleCheck
                              size={24}
                              onClick={() => {
                                setCircle(null);
                                eraseInsertedAnswers(quizIndex);
                              }}
                              className="inline me-2 hover:text-blue-500 cursor-pointer"
                            />
                          ) : (
                            <FaRegCircle
                              size={18}
                              onClick={() => {
                                setCircle(index);
                                insertuserAnswers(quizIndex, { option });
                              }}
                              className="inline me-2 hover:text-blue-500 cursor-pointer"
                            />
                          )}
                          <div className="inline hover:text-blue-500 cursor-pointer" onClick={() => {insertuserAnswers(quizIndex, { option });circle === index ? setCircle(null) : setCircle(index)}} >
                            {option}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
  
                  {/* Navigation buttons to switch between questions */}
                  <div className="mt-4">
                    <button
                      className="mr-5 border-b-2 border-blue-950 px-4 py-1 rounded-md text-white hover:border-blue-500 hover:text-blue-500"
                      style={{boxShadow:"rgb(38, 57, 77) 0px 20px 30px -10px"}}
                      onClick={() =>
                        setQuizIndex((prevIndex) => Math.max(prevIndex - 1, 0))
                      }
                      disabled={quizIndex === 0}
                    >
                      Previous
                    </button>
                    {quizIndex === quiz.length - 1 ? (
                      <button
                        className="border-b-2 border-blue-950 px-4 py-1 rounded-md text-white hover:border-blue-500 hover:text-blue-500"
                        style={{boxShadow:"rgb(38, 57, 77) 0px 20px 30px -10px"}}
                        onClick={() => evaluateQuiz()}
                      >
                        End quiz
                      </button>
                    ) : (
                      <button
                        className="border-b-2 border-blue-950 px-4 py-1 rounded-md text-white hover:border-blue-500 hover:text-blue-500"
                        style={{boxShadow:"rgb(38, 57, 77) 0px 20px 30px -10px"}}
                        onClick={() =>
                        {
                          setQuizIndex((prevIndex) => prevIndex + 1);
                          setCircle(null);
                        }
                        }
                        disabled={quizIndex === quiz.length - 1}
                      >
                        Next
                      </button>
                    )}
                  </div>
                </div>
              </h5>
              </div>
              )
            }
          </div>
        ):(

          <div>
            {
              formDone?(
                <div className='h-screen bg-zinc-900 p-28'>
                  <div className='w-2/5 m-auto text-white flex justify-center py-2 rounded-full' style={{boxShadow: "rgba(0, 0, 0, 0.56) 0px 22px 70px 4px"}}>
                                  <img src='https://i.gifer.com/ZKZg.gif' width={40} alt="" />
                                  <div className='w-3/5'>
                            <h4 className='ps-5 text-2xl mt-1 '>Generating quiz</h4>
                  </div>
                  </div>
                </div>
              ):
              (
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className='h-screen bg-zinc-900 p-28'>
                  <div className='w-3/5 m-auto'>
                  <input type="text" placeholder='Enter Chapter numer' className='ms-52 border-b-2 border-blue-950 px-4 py-1 rounded-md text-black hover:border-blue-500' {...register('chapter', { required: true })} />
                  <button className='button bg-blue-950 text-white px-2 py-1 rounded-md ms-5'>Generate</button>
                  </div>
                </div>
              </form>
              )
            }
            
          </div>
        )
      }
    </div>
  )
}

export default QuizPage