const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 3,
    },
    email: {
        type: String,
        required: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        required: false,
    },
    ressources: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Ressource',
        }
    ],
    
});

UserSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = document.id;
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.passwordHash;
    }
});

module.exports = mongoose.model('User', UserSchema);