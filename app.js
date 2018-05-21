const express = require ('express');
const bodyParser = require ('body-parser');
const cookieParser = require ('cookie-parser');
const session = require ('express-session');
const signup = require('./routes/signup')
const login = require('./routes/login')
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//Handles Sessions
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave:true
}));

app.use(signup)
app.use(login)

app.listen(3000, function(){
    console.log('Server started on port 3000...');
})