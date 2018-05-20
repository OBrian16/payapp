var express = require ('express');
var bodyParser = require ('body-parser');
var path = require ('path');
var favicon = require ('serve-favicon');
var logger = require ('morgan');
var cookieParser = require ('cookie-parser');
var session = require ('express-session');
var passport = require ('passport');
var ExpressValidator = require('express-validator');
//var LocalStrategy = require ('path');
var multer = require ('multer');
var upload = multer({dest: '/uploads'});
var flash = require ('connect flash');
var mongo = require ('mongodb');
var mongoose = require ('mongoose');
var db = mongoose.connection;

var app = express();

/*var logger = function(req, res, next){
    console.log('Logging...');
    next();
}*/

//view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//Handles File Uploads
//app.use(multer({dest:'./uploads'}));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Handles Sessions
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave:true
}));

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

//Validator
app.use(ExpressValidator({
    errorFormatter: function(param, msg, value){
        var namespace = param.split('.')
        , root = namespace.shift()
        , formParam = root;

        while(namespace.length){
            formParam = '[' + namespace.shift() + '}';
        }
        return{
            param : formParam,
            msg : msg,
            value : value
        };
    }
}));

app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

app.use('/', routes);
app.use('/users', users);

//app.use(logger);

//catch 404 and foward to error handler
app.use(function(req, res, next){
    var err = new Error('Not Found');
    err.status = 404;
})

//error handler
if (app.get('env') === 'development'){
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error',{
            message: err.message,
            error: err
        });
    });
}

/* Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));



app.get('/', function(req,res){
    res.send('Cole');
});*/

app.listen(3000, function(){
    console.log('Server started on port 3000...');
})