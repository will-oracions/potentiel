require('dotenv').config();

const PORT = process.env.PORT || 3003;
const MONGODB_URI = process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI;

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_SECRET = process.env.GITHUB_SECRET;

module.exports = { PORT, MONGODB_URI, GITHUB_CLIENT_ID, GITHUB_SECRET };