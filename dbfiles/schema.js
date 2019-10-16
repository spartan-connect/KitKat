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
    club: [String],
    calender: String,
    major: String,
    Messages: Array
});

var MessageSchema = new mongoose.Schema({
    sender: String,
    sentTo: String,
    text: String
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

var Message = mongoose.model('Message', MessageSchema);
var CampusPD = mongoose.model('CampusPD', CampusPDSchema);
var Faculty = mongoose.model('Faculty', FacultySchema);
var Student = mongoose.model('Student', StudentSchema);

var CalenderSchema = new mongoose.Schema({
    calenderEvents: { type: mongoose.Schema.Types.ObjectId, ref: 'CalenderEvent' }
});

var CalenderEventSchema = new mongoose.Schema({
    date: Date,
    title: String,
    description: String
});

var Calender = mongoose.model('Calender', CalenderSchema);
var CalenderEvent = mongoose.model('CalenderEvent', CalenderEventSchema);

var ClubEventSchema = new mongoose.Schema({
    name: String,
    description: String,
    contact: String,
    Photo: { data: Buffer, contentType: String }
});

var ClubEvent = mongoose.model('ClubEvent', ClubEventSchema);
// https://stackoverflow.com/questions/18001478/referencing-another-schema-in-mongoose
var ClubSchema = mongoose.Schema({
    name: String,
    description: String,
    memberList: [String],
    calender: { type: mongoose.Schema.Types.ObjectId, ref: 'Calender' }
});

var Club = mongoose.model('Club', ClubSchema);

var FacultyAnnouncementSchema = new mongoose.Schema({
    name: String,
    description: String,
    contact: String,
    photo: { data: Buffer, contentType: String }
});

var JobPostSchema = new mongoose.Schema({
    name: String,
    description: String,
    contact: String,
    Photo: { data: Buffer, contentType: String }
});

var SafteyWarningSchema = new mongoose.Schema({
    title: String,
    urgency: String,
    description: String
});

var FacultyAnnouncement = mongoose.model('FacultyAnnouncement', FacultyAnnouncementSchema);
var JobPost = mongoose.model('JobPost', JobPostSchema);
var SafteyWarning = mongoose.model('SafteyWarning', SafteyWarningSchema);

// Saving array of Strings: https://stackoverflow.com/questions/35509611/mongoose-save-array-of-strings
var ChannelSchema = new mongoose.Schema({
    Name: String,
    MemberList: [String]
});

var Channel = mongoose.model('Channel', ChannelSchema);

var GrouptChatSchema = new mongoose.Schema({
    Name: String,
    memberList: [String]
});

var GroupChat = mongoose.model('GroupChat', GrouptChatSchema);

module.exports = {
    ClubModel: Club,
    ChannelModel: Channel,
    MessageModel: Message,
    GroupChatModel: GroupChat,
    CampusPDModel: CampusPD,
    FacultyModel: Faculty,
    StudentModel: Student,
    mongoose: mongoose,
    CalenderModel: Calender,
    CalenderEventModel: CalenderEvent,
    ClubEventModel: ClubEvent,
    FacultyAnnouncementModel: FacultyAnnouncement,
    JobPostModel: JobPost,
    SafteyWarningModel: SafteyWarning
};
