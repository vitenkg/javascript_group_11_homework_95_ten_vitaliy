const path = require('path');

const rootPath = __dirname;

const dataBaseName = 'HW94';

module.exports = {
    rootPath,
    uploadPath: path.join(rootPath, '/public/uploads/'),
    db: {
        url: 'mongodb://localhost/' + dataBaseName,
    },
    facebook: {
        appId: process.env.FACEBOOK_APP_ID,
        appSecret: process.env.FACEBOOK_APP_SECRET,
    },
    google: {
        clientId: process.env.GOOGLE_CLIENT_ID,
    },
};

