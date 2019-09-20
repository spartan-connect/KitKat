// Storing images: https://medium.com/@alvenw/how-to-store-images-to-mongodb-with-node-js-fb3905c37e6d*/
var mongoose = require('mongoose');
mongoose.promise = global.promise;
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
// connect to database
mongoose.connect('mongodb+srv://admin:admin101@cluster0-yb2mr.mongodb.net/test?retryWrites=true&w=majority');

//Schema's
var StudentSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    classList: Array,
    photo: { data: Buffer, contentType: String },
    bio: String,
    club: Array,
    calander: String,
    major: String
});

var FacultySchema = new mongoose.Schema({
    username: String,
    name: String,
    contact: String,
    email: String,
    password: String,
    Photo: { data: Buffer, contentType: String },
    bio: String
})

var CampusPDSchema = new mongoose.Schema({
    username: String,
    password: String,
    contact: String,
    email: String
});

var CampusPD = mongoose.model('CampusPD', CampusPDSchema);
var Faculty = mongoose.model('Faculty', FacultySchema);
var Student = mongoose.model('Student', StudentSchema);

module.exports = {
    CampusPDModel: CampusPD,
    FacultyModel: Faculty,
    StudentModel: Student,
    mongoose: mongoose
};
