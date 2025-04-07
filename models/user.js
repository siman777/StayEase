const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email: {
        type: String, // ✅ Use "String" instead of "string"
        required: true,
        unique: true // ✅ Ensure unique emails
    }
});

// passport-local-mongoose automatically adds username, password, and salt fields
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
