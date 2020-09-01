import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import _ from "lodash";

import recipeActions from "store/recipe/actions";

import { recipeComplexity } from "helpers/params";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

import { ReactComponent as EmptyImg } from "assets/icons/empty-recipe-img.svg";

import "./styles.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(recipeActions.get());
  }, [dispatch]);

  const recipeList = useSelector((state) => _.get(state.recipe, "list"));

  const FormRow = ({ recipeItem }) => {
    const complexityName = recipeComplexity[recipeItem.complexity].name;
    return (
      <Grid item lg={4} md={4} sm={6} xs={12}>
        <Link to={`/recipe/${recipeItem.id}`}>
          <Card className={classes.root}>
            <CardActionArea>
              {!_.isNil(recipeItem.image) ? (
                <CardMedia
                  component="img"
                  alt="recipe_img"
                  image={recipeItem.image}
                  title="recipe_img"
                />
              ) : (
                <EmptyImg />
              )}
              <Divider />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {recipeItem.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
                <Divider />
                <div>
                  <FavoriteIcon /> {recipeItem.likes}
                </div>
                <div>{complexityName}</div>
              </CardContent>
            </CardActionArea>
          </Card>
        </Link>
      </Grid>
    );
  };

  return (
    <div className={classes.root}>
      <Typography align="center" variant="h6">
        Каталог рецептов
      </Typography>
      <Grid container spacing={3}>
        {_.map(recipeList, (item) => {
          return <FormRow recipeItem={item} />;
        })}
      </Grid>
    </div>
  );
};

export default Dashboard;
