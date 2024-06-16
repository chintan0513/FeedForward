const mongoose = require('mongoose');

const initializeDB = async () => {
    const db = mongoose.connection;

    db.once('open', async () => {
        console.log("Connected to MongoDB.");

        // Check if the 'samples' collection exists
        const collections = await db.listCollections().toArray();
        if (!collections.map(c => c.name).includes('User')) {
            console.log('Creating the User collection.');
            await db.createCollection('User');
        } else {
            console.log('User collection already exists.');
        }
    });
};

module.exports = initializeDB;
