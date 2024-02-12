
const { Schema, model } = require('mongoose');
const UserSchema = require('./User');

const GroupSchema = new Schema({
    groupname : { type: String,required: true },
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

module.exports = model('Group', GroupSchema);