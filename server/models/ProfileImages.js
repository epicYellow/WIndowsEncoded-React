const mongoose = require('mongoose');

const ProfileImageSchema = mongoose.Schema({
    imageLocation: {
        type: String,
        required: true
    },
    imageName: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('ProfilePictures', ProfileImageSchema);