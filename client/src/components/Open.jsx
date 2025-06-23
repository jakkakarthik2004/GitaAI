import React from "react";
import {useNavigate} from 'react-router-dom'
function Open() {
  const navigate = useNavigate();

  return (
    <div className="back relative">
      <div className="flex justify-between mx-10">
        <h1 className="mains">Gita Ai</h1>
        <button
          style={{ height: "40px" }}
          className="mt-7 border border-red-500 bg-red-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-red-600 focus:outline-none focus:shadow-outline"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      </div>
      <div style={{height:"610px",marginLeft:"3.5rem",marginRight:"3.5rem"}} className="text-white text-center">
      <h1 style={{fontSize:"3.5rem",marginTop:"5.8rem"}} className="font-bold mb-4">Gita's wisdom guides seekers</h1>
      <h1 style={{fontSize:"1.5rem",marginBottom:"14px"}} className="">“It is better to live your own destiny imperfectly than to live an imitation of somebody else’s life with perfection.” – The Bhagavad Gita</h1>
      <button className="bg-white text-red-500 font-bold py-2 px-4 rounded"
        onClick={() => navigate("/register")}>
            Get Started
        </button>
      </div>
      
    </div>
  );
}

export default Open;
