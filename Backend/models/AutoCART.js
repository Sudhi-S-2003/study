const mongoose = require('mongoose');

const enumValues = ['Pending', 'In Progress', 'Completed'];

const AutoCARTSchema = new mongoose.Schema({
    transction_id: { type: String },
    items: { type: mongoose.Schema.Types.Mixed },
    status: {
        type: String,
        enum: enumValues,
        default: enumValues[0],
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

const AutoCARTModel = mongoose.model('AutoCARTModel', AutoCARTSchema);

module.exports = AutoCARTModel;
