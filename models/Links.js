const mongoose = require('mongoose');

const SheetsSchema = mongoose.Schema({
  link: {
    type: String,
    require: true,
    },
    createAt: {
      type : Date
    }
}, { timestamps: true });

module.exports = mongoose.model('Links', SheetsSchema);