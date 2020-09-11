const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const SheetsSchema = mongoose.Schema({
	/*UserId: {
    	type : ObjectId,
    	ref: 'User'
    },*/
  	link: {
    type: String,
    require: true,
    },
    qrcode : {
    type: String

    }

}, { timestamps: true });

module.exports = mongoose.model('Links', SheetsSchema);