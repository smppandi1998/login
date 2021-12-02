

const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
    
    uname: String,
    psalt: String,
    phash: String,
    email: String,
    
}, {
    timestamps: true
});

module.exports = mongoose.model('Users', NoteSchema);