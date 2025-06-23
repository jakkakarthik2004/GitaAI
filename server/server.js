const exp = require('express');
const app = exp();
const { MongoClient } = require('mongodb');
const cors = require('cors');
require('dotenv').config();

app.use(cors());
app.use(exp.json()); // Ensure JSON middleware is used

const DB_URL = process.env.DB_URL;

// Connect to MongoDB
MongoClient.connect(DB_URL)
  .then(client => {
    const dbObj = client.db('cinematix');
    const slokas = dbObj.collection('slokas');
    const gita = dbObj.collection('gita');
    const quizcollection = dbObj.collection('quizCollection');
    const usersObj = dbObj.collection('usersCollection');
    const temporaryObj = dbObj.collection('temporaryCollection');

    // Setting collections to the app
    app.set('slokasObj', slokas);
    app.set('gitaObj', gita);
    app.set('quizObj', quizcollection);
    app.set('usersObj', usersObj);
    app.set('temporaryObj', temporaryObj);
    console.log('Connected to database');
  })
  .catch(err => {
    console.error('Database connection failed:', err);
  });

// Import routes
const quizApp = require('./APIs/quizApi');
const userApp = require("./APIs/user-api");
// if path starts with user-api, send request to userApp
app.use('/user-api', userApp); // application level middleware

// Set up route handling
app.use('/quiz-api', quizApp);

// Error-handling middleware
app.use((err, req, res, next) => {
  res.status(500).send({ message: "error", payload: err.message });
});

// Start the server
const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});