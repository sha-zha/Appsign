const mongoose = require('mongoose');

const TemplateSchema = mongoose.Schema({
    name: {
      type: String,
      require: true
    },
    entitled: {
      type: String,
      require: true
    },
    organism: {
      type: String,
      require: true
    },
    logo: {
      type: String,
      require: true
    }
    //createdAt/updatedAt for the template
}, { timestamps: true });

module.exports = mongoose.model('Template', TemplateSchema);