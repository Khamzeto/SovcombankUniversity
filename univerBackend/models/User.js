const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    username: { type: Number, unique: true, required: true },
    firstname: { type: String, required: true },
    surname: { type: String, required: true },
    fathername: { type: String, required: false },
    password: { type: String, required: true },
    roles: [{ type: String, required: true }],
    group: { type: String } 
});

module.exports = model('User', UserSchema);
