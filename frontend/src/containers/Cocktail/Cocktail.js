import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Box, Button, Grid, makeStyles, Paper, Typography} from "@material-ui/core";
import {fetchCocktail, onActivate} from "../../store/actions/cocktailActions";
import {apiURL} from "../../config";
import noImageFile from '../../assets/images/2048px-No_image_available.svg.png';


const useStyles = makeStyles(theme => ({
    margin: {
        marginRight: '20px',
    },
}));

const Cocktail = ({match}) => {
    const dispatch = useDispatch();
    const classes = useStyles();

    const user = useSelector(state => state.users.user);
    const cocktail = useSelector(state => state.cocktails.cocktail);

    useEffect(() => {
        dispatch(fetchCocktail(match.params.id));
    }, [dispatch, match.params.id]);

    let cardImage = noImageFile;

    if (cocktail && cocktail.image) {
        cardImage = apiURL + '/uploads/' + cocktail.image;
    }

    console.log(cardImage);

    return cocktail && (
        <Paper component={Box} p={2}>
            <Grid container>
                <Grid item className={classes.margin}>
                    <img src={cardImage} alt={cocktail} width="200" />
                </Grid>
                <Grid item>
                    <Typography variant="h4">{cocktail.name}</Typography>
                    <ul variant="subtitle2">{cocktail.ingredients.map(ingredient => (
                        <li
                            key={ingredient._id}
                        >
                            <Typography>{ingredient.title} - {ingredient.amount}</Typography>

                        </li>

                    ))}</ul>
                    <Typography variant="body1">{cocktail.recipe}</Typography>
                    <Typography variant="body1">{cocktail.publish ? (<p>Activated</p>) : (
                        <p>Deactivated</p>)}</Typography>

                    {user?.role === 'admin' && (
                        <Grid item>
                            <Button color="primary" onClick={() => dispatch(onActivate(cocktail._id))}>Activate</Button>
                        </Grid>
                    )}
                </Grid>
            </Grid>

        </Paper>
    );
};

export default Cocktail;