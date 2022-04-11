// APP = MONGOOSE  SERVER = index
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');

const saucesRoute = require('./routes/router-sauces');
const authRoute = require('./routes/router-auth');

// variable d'environnement
require('dotenv').config();

// Connexion a mongooseDB
const mongoose = require('mongoose');
const passwordENV = process.env.PASS;
const userENV = process.env.USER;

mongoose.connect(`mongodb+srv://${userENV}:${passwordENV}@cluster0.pdhh7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.error('Connexion à MongoDB échouée !'));

//controllers
// const { userToDatabase, userLogin } = require('./controllers/users');
// const sauceCtrl = require('./controllers/sauces');


// middleware
app.use(cors());
app.use(express.json());
// const auth = require('./middleware/auth');
// const multer = require('./middleware/multer-config');
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  next();
});


// Routes
// app.post("/api/auth/signup",userToDatabase);
// app.post("/api/auth/login", userLogin);
// app.get("/api/sauces",auth, sauceCtrl.getAllSauces);
// app.get("/api/sauces/:id",auth,sauceCtrl.getSauceById);
// app.put("/api/sauces/:id",auth,multer,sauceCtrl.modifySauce);
// app.delete("/api/sauces/:id",auth,sauceCtrl.deleteSauce);
// app.post("/api/sauces",auth, multer, sauceCtrl.createSauce);
// app.post("/api/sauces/:id/like",auth, sauceCtrl.sauceLikes);


app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/sauces', saucesRoute);
app.use('/api/auth', authRoute);



module.exports = app;
