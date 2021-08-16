const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
    name : { type: String, required: true },
	email: { type: String, required: true },
    hash : { type: String, required: true},
	salt : { type: String, required: true },
}, {collection: 'Administrators'});
const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;