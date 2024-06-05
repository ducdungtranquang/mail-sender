// models/Email.js
// eslint-disable-next-line no-undef
const mongoose = require("mongoose");

const emailSchema = new mongoose.Schema({
  email: { type: String, required: true },
  sentAt: { type: Date, default: Date.now },
});

// eslint-disable-next-line no-undef
module.exports = mongoose.model("Email", emailSchema);
