const { Schema, model } = require('mongoose');

const scheduleSchema = new Schema({
    group: { type: String, ref: 'Group',  unique: true,required: true },
    days: [{
        day: String,
        classes: [{ time: String, subject: String }]
    }],
});

module.exports = model('Schedule', scheduleSchema);
