const mongoose = require('mongoose');

// export const RessourceType = {
//     BLOG_POST: '1',
//     BLOG_POST_SERIE: '2',
//     VIDEO_TUTORIAL: '3',
//     VIDEO_TUTORIAL_SERIE: '4',
//     TORRENT_FILE: '5',
// };

const ResourceSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
    durationMin: {
        type: Number,
        required: false,
    },
    itemsCount: {
        type: Number,
        required: false,
    },
    previewImage: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: false,
        maxLength: 1000,
    },
    author: {
        type: String,
        required: true,
    },
    origin: {
        type: String,
        required: true,
    },
    publisher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    tags: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Tag',
        },
    ],
    // level: String,
});

ResourceSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = document.id;
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.passwordHash;
    }
});

module.exports = mongoose.model('Resource', ResourceSchema);