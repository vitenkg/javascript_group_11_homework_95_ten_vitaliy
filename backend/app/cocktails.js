const express = require("express");
const User = require('../models/User');
const Cocktail = require('../models/Cocktail');
const config = require('../config');
const axios = require("axios");
const {nanoid} = require("nanoid");
const multer = require("multer");
const path = require("path");
const auth = require("../middleware/auth");

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

router.get('/', auth, async (req, res) => {
    let cocktails = [];
    try {
        if (req.user.role === 'user')
            cocktails = await Cocktail.find(
                {
                    $end: [
                        {publish: true},
                        {user: req.user._id}
                    ]
                });

        if (req.user.role === 'admin')
            cocktails = await Cocktail.find();

        res.send(cocktails);
    } catch (e) {
        console.log(e);
    }
});

router.post('/', auth, upload.single('image'), async (req, res) => {

    if (!req.body.name || !req.body.recipe || !req.body.ingredients) {
        return res.status(400).send({error: 'Data No Valid'});
    }

    const cocktailData = {
        name: req.body.name,
        recipe: req.body.recipe,
        ingredients: req.body.ingredients,
        user:req.user._id,
        rating: req.body.rating || null
    }

    if (req.file) {
        cocktailData.image = req.file.filename;
    }

    const cocktail = new Cocktail(cocktailData);

    try {
        cocktail.generateToken();
        await cocktail.save();
        res.send(cocktail);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.delete('/:id', auth, async (req, res) => {
    try {
        if (req.user.role === 'user')
            await Cocktail.findOneAndDelete({
                $and: [
                    {user: req.user_id},
                    {_id: req.params.id}
                ]
            }, error => {
                if (error) {
                    return res.status(401).send({error: 'Cocktail Not found'});
                } else {
                    return res.send({message: `Deleted cocktail successfully`});
                }
            });

        if (req.user.role === 'admin')
            await Cocktail.findOneAndDelete(req.params.id, error=> {
                if (error) {
                    return res.status(401).send({error: 'Cocktail Not found'});
                } else {
                    return res.send({message: `Deleted cocktail successfully`});
                }
            })

        const eraseCocktail = await Cocktail.findOne({id: req.params._id});

        if (req.use._id !== eraseCocktail.user)
            return res.status(403).send({error: 'Permission denied'});

        res.status(500).send({error: 'something went wrong'});
    } catch (e) {
        res.status(500).send(e);
    }
});

module.exports = router;