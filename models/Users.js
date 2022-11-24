const { Schema, model } = require('mongoose');

// Schema to create User model
const UsersSchema = new Schema(
    {
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
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'Thoughts'
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }]
    },
    {
    // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
    // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
    toJSON: {
        virtuals: true,
        getters: true,
    },
    id: false
    }
)
// Create a virtual property `friendCount` that gets the user's friendCount
UsersSchema.virtual('friendCount').get(function() {
    return this.friends.length;
})

// Initialize our User model
const Users = model('Users', UsersSchema);

module.exports = Users;