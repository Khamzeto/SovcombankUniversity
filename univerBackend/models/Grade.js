const { Schema, model } = require('mongoose');

const GradeSchema = new Schema({
    subject: { type: String, required: true },
    value: { type: Schema.Types.Mixed, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: {
        type: Date,
        default: Date.now,
      },
});

module.exports = model('Grade', GradeSchema);
