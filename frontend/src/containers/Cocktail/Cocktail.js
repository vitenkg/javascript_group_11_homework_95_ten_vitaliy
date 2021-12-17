import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Box, Paper, Typography} from "@material-ui/core";
import {fetchCocktail} from "../../store/actions/cocktailActions";

const Cocktail = ({match}) => {
    const dispatch = useDispatch();
    const cocktail = useSelector(state => state.cocktails.cocktail);

    useEffect(() => {
        dispatch(fetchCocktail(match.params.id));
    }, [dispatch, match.params.id]);

    return cocktail && (
        <Paper component={Box} p={2}>
            <Typography variant="h4">{cocktail.name}</Typography>
            {/*<Typography variant="subtitle2">{cocktail.price}</Typography>*/}
            <Typography variant="body1">{cocktail.recipe}</Typography>
        </Paper>
    );
};

export default Cocktail;