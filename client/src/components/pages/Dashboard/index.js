import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import _ from "lodash";

import recipeActions from "store/recipe/actions";

import { recipeComplexity } from 'helpers/params'

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import FavoriteIcon from "@material-ui/icons/Favorite";

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
    const complexityName = recipeComplexity[recipeItem.complexity].name
    return (
      <Grid item lg={4} md={4} sm={6} xs={12}>
        <Paper className={classes.paper}>
          <Link to={`/recipe/${recipeItem.id}`}>
            <div className="recipe-item">
              <div className="recipe-item-image-wrapper">
                {!_.isNil(recipeItem.image) ? (
                  <img
                    className="recipe-item-image"
                    src={recipeItem.image}
                    alt=""
                  />
                ) : (
                  <EmptyImg />
                )}
              </div>
              <div>{recipeItem.name}</div>
              <div>
                <FavoriteIcon /> {recipeItem.likes}
              </div>
              <div>Огурцы, чеснок, листья хрена....</div>
              <div>{complexityName}</div>
            </div>
          </Link>
        </Paper>
      </Grid>
    );
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {_.map(recipeList, (item) => {
          return <FormRow recipeItem={item} />;
        })}
      </Grid>
    </div>
  );
};

export default Dashboard;