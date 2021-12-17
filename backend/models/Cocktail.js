const mongoose = require('mongoose');
const idvalidator = require('mongoose-id-validator');

const IngredientSchema = new mongoose.Schema({
    title: String,
    amount: String,
});

const RatingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    mark: {
        type: Number,
        min: 1,
        max: 5,
    }
});

const CocktailSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    recipe: {
        type: String,
        required: true
    },
    image: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    ingredients: [IngredientSchema],
    publish: {
        type: Boolean,
        default: false,
        enum:[true, false]
    },
    rating: [RatingSchema]

});

CocktailSchema.plugin(idvalidator);

const Event = mongoose.model('Cocktail', CocktailSchema);

module.exports = Event;