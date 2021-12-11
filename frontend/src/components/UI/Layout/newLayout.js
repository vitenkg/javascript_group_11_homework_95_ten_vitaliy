import React from 'react';
import {makeStyles} from "@material-ui/core";
import NewDrawer from "../NewDrawer/NewDrawer";


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    content: {
        flexGrow: 1,
    },
}));


const NewLayout = ({children}) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <NewDrawer/>
            <div className={classes.content}>
                {children}
            </div>
        </div>
    );
};

export default NewLayout;