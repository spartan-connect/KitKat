var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var dbModels = require('./dbfiles/schema.js');

//for db
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));

app.get('/', function (req, res) {
  res.render('home');
});

// app.get('/profile/:name', function(req, res){
//   var data = {age: 22, job: 'Student'};
//   res.render('profile', {person: req.params.name, data: data});
// });

// 400 status is an operation failed
// just example of saving to db, doesn't perform login correctly
app.post('/profile', function (req, res) {
  var count = Object.keys(req.body).length;
  console.log(count);
  console.log(req.body);
  // Authorize login
  if (count == 2) {
    dbModels.StudentModel.find(req.body, function (err, student) {
      if (err) {
        console.log("Can't Find User");
        res.render('home');
      }
      console.log(student);
      console.log(student[0].username);
      console.log(student[0].password);
      if (req.body.username == student[0].username && req.body.password == student[0].password) {
        console.log('Student Account was found');
        res.render('profile', { data: req.body });
      }
    });
  }
  // save form information into DB
  else {
    var data = new dbModels.StudentModel(req.body);
    data.save()
      .then(info => {
        console.log("Student Info Saved to DB");
      })
      .catch(err => {
        res.status(400).send("Unable to save to DB");
      });
    res.render('profile', { data: req.body });
  }
});

app.get('/newUserForm', function (req, res) {
  res.render('newUserForm');
});

app.get('/campusMap', function (req, res) {
  res.render('campusMap');
});
app.get('/clubDirectory', function (req, res) {
  res.render('clubDirectory');
});

app.get('/channels', function (req, res) {
  userList = {
    "users": [
      { "name": 'Bob' },
      { "name": 'Bob2' },
      { "name": 'Bob3' },
      { "name": 'John' },
      { "name": 'Apple' },
      { "name": 'Seed' },
      { "name": 'Johnny' },
      { "name": 'TestName' }
    ],
    "messages": [
      { "text": 'Hi everyone!' },
      { "text": 'Hello everyone!' }
    ]
  }

  res.render('channels', userList);
});

app.listen(3000);
