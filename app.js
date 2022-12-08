const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');

let app = express();
app.use(cookieParser());

const expressConfiguration = require('./express.config.js');
expressConfiguration.init(app);


app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}))


// default home page
app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3001);
