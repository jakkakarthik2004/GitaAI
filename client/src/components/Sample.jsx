// import React from 'react'
// import { useForm } from 'react-hook-form'
// import { useState } from 'react'
// import axios from 'axios';

// function Sample() {

//     let {register,handleSubmit}=useForm()

//     const data=useState({})

//     async function formSubmit(data){
//       try{
//         const result =await axios .get('http://localhost:4000/gemini-api/sample',data);
//         if(result.data.message==='successfully generated'){
//           // console.log(result.data.message)
//           data(result.data.message)
//         }
//         else{
//           console.log(result.data.message)
//           alert(result.data.message)
//         }
//       }
//       catch(err){
//         console.error(err);
//       }
//     }
    
//   return (
//     <div>
//         <form onSubmit={handleSubmit(formSubmit)} >
//             <input type="text" placeholder='enter promt' {...register('promt',{required:true})} />
//             <button>Submit</button>
//             {
//               data.length>0 && <h1>{data}</h1>
//             }
//         </form>
//     </div>
//   )
// }

// export default Sample
// import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import axios from 'axios';

// function Sample() {
//   const { register, handleSubmit } = useForm();
//   const [responseData, setResponseData] = useState(''); // State to store the API response

//   async function formSubmit(data) {
//     try {
//       console.log(data);
//       const result = await axios.get('http://localhost:4000/gemini-api/sample', { params: data });
//       if (result.data.message === 'successfully generated') {
//         setResponseData(result.data.data); // Update state with the message
//       } else {
//         console.log(result.data.message);
//         alert(result.data.message);
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   }

//   return (
//     <div>
//       <form onSubmit={handleSubmit(formSubmit)}>
//         <input
//           type="text"
//           placeholder="enter prompt"
//           {...register('prompt', { required: true })}
//         />
//         <button type="submit">Submit</button>
//       </form>
//       {responseData && <h1>{responseData}</h1>} {/* Render the response */}
//     </div>
//   );
// }

// export default Sample;
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

function Sample() {
  const { register, handleSubmit } = useForm();
  const [responseData, setResponseData] = useState(''); // State to store the API response

  async function formSubmit(data) {
    try {
      const result = await axios.get('http://localhost:4000/gemini-api/sample', { params: data });
      if (result.data.message === 'successfully generated') {
        setResponseData(result.data.data); // Update state with the generated text
      } else {
        console.log(result.data.message);
        alert(result.data.message);
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(formSubmit)}>
        <input
          type="text"
          placeholder="enter prompt"
          {...register('promt', { required: true })}
        />
        <button type="submit">Submit</button>
      </form>
      {responseData && <h1>{responseData}</h1>} {/* Render the response text */}
    </div>
  );
}

export default Sample;
