import React from "react";
import GoogleLogins from "./GoogleLogins";
import {useForm} from 'react-hook-form'
import axios from 'axios'
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  let {
    register,
    handleSubmit,
    formState:{errors}
  } = useForm();

  async function formSubmit(data){
    try{
      const result =await axios .post('http://localhost:4000/user-api/user',data);
      console.log(result)
      if(result.data.message==='User is created'){
        alert('user created')
        navigate('/otp',{state:{emailId:data.emailId}})
      }
      else if(result.data.message==='Password and confirm password should be same'){
        alert('password and confirm password should be same')
      }
      else if(result.data.message==='User existed'){
        alert('user existed')
      }
      else{
        alert('error in user cretion')
      }
    }
    catch(err){
      console.error(err);
    }
  }

  return (
    <div className="h-screen bg-black flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="font-extrabold text-transparent text-3xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 text-center">
          Create Account !
        </h1>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-zinc-900 py-8 px-4 sm:rounded-lg sm:px-10">
          <form className="" method="POST" action="#" onSubmit={handleSubmit(formSubmit)} >
            <div className="mt-6">
              <label
                htmlFor="emailId"
                className="block text-sm font-medium leading-5 text-white"
              >
                Email address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  id="emailId"
                  name="emailId"
                  placeholder="user@gmail.com"
                  type="email"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  {...register("emailId",{required:true})}
                />
              </div>
            </div>

            <div className="mt-6">
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-5 text-white"
              >
                User name
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  id="username"
                  name="username"
                  type="text"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  {...register("username",{required:true})}
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
                  {...register("password",{required:true})}
                />
              </div>
            </div>

            <div className="mt-6">
              <label
                htmlFor="password_confirmation"
                className="block text-sm font-medium leading-5 text-white"
              >
                Confirm Password
              </label>
              <div className="mt-1 rounded-md shadow-sm">
                <input
                  id="password_confirmation"
                  name="password_confirmation"
                  type="password"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  {...register("confirmPassword",{required:true})}
                />
              </div>
            </div>

            <div className="mt-6">
              <span className="block w-full rounded-md shadow-sm">
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-indigo active:bg-red-700 transition duration-150 ease-in-out"
                >
                  Create account
                </button>
                <GoogleLogins></GoogleLogins>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
