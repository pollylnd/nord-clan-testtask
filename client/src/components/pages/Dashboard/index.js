import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import recipeActions from "store/recipe/actions";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import image from "./b432a7d2.jpg";
import FavoriteIcon from "@material-ui/icons/Favorite";

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

  const recipeItem = () => {
    return (
      <div className="recipe-item">
        <div className="recipe-item-image-wrapper">
          <img className="recipe-item-image" src={image} alt="Малосольные огурчики" />
        </div>
        <div>Малосольные огурчики</div>
        <div>
          <FavoriteIcon /> 16
        </div>
        <div>Огурцы, чеснок, листья хрена....</div>
        <div>легко</div>
      </div>
    );
  };

  const FormRow = () => {
    return (
      <React.Fragment>
        <Grid item xs={4}>
          <Paper className={classes.paper}>
            <Link to="/recipe">{recipeItem()}</Link>
          </Paper>
        </Grid>
      </React.Fragment>
    );
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid container item xs={12} spacing={3}>
          <FormRow />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
