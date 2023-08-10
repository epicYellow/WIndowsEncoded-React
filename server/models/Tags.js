const mongoose = require('mongoose');

const tagSchema = mongoose.Schema({

    tagName: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('tags', tagSchema);