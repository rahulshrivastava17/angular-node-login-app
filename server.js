const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const PORT = process.env.PORT|| 3000;
const app = express();

/* Connecting to database */
mongoose.connect('mongodb://localhost/poc', ()=> {
	console.log('Connected to mongodb');
});

/*  ------------------  Cross Origin Allow -------------- */
app.use(cors());

/*  ------------------  Parse Cookie -------------- */
app.use(cookieParser());

/*  ------------------  Global Objects for Application -------------- */
const globals = require('./config/globals')(app); // Global modules

/* --------------------------  BodyParser   --------------------------*/
app.use(bodyParser.json({
    limit: '50mb'
}));
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb'
}));

app.set('superSecret','super secret')
/* --------------------------  Compress Responses   -----------------*/
app.use(compression());

/* --------------------------  Public Static Access   -----------------*/
app.use('/', express.static(path.join(__dirname, 'app')));
app.set('view cache', true);

/* --------------------------  API's   --------------------------------*/
const routes = require('./api/routes/UsersRoute'); // Load All Route

app.listen(PORT,()=>{
	console.log('Server is running on port ',PORT);
})