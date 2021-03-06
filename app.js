var express = require('express');
var app = express();
var passport = require('passport');
var keys = require('./config/keys');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cookieSession = require('cookie-session');

var http = require('http').Server(app);
var io = require('socket.io')(http);
// var calendarScripts = require('./calendarScripts.js');

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

var dbModels = require('./dbfiles/schema.js');

require('./services/passport');
require('./routes/authRoutes')(app);

//for db
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

var urlencodedParser = bodyParser.urlencoded({
  extended: false
});

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
app.get('/profile', function (req, res) {
  console.log(req.body);

  // Authorize login
  if (req.user.major == "") {
    res.render('newUserForm')
  }
  // save form information into DB
  else {
    res.render('profile', { data: req.user });
  }
});

app.post('/dbNewUserSave', function (req, res) {
  console.log(req.body);
  console.log(req.user);
  let update = {
    $set: {
      bio: req.body.bio,
      major: req.body.major,
      club: req.body.club
    }
  }
  dbModels.UserModel.findOneAndUpdate({ _id: req.user._id }, update, function (err, user) { if (err) { throw err; } else { console.log(user); } });
  res.redirect('/profile');
});

app.get('/campusMap', function (req, res) {
  res.render('campusMap');
});
app.get('/clubDirectory', function (req, res) {
  res.render('clubDirectory');
});

app.get('/eventsCalendar', function (req, res) {
  let datesArr = [];
  dbModels.CalendarEventModel.find({}, { date: 1 }, function (err, events) {
    // console.log(events);
    events.forEach(event => {
      datesArr.push(event.date);
    });
    res.render('calendar', { data: datesArr });
  })
});

app.get('/eventsCalendar/removed/:title/:date', function (req, res) {
  console.log(req.params.title);
  console.log(req.params.date);
  //removing event
  dbModels.CalendarEventModel.deleteOne({ title: req.params.title, date: req.params.date }, function (err, result) {
    if (err) {
      console.log("Error of query");
    }
    else {
      console.log(result);
    }
  });

  //rerendering the calendar without the removed event
  let datesArr = [];
  dbModels.CalendarEventModel.find({}, { date: 1 }, function (err, events) {
    events.forEach(event => {
      datesArr.push(event.date);
    });
    res.render('calendar', { data: datesArr });
  });
});

app.post('/eventsCalendar', function (req, res) {
  console.log(req.body);
  var data = new dbModels.CalendarEventModel(req.body);
  data
    .save()
    .then(info => {
      console.log('Calendar Event Info Saved to DB');
    })
    .catch(err => {
      res.status(400).send('Unable to save to DB');
    });
  let datesArr = [];
  dbModels.CalendarEventModel.find({}, { date: 1 }, function (err, events) {
    // console.log(events);
    events.forEach(event => {
      datesArr.push(event.date);
    });
    res.render('calendar', { data: datesArr });
  });
});

app.get('/newEventForm', function (req, res) {
  res.render('newEventForm');
});
app.get('/eventsCalendar/:date', function (req, res) {
  console.log(req.params.date);
  let resObj = {
    date: req.params.date,
    eventsArr: []
  };
  dbModels.CalendarEventModel.find({ date: req.params.date }, function (err, events) {
    // console.log(events);
    events.forEach(event => {
      resObj.eventsArr.push(event);
    })
    console.log(resObj.eventsArr);
    res.render('eventPage', { data: resObj });
  });
});

app.get('/searchStudents', function (req, res) {
  var arrayOfStudents = [];
  dbModels.UserModel.find(function (err, user) {
    user.forEach(function (u) {
      arrayOfStudents.push(u.name);
    });
    res.render('searchStudents', { data: arrayOfStudents });
  });
});
app.get('/searchProfile/:name', function (req, res) {
  var name = req.params.name;
  dbModels.UserModel.findOne({ name: name }, function (err, student) {
    if (err) return res.status(400).send('Database Error');
    if (student) res.render('searchProfile', { data: student });
    else res.status(400).send('Student not found');
  });
});

// these are the temporary databases
app.get('/channels', function (req, res) {
  currentUsername = "undefined_username"; // initially set username to undefined_username as default
  currentUsername = req.user.firstName + " " + req.user.lastName;
  channelData = {
    "users": [
      { "name": 'Bob', "status": 'offline' },
      { "name": 'Bob2', "status": 'online' },
      { "name": 'Bob3', "status": 'online' },
      { "name": 'John', "status": 'offline' },
      { "name": 'Apple', "status": 'offline' },
      { "name": 'Seed', "status": 'offline' },
      { "name": 'Johnny', "status": 'online' },
      { "name": 'TestName', "status": 'offline' }
    ],
    "messages": [
      { "text": 'Hi everyone!', "msgId": 0 },
      { "text": 'Hello everyone!', "msgId": 1 }
    ],
    "channels": [
      { "name": 'CS160', "ID": 0 },
      { "name": 'Fun Channel', "ID": 1 },
      { "name": 'Lost and Found', "ID": 2 },
      { "name": 'Marketplace!', "ID": 3 },
      { "name": 'AveryLongChannelNameAaaaaaaa', "ID": 4 }
    ],
    "currentUser": [
      { "name": currentUsername }
    ]
  }

  res.render('channels', channelData);
});

var MessageTest = mongoose.model('MessageTest', {
  name: String,
  timestamp: String,
  message: String,
  currentChannelId: String
});

app.get('/messages', (req, res) => {
  MessageTest.find({}, (err, messages) => {
    res.send(messages);
  });
});

app.get('/messages/:user', (req, res) => {
  var user = req.params.user;

  MessageTest.find(
    {
      name: user
    },
    (err, messages) => {
      res.send(messages);
    }
  );
});

app.post('/messages', async (req, res) => {
  try {
    var message = new MessageTest(req.body);

    var savedMessage = await message.save();
    console.log('saved');

    var censored = await MessageTest.findOne({
      message: 'badword'
    });
    if (censored)
      await MessageTest.remove({
        _id: censored.id
      });
    else io.emit('message', req.body);
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
    return console.log('error', error);
  } finally {
    console.log('Message Posted');
  }
});

io.on('connection', () => {
  console.log('a user is connected');
});

// mongoose.connect(keys.dbURL, (err) => {
//   console.log('mongodb connected', err);
// })

var server = http.listen(3000, () => {
  console.log('server is running on port', server.address().port);
});
