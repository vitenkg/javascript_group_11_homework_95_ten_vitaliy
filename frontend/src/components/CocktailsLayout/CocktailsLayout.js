import React from 'react';
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    content: {
        flexGrow: 1
    },
}));

const CocktailsLayout = ({children}) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.content}>
                {children}
            </div>
        </div>
    );
};

export default CocktailsLayout;