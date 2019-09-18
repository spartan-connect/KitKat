var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));

app.get('/', function(req, res){
  res.render('home');
});

// app.get('/profile/:name', function(req, res){
//   var data = {age: 22, job: 'Student'};
//   res.render('profile', {person: req.params.name, data: data});
// });

app.post('/profile', urlencodedParser, function(req, res){
  console.log(req.body);
  res.render('profile', {data: req.body});
});

app.get('/campusMap', function(req, res){
  res.render('campusMap');
});

app.listen(3000);
