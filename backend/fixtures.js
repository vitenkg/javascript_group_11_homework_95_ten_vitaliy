const mongoose = require('mongoose');
const config = require('./config');
const {nanoid} = require('nanoid');
const User = require('./models/User');


const run = async () => {
    await mongoose.connect(config.db.url);

    const collections = await mongoose.connection.db.listCollections().toArray();

    for (const coll of collections) {
        await mongoose.connection.db.dropCollection(coll.name);
    }

    const [admin, test] = await User.create({
            email: 'admin@admin.com',
            password: 'admin',
            token: nanoid(),
            displayName: 'Admin',
            role: 'admin',
        }, {
            email: 'test@test.com',
            password: 'test',
            token: nanoid(),
            displayName: 'Test',
            role: 'user'
        }
    );

    await mongoose.connection.close();
};

run().catch(console.error);