import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Box, Button, Grid, Paper, Typography} from "@material-ui/core";
import {fetchCocktail, onActivate} from "../../store/actions/cocktailActions";
import {Link} from "react-router-dom";

const Cocktail = ({match}) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.users.user);
    const cocktail = useSelector(state => state.cocktails.cocktail);

    useEffect(() => {
        dispatch(fetchCocktail(match.params.id));
    }, [dispatch, match.params.id]);


    return cocktail && (
        <Paper component={Box} p={2}>
            <Typography variant="h4">{cocktail.name}</Typography>
            <ul variant="subtitle2">{cocktail.ingredients.map(ingredient => (
                <li
                    key={ingredient._id}
                >
                    <Typography>{ingredient.title} - {ingredient.amount}</Typography>

                </li>

            ))}</ul>
            <Typography variant="body1">{cocktail.recipe}</Typography>
            <Typography variant="body1">{cocktail.publish ? (<p>Activated</p>) : (<p>Disactivated</p>) }</Typography>

            {user?.role === 'admin' && (
                <Grid item>
                    <Button color="primary" onClick={() => dispatch(onActivate(cocktail._id))}>Activate</Button>
                </Grid>
            )}
        </Paper>
    );
};

export default Cocktail;