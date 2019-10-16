var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose');
var dbModels = require('./dbfiles/schema.js');
var dbUrl = 'mongodb+srv://dbUser:dbPassword@cluster0-lucoe.mongodb.net/test?retryWrites=true&w=majority';

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
  console.log(req.body);
  var data = new dbModels.StudentModel(req.body);
  data.save()
    .then(info => {
      console.log("Student Info Saved to DB");
    })
    .catch(err => {
      res.status(400).send("Unable to save to DB");
    })
  res.render('profile', { data: req.body });
});

app.get('/campusMap', function (req, res) {
  res.render('campusMap');
});
app.get('/clubDirectory', function (req, res) {
  res.render('clubDirectory');
});

// these are the temporary databases
app.get('/channels', function (req, res) {
  channelData = {
    "users": [
      { "name": 'Bob', "status": 'offline'},
      { "name": 'Bob2', "status": 'online'},
      { "name": 'Bob3', "status": 'online'},
      { "name": 'John', "status": 'offline'},
      { "name": 'Apple', "status": 'offline'},
      { "name": 'Seed', "status": 'offline'},
      { "name": 'Johnny', "status": 'online' },
      { "name": 'TestName', "status": 'offline' }
    ],
    "messages": [
      { "text": 'Hi everyone!' },
      { "text": 'Hello everyone!' }
    ],
	"channels": [
		{ "name": 'CS160', "ID": 0},
		{ "name": 'Fun Channel', "ID": 1},
		{ "name": 'Lost and Found', "ID": 2},
		{ "name": 'Marketplace!', "ID": 3},
		{ "name": 'AveryLongChannelNameAaaaaaaa', "ID": 4}
	]
  }
  
  res.render('channels', channelData);
});


var Message = mongoose.model('Message',{
  name : String,
  message : String
})

app.get('/messages', (req, res) => {
  Message.find({},(err, messages)=> {
    res.send(messages);
  })
})


app.get('/messages/:user', (req, res) => {
  var user = req.params.user
  Message.find({name: user},(err, messages)=> {
    res.send(messages);
  })
})


app.post('/messages', async (req, res) => {
  try{
    var message = new Message(req.body);

    var savedMessage = await message.save()
      console.log('saved');

    var censored = await Message.findOne({message:'badword'});
      if(censored)
        await Message.remove({_id: censored.id})
      else
        io.emit('message', req.body);
      res.sendStatus(200);
  }
  catch (error){
    res.sendStatus(500);
    return console.log('error',error);
  }
  finally{
    console.log('Message Posted')
  }

})



io.on('connection', () =>{
  console.log('a user is connected')
})

mongoose.connect(dbUrl ,(err) => {
  console.log('mongodb connected',err);
})

var server = http.listen(3000, () => {
  console.log('server is running on port', server.address().port);
});
