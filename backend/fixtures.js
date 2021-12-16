const mongoose = require('mongoose');
const config = require('./config');
const {nanoid} = require('nanoid');
const User = require('./models/User');
const Cocktail = require('./models/Cocktail');

const run = async () => {
    await mongoose.connect(config.db.url);

    const collections = await mongoose.connection.db.listCollections().toArray();

    for (const coll of collections) {
        await mongoose.connection.db.dropCollection(coll.name);
    }

    const [admin, test, test1] = await User.create({
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
        }, {
            email: 'test1@test.com',
            password: 'test',
            token: nanoid(),
            displayName: 'Test-One',
            role: 'user'
        },
    );

    await Cocktail.create({
            name: '1-q',
            recipe: 'qwerty',
            user: test,
            ingredients: [{
                title: '1-qq',
                amount: 'qq',
            }],
            publish: false,
        },{
            name: '1-w',
            recipe: 'qwerty',
            user: test,
            ingredients: [{
                title: '1-ww',
                amount: 'ww',
            }],
            publish: false,
        },{
            name: '1-e',
            recipe: 'qwerty',
            user: test1,
            ingredients: [{
                title: '1-ee',
                amount: 'ee',
            }],
            publish: false,
        },
    );

    await mongoose.connection.close();
};

run().catch(console.error);