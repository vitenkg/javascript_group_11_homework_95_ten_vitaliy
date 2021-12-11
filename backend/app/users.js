const express = require("express");
const User = require('../models/User');
const config = require('../config');
const axios = require("axios");
const {nanoid} = require("nanoid");
const multer = require("multer");
const path = require("path");

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname))
    }
});

const upload = multer({storage});

router.post('/', upload.single('image'), async (req, res) => {
    console.log('Register ', req.body);

    if (!req.body.email || !req.body.password || !req.body.displayName) {
        return res.status(400).send({error: 'Data No Valid'});
    }

    const userData = {
        email: req.body.email,
        password: req.body.password,
        displayName: req.body.displayName,
    }

    if (req.file) {
        userData.image = req.file.filename;
    }

    const user = new User(userData);

    try {
        user.generateToken();
        await user.save();
        res.send(user);
    } catch (e) {
        console.log('Have a error');
        res.status(500).send(e);
    }
});

router.post('/facebookLogin', async (req, res) => {

    const inputToken = req.body.accessToken;

    const accessToken = config.facebook.appId + '|' + config.facebook.appSecret;

    const debugTokenUrl = `https://graph.facebook.com/debug_token?input_token=${inputToken}&access_token=${accessToken}`;

    try {

        const response = await axios.get(debugTokenUrl);

        if (response.data.data.error) return res.status(401).send({global: 'Facebook token incorrect'});

        if (req.body.id !== response.data.data.user_id) return res.status(401).send({global: 'Wrong user Id'});

        let user = await User.findOne({facebookId: req.body.id});

        if (!user) user = new User({
            email: req.body.email,
            password: nanoid(),
            facebookId: req.body.id,
            displayName: req.body.name,
        });

        user.generateToken();
        user.save({validateBeforeSave: false});

        res.send({message: 'Success', user});
    } catch (e) {
        res.status(401).send({global: 'Facebook token incorrect error'});
    }
});

router.post('/sessions', async (req, res) => {
    console.log('Login ', req.body.email);
    try {
        const user = await User.findOne({email: req.body.email});

        if (!user) {
            return res.status(401).send({message: "Something went wrong"});
        }

        const isMatch = await user.checkPassword(req.body.password);

        if (!isMatch) {
            return res.status(401).send({message: "Something went wrong"});
        }

        user.generateToken();
        await user.save({validateBeforeSave: false});
        res.send({message: "Username and password correct", user});
    } catch (e) {
        res.status(500).send(e);
    }

});

router.delete('/sessions', async (req, res) => {
   try {
       const token = req.get('Authorization');
       const success = {message: 'Success'};
       const user = await User.findOne({token});
       user.generateToken();
       await user.save({validateBeforeSave: false});
       res.send(success);
   } catch (e) {
       res.status(500).send(e);
   }
});

module.exports = router;