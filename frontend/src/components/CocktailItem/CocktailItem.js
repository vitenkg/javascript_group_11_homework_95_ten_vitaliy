import {
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    Grid,
    IconButton,
    makeStyles,
    Typography
} from "@material-ui/core";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import {apiURL} from "../../config";
import noImageFile from '../../assets/images/2048px-No_image_available.svg.png';


const useStyles = makeStyles({
    card: {
        height: '100%'
    },
    media: {
        height: 0,
        paddingTop: '56.25%'
    }
})

const CocktailItem = ({name, recipe, id, image}) => {
    const classes = useStyles();

    let cardImage = noImageFile;

    if (image) {
        cardImage = apiURL + '/uploads/' + image;
    }

    return (
        <Grid item xs={12} sm={12} md={6} lg={4}>
            <Card className={classes.card}>
                <CardHeader title={name}/>
                <CardMedia
                    image={cardImage}
                    title={name}
                    className={classes.media}
                />
                <CardContent>
                    <Typography variant="subtitle1">
                        {recipe}
                    </Typography>
                </CardContent>
                <CardActions>
                    <IconButton component={Link} to={'/cocktail/' + id}>
                        <ArrowForwardIcon />
                    </IconButton>
                </CardActions>
            </Card>
        </Grid>
    );
};

CocktailItem.propTypes = {
    name: PropTypes.string.isRequired,
    recipe: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    image: PropTypes.string
};

export default CocktailItem;