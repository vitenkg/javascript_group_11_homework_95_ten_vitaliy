import React, {useState} from 'react';
import {Box, Button, Grid, makeStyles, TextField, Typography} from "@material-ui/core";
import FormElement from "../../components/Form/FormElement";
import {useDispatch} from "react-redux";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import {createCocktail} from "../../store/actions/cocktailActions";

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        // alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    alert: {
        marginTop: theme.spacing(3),
        width: "100%",
    },

}));


const AddIngredients = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [ingredients, setIngredients] = useState([{
        title: '',
        amount: '',
    }]);

    const [cocktail, setCocktail] = useState({
        name: '',
        recipe: '',
        image: '',
    })

    const changeIngredients = (i, name, value) => {
        setIngredients(prevState => {
            const copyIng = {
                ...prevState[i],
                [name]: value,
            }
            return prevState.map((ing, index) => {

                if (i === index) return copyIng;

                return ing
            });
        })
    };

    const eraseIngredients = (index) => {
        setIngredients(ingredients.filter((ing, i) => i !== index));
    };

    const addsIngredients = () => {
        setIngredients(prevState => [
            ...prevState,
            {
                title: '',
                amount: '',
            }
        ]);
    };

    const inputChangeHandler = e => {
        const {name, value} = e.target;
        setCocktail(prevState => ({...prevState, [name]: value}));
    };

    const submitFormHandler = e => {
        e.preventDefault();

        cocktail.ingredients = JSON.stringify(ingredients);

        const formData = new FormData();

        Object.keys(cocktail).forEach(key => {
            formData.append(key, cocktail[key]);
        });

        console.log(formData);
        dispatch(createCocktail(formData));
    };
    //
    // const getFieldError = fieldName => {
    //     try {
    //         return error.errors[fieldName].error;
    //     } catch (e) {
    //         return undefined;
    //     }
    // };

    const fileChangeHandler = e => {
        const name = e.target.name;
        const file = e.target.files[0];
        setCocktail(prevState => {
            return {...prevState, [name]: file};
        });
    };

    return (
        <div>
            <form onSubmit={submitFormHandler}>
                <Grid item xs={12}>
                    <FormElement
                        required
                        autoComplete="off"
                        label="Name of cocktail"
                        name="name"
                        value={cocktail.name}
                        onChange={inputChangeHandler}
                    />
                </Grid>
                <Typography
                    variant="h6"

                >
                    Ingredients
                </Typography>
                <Box border={1} borderColor="grey.500">
                    {ingredients.map((ing, i) => (
                        <Grid
                            item
                            key={i}
                            xs={5}
                            container
                            className={classes.paper}
                        >
                            <TextField
                                required
                                autoComplete="off"
                                label="Title"
                                name="title"
                                value={ingredients[i].title}
                                onChange={e => changeIngredients(i, 'title', e.target.value)}
                            />
                            <TextField
                                required
                                autoComplete="off"
                                label="Amount"
                                name="amount"
                                value={ingredients[i].amount}
                                onChange={e => changeIngredients(i, 'amount', e.target.value)}
                            />
                            <button
                                type='button'
                                className={classes.submit}

                                onClick={() => eraseIngredients(i)}
                            >
                                <DeleteForeverIcon/>
                            </button>
                        </Grid>
                    ))}
                </Box>
                <Button
                    className={classes.submit}
                    type='button'
                    variant="contained"
                    onClick={addsIngredients}
                >
                    Add ingredient
                </Button>
                <Grid>
                    <TextField
                        required
                        label="Recipe"
                        name="recipe"
                        maxRows={5}
                        value={cocktail.recipe}
                        onChange={inputChangeHandler}
                    />
                </Grid>

                <TextField
                    type="file"
                    name="image"
                    onChange={fileChangeHandler}
                    // error={getFieldError('image')}
                />

                <Button
                    className={classes.submit}
                    type='submit'
                    variant="contained"
                >
                    Create Cocktail
                </Button>
            </form>
        </div>
    );
};


export default AddIngredients;