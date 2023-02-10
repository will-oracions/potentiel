const mongoose = require('mongoose');

const TagSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
    },
    ressources: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Ressource',
        },
    ],
});

TagSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = document.id;
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.passwordHash;
    }
});

module.exports = mongoose.model('Tag', TagSchema);