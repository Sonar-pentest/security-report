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


var execaNonCompliant = require('./noncompliant.js');
// http://localhost:3001/execa/noncompliant_shellsink?cmd=.;cat%20/etc/passwd
app.get('/execa/noncompliant_shellsink', execaNonCompliant.shellsink);
// http://localhost:3001/execa/noncompliant_shellsyncsink?cmd=.;cat%20/etc/passwd
app.get('/execa/noncompliant_shellsyncsink', execaNonCompliant.shellsyncsink);
// http://localhost:3001/execa/noncompliant_execasink?cmd=/usr/bin/ls
app.get('/execa/noncompliant_execasink', execaNonCompliant.execasink);
// http://localhost:3001/execa/noncompliant_stdoutsink?cmd=/usr/bin/ls
app.get('/execa/noncompliant_stdoutsink', execaNonCompliant.stdoutsink);
// http://localhost:3001/execa/noncompliant_stderrsink?cmd=/usr/bin/ls
app.get('/execa/noncompliant_stderrsink', execaNonCompliant.stderrsink);
// http://localhost:3001/execa/noncompliant_syncsink?cmd=/usr/bin/ls
app.get('/execa/noncompliant_syncsink', execaNonCompliant.syncsink);


app.listen(3001);
