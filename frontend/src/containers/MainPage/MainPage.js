import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchCocktails} from "../../store/actions/cocktailActions";
import {Button, CircularProgress, Grid, makeStyles, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";
import CocktailsLayout from "../../components/CocktailsLayout/CocktailsLayout";
import CocktailItem from "../../components/CocktailItem/CocktailItem";

const useStyles = makeStyles(theme => ({
    title: {
        [theme.breakpoints.down('xs')]: {
            marginLeft: "50px",
        },
    }
}));


const MainPage = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const user = useSelector(state => state.users.user);
    const fetchLoading = useSelector(state => state.cocktails.fetchLoading);
    const cocktails = useSelector(state => state.cocktails.cocktails);

    useEffect(() => {
        dispatch(fetchCocktails(user && user.token || null));
    }, [dispatch, user]);

    return (

        <CocktailsLayout>
            <Grid container direction="column" spacing={2}>
                <Grid item container justifyContent="space-between" alignItems="center">
                    <Grid item className={classes.title}>
                        <Typography variant="h4">Cocktails</Typography>
                    </Grid>

                    {user && (
                        <Grid item>
                            <Button coloe="primary" component={Link} to="/cocktail/new">Add</Button>
                        </Grid>
                    )}
                </Grid>
                <Grid item>
                    <Grid item container justifyContent="center" direction="row" spacing={1}>
                        {fetchLoading ? (
                            <Grid container justifyContent="center" alignItems="center">
                                <Grid item>
                                    <CircularProgress/>
                                </Grid>
                            </Grid>
                        ) : cocktails.map(cocktail => (
                            <CocktailItem
                                key={cocktail._id}
                                id={cocktail._id}
                                name={cocktail.name}
                                recipe={cocktail.recipe}
                                image={cocktail.image}
                            />
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </CocktailsLayout>

    );
};

export default MainPage;