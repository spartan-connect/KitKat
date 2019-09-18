
/* Get, Post, delete, put, patch will work with these schema to work
with items inside the database on mongodb atlas
Storing images: https://medium.com/@alvenw/how-to-store-images-to-mongodb-with-node-js-fb3905c37e6d*/
var mongoose = require('mongoose');

// connect to database
mongoose.connect('mongodb+srv://admin:<admin101>@cluster0-yb2mr.mongodb.net/test?retryWrites=true&w=majority');


//Schema's
var StudentSchema = new mongoose.Schema({
    Username: String,
    Email: String,
    Password: String,
    ClassList: Array,
    Photo: { data: Buffer, contentType: String },
    Bio: String,
    Club: Array,
    Calander: String,
    Major: String
});

var FacultySchema = new mongoose.Schema({
    Username: String,
    Name: String,
    Contact: String,
    Email: String,
    Password: String,
    Photo: { data: Buffer, contentType, String },
    Bio: String
})

var CampusPDSchema = new mongoose.Schema({
    Username: String,
    Password: String,
    Contact: String,
    Email: String
});

var CampusPD = mongoose.model('CampusPD', CampusPDSchema);
var Faculty = mongoose.model('Faculty', FacultySchema);
var Student = mongoose.model('Student', StudentSchema);
