
//Server Configurations and Dependencies
var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var methodOverride = require('method-override');
var configDB = require('./config/database.js');
var mongoStore = require('connect-mongo')(session);
var config = require('./client/index');

mongoose.connect(configDB.url);

require('./config/passport')(passport);

app.set('views', __dirname + '/client/Partials');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/client'));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'thisismysecret' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(session({
    secret: config.secrets.session,
    resave: true,
    saveUninitialized: true,
    store: new mongoStore({ mongoose_connection: mongoose.connection })
}));

require('./client/routes.js')(app, passport);

app.listen(port);
console.log('Server started on ' + port);

