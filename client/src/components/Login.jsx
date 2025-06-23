import React from 'react'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import { useNavigate } from "react-router-dom";

function Login() {

  const {register, handleSubmit, formState: {errors}} = useForm()


  const navigate = useNavigate();


  async function formSubmit(data){
    try{
      const result =await axios .post('http://localhost:4000/user-api/login',data);
      console.log(result.data.message)
      if(result.data.message==='login success'){
        alert('login successfull')
        navigate('/chapters')
      }
      else if(result.data.message==='Invalid Email'){
        alert('Invalid Email')
      }
      else if(result.data.message==='Invalid Password'){
        alert('password not matched')
      }
      else{
        alert('error in login')
      }
    }
    catch(err){
      console.error(err);
    }
  }



  return (
    <div className="h-screen bg-black flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-zinc-900 py-8 px-4 sm:rounded-lg sm:px-10">
          <form className="" method="POST" action="#" onSubmit={handleSubmit(formSubmit)} >
            <div className="mt-6">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-5 text-white"
              >
                Email address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  id="email"
                  name="email"
                  placeholder="user@example.com"
                  type="email"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  {...register("emailId", {required: true})}
                />
              </div>
            </div>

            <div className="mt-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-5 text-white"
              >
                Password
              </label>
              <div className="mt-1 rounded-md shadow-sm">
                <input
                  id="password"
                  name="password"
                  type="password"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  {...register("password", {required: true})}
                />
              </div>
            </div>
            <div className="mt-6 mb-4">
              <span className="block w-full rounded-md shadow-sm">
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-indigo active:bg-red-700 transition duration-150 ease-in-out"
                >
                 Login
                </button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login