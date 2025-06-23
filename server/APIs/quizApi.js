//create express mini user api App
const exp = require('express')
const quizApp = exp.Router()
const { ObjectId } = require('mongodb');

const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

async function run(slokadata) {
    // Filter the slokas for only those with language "en"
    const filteredSlokas = slokadata.filter(sloka => sloka.language === "en");

    // Ensure we have filtered slokas to work with
    if (filteredSlokas.length === 0) {
        console.error("No slokas found for language 'en'.");
        return [];
    }

    // Convert the filtered slokas into a formatted JSON string for the prompt
    const slokasString = JSON.stringify(filteredSlokas);

    // Prepare the prompt with the filtered and stringified sloka data
    const prompt = `Create a quiz based on the following JSON dataset with 10 questions. Some questions should be about selecting the missing words in the sloka from four options (one correct and three incorrect). Other questions should ask the user to identify the speaker of a specific sloka. Provide the quiz in a plain JSON format with no additional text or markdown. The JSON should have the following structure:

    {
      "quiz": {
        "title": "Title of the quiz",
        "questions": [
          {
            "question": "The question text",
            "options": ["Option A", "Option B", "Option C", "Option D"],
            "answer": "The correct answer"
          }
          // Add more questions here
        ]
      }
    }

    Use the following format for different question types:

    1. For sloka completion questions: Select a sloka from the dataset and leave out one word. Provide four options, one of which is the missing word.
    2. For speaker identification questions: Ask the user to select who the speaker of a particular sloka is from four options (one correct and three incorrect).

    The dataset is: ${slokasString}. Make sure the response only includes the JSON object as shown above, without any additional text or formatting. The answer should be in options`;


    // Call the AI model with the generated prompt
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();

    try {
        // Clean the response by removing any unwanted formatting such as backticks
        const cleanedText = text.replace(/```json|```/g, '').trim();

        // Parse the cleaned response text into JSON
        const parsedData = JSON.parse(cleanedText);

        // Check if the JSON has the expected structure
        if (parsedData && parsedData.quiz && Array.isArray(parsedData.quiz.questions)) {
            return parsedData.quiz.questions.map(question => ({
                question: question.question,
                options: question.options,
                answer: question.answer
            }));
        } else {
            console.warn('Unexpected JSON structure:', parsedData);
            return [];
        }
    } catch (error) {
        console.error('Error parsing JSON:', error);
        return [];
    }
}




//import asynchrous handler to handle asynchronous error
const expressAsyncHandler = require('express-async-handler');

require('dotenv').config()


let slokas;
let gita;
let quizcollection;
//get userCollection this app level middleware--- it is required by every route
quizApp.use((req,res,next)=>{
    slokas = req.app.get('slokasObj')
    gita = req.app.get('gitaObj')
    quizcollection = req.app.get('quizObj')
    next()
})

quizApp.post('/create/:chapter', expressAsyncHandler(async (req, res) => {

    const { chapter } = req.params;

    const chapterNumber = 1; // Specify the chapter number you're looking for
    const slokadata = await slokas.find({ chapterNumber: chapterNumber }).toArray();

    const quizArray = await run(slokadata);


    // Generate a MongoDB ObjectId
    const quizId = new ObjectId(); // Creates a new MongoDB ObjectId

    // Store the quiz with its unique ID in the database
    const result = await quizcollection.insertOne({
        _id: quizId,
        questions: quizArray
    });

    console.log("insert resopnse",result)



    // Send the unique ID to the client
    res.send({ message: "Quiz created successfully", quiz: quizArray });
}));

module.exports=quizApp;