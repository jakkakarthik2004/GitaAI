const exp = require('express');
const app = exp();
const { MongoClient } = require('mongodb');
const cors = require('cors');
require('dotenv').config();

app.use(cors());
app.use(exp.json());

const DB_URL = process.env.DB_URL;

MongoClient.connect(DB_URL)
  .then(client => {
    const dbObj = client.db('cinematix');
    const slokas = dbObj.collection('slokas');
    const gita = dbObj.collection('gita');
    const quizcollection = dbObj.collection('quizCollection');
    const usersObj = dbObj.collection('usersCollection');
    const temporaryObj = dbObj.collection('temporaryCollection');

    app.set('quizObj', quizcollection);
    app.set('usersObj', usersObj);
    app.set('temporaryObj', temporaryObj);
    console.log('Connected to database');
  })
  .catch(err => {
    console.error('Database connection failed:', err);
  });

const quizApp = require('./APIs/quizApi');
const userApp = require("./APIs/user-api");
app.use('/user-api', userApp);

app.use('/quiz-api', quizApp);

app.use((err, req, res, next) => {
  res.status(500).send({ message: "error", payload: err.message });
});

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});