

//create express mini user api App
const exp = require('express')
const geminiApp = exp.Router()
const { ObjectId } = require('mongodb');

const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

async function run(theme) {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    

    const prompt= `describe about ${theme} in a two paras`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();
    return result

    // console.log('Raw Response Text:', text); // Log the raw response for debugging

    // try {
    //     // Directly parse the JSON response into an object
    //     const parsedData = JSON.parse(text);

    //     // Check if the JSON has the expected structure
    //     if (parsedData && parsedData.quiz && Array.isArray(parsedData.quiz.questions)) {
    //         return parsedData.quiz.questions.map(question => ({
    //             question: question.question,
    //             options: question.options,
    //             answer: question.answer
    //         }));
    //     } else {
    //         console.warn('Unexpected JSON structure:', parsedData);
    //         return [];
    //     }
    // } catch (error) {
    //     console.error('Error parsing JSON:', error);
    //     return [];
    // }
}



//import asynchrous handler to handle asynchronous error
const expressAsyncHandler = require('express-async-handler');

require('dotenv').config()


// let quizcollection;
// let solvedquizzescollection;
// //get userCollection this app level middleware--- it is required by every route
// quizApp.use((req,res,next)=>{
//     quizcollection = req.app.get('quizcollection')
//     solvedquizzescollection = req.app.get('solvedquizzescollection')
//     next()
// })

geminiApp.get('/sample', expressAsyncHandler(async (req, res) => {
    let { promt } = req.query; // Use query parameters for GET

    const result = await run(promt);

    // Extract only the necessary data from the result
    if (result && result.response && result.response.text) {
        const text = result.response.text();
        res.send({ message: "successfully generated", data: text });
    } else {
        res.status(400).send({ message: "Failed to generate content" });
    }
}));



// quizApp.post('/create', expressAsyncHandler(async (req, res) => {
//     const { theme, username } = req.body;

    

//     const quizArray = await run(theme);





//     // Generate a MongoDB ObjectId
//     const quizId = new ObjectId(); // Creates a new MongoDB ObjectId

//     // Store the quiz with its unique ID in the database
//     await quizcollection.insertOne({
//         _id: quizId,
//         theme: theme,
//         creator: username,
//         questions: quizArray
//     });


//     // Send the unique ID to the client
//     res.send({ message: "Quiz created successfully", quizId: quizId.toString() });
// }));


// // GET request to fetch quizzes created by a specific user with only theme and quizId
// quizApp.get('/quizzes/:username', expressAsyncHandler(async (req, res) => {
//     const { username } = req.params;


//     // Fetch quizzes created by the specified user
//     const quizzes = await quizcollection.find({ creator: username }).toArray();

//     // Map the quizzes to include only the theme and _id (quizId)
//     const simplifiedQuizzes = quizzes.map(quiz => ({
//         quizId: quiz._id.toString(), // Convert ObjectId to string
//         theme: quiz.theme
//     }));

//     // Send the simplified quizzes to the client
//     res.send({ quizzes: simplifiedQuizzes, message: "quizes found" });
// }));

// quizApp.get('/solvedquizzes/:username', expressAsyncHandler(async (req, res) => {
//     const { username } = req.params;

//     // Fetch quizzes created by the specified user
//     const quizzes = await solvedquizzescollection.find({ username: username }).toArray();

//     // Map the quizzes to include only the theme and _id (quizId)
//     const simplifiedQuizzes = quizzes.map(quiz => ({
//         quizId: quiz._id.toString(), // Convert ObjectId to string
//         score: parseInt(quiz.score) 
//     }));

//     // Send the simplified quizzes to the client
//     res.send({ quizzes: simplifiedQuizzes, message: "quizes found" });
// }));


// //get quiz by id 
// quizApp.get('/quiz/:id', expressAsyncHandler(async (req, res) => {
//     const { id } = req.params;
//     try {
//         const quiz = await quizcollection.findOne({ _id: new ObjectId(id) });

//         if (!quiz) {
//             // If no quiz is found, respond with a 404 status and a message
//             return res.status(404).send({ message: 'Quiz not found' });
//         }
//         // If quiz is found, send it in the response
//         res.send({message:"quiz found", quiz: quiz.questions});
//     } catch (error) {
//         // Handle any potential errors, such as an invalid ObjectId
//         res.status(500).send({ message: 'Error retrieving quiz', error: error.message });
//     }
// }));

// //submit the quiz from frontend which sends username,quizid and score
// quizApp.post('/quiz/submit', expressAsyncHandler(async (req, res) => {
//     const { username, quizid, score } = req.body;
//     //use try and catch
//     try{

//         //use await to wait for the insertOne operation to complete
//         await solvedquizzescollection.insertOne({
//             username: username,
//             quizid: quizid,
//             score: score
//         });
//         res.send({ message: "Quiz submitted successfully" });
//     }
//     catch(error){
//         res.send({ message: "Error submitting quiz" });
//     }
// }))

// //now fectch learderboard with quizid
// quizApp.get('/:quizid/leaderboard', expressAsyncHandler(async (req, res) => {
//     const { quizid } = req.params;
//     try {
//         const leaderboard = await solvedquizzescollection.find({ quizid: quizid }).toArray();
//         if (!leaderboard) {
//             // If no leaderboard is found, respond with a 404 status and a message
//             return res.status(404).send({ message: 'Leaderboard not found' });
//         }
//         // If leaderboard is found, send it in the response
//         res.send({message:"leaderboard found" ,leaderboard: leaderboard });
//     } catch (error) {
//         // Handle any potential errors, such as an invalid ObjectId
//         res.status(500).send({ message: 'Error retrieving leaderboard', error: error.message });
//     }
// }));




// //export userApp
// module.exports = quizApp;

module.exports = geminiApp