// Storing images: https://medium.com/@alvenw/how-to-store-images-to-mongodb-with-node-js-fb3905c37e6d*/
var mongoose = require('mongoose');
var keys = require('../config/keys');
mongoose.promise = global.promise;
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', true);
// connect to database
mongoose.connect(keys.dbURL);

// Lets you use 'new Schema' instead of 'new mongoose.Schema' everywhere
var {
    Schema
} = mongoose;

//Schema's
// Making user schema for google OAuth
var UserSchema = new Schema({
    googleId: String,
    name: String,
    firstName: String,
    lastName: String,
    pictureLink: String,
    email: String,
    bio: String,
    classList: Array,
    club: String,
    major: String,
    //Messages: Array
});

var User = mongoose.model('User', UserSchema);
/*
var StudentSchema = new Schema({
    username: String,
    email: String,
    password: String,
    classList: Array,
    photo: {
        data: Buffer,
        contentType: String
    },
    bio: String,
    club: [String],
    calender: String,
    major: String,
    Messages: Array
});*/

var MessageSchema = new Schema({
    sender: String,
    sentTo: String,
    text: String
});

var FacultySchema = new Schema({
    username: String,
    name: String,
    contact: String,
    email: String,
    password: String,
    Photo: {
        data: Buffer,
        contentType: String
    },
    bio: String
})

var CampusPDSchema = new Schema({
    username: String,
    password: String,
    contact: String,
    email: String
});

var Message = mongoose.model('Message', MessageSchema);
var CampusPD = mongoose.model('CampusPD', CampusPDSchema);
var Faculty = mongoose.model('Faculty', FacultySchema);
//var Student = mongoose.model('Student', StudentSchema);

var CalenderSchema = new Schema({
    calenderEvents: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CalenderEvent'
    }
});

var CalenderEventSchema = new Schema({
    date: Date,
    title: String,
    description: String
});

var Calender = mongoose.model('Calender', CalenderSchema);
var CalenderEvent = mongoose.model('CalenderEvent', CalenderEventSchema);

var ClubEventSchema = new Schema({
    name: String,
    description: String,
    contact: String,
    Photo: {
        data: Buffer,
        contentType: String
    }
});

var ClubEvent = mongoose.model('ClubEvent', ClubEventSchema);
// https://stackoverflow.com/questions/18001478/referencing-another-schema-in-mongoose
var ClubSchema = new Schema({
    name: String,
    description: String,
    memberList: [String],
    calender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Calender'
    }
});

var Club = mongoose.model('Club', ClubSchema);

var FacultyAnnouncementSchema = new Schema({
    name: String,
    description: String,
    contact: String,
    photo: {
        data: Buffer,
        contentType: String
    }
});

var JobPostSchema = new Schema({
    name: String,
    description: String,
    contact: String,
    Photo: {
        data: Buffer,
        contentType: String
    }
});

var SafteyWarningSchema = new Schema({
    title: String,
    urgency: String,
    description: String
});

var FacultyAnnouncement = mongoose.model('FacultyAnnouncement', FacultyAnnouncementSchema);
var JobPost = mongoose.model('JobPost', JobPostSchema);
var SafteyWarning = mongoose.model('SafteyWarning', SafteyWarningSchema);

// Saving array of Strings: https://stackoverflow.com/questions/35509611/mongoose-save-array-of-strings
var ChannelSchema = new Schema({
    Name: String,
    MemberList: [String]
});

var Channel = mongoose.model('Channel', ChannelSchema);

var GrouptChatSchema = new Schema({
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
    //StudentModel: Student,
    mongoose: mongoose,
    CalenderModel: Calender,
    CalenderEventModel: CalenderEvent,
    ClubEventModel: ClubEvent,
    FacultyAnnouncementModel: FacultyAnnouncement,
    JobPostModel: JobPost,
    SafteyWarningModel: SafteyWarning,
    UserModel: User
};