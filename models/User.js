const {Schema, model} = require("mongoose");
const thoughtSchema = require("./Thought");



const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,3})$/, "Please enter a valid email address",]
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: "Thought"
        },
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
    ]
}, {
    toJSON: {
        // virtuals: true,
        getters: true
    },
    id: false
});
const User = model('User', userSchema);

userSchema
    .virtual('friendCount')
    .get(function () {
    return this.friends.length;
});




module.exports = User;
