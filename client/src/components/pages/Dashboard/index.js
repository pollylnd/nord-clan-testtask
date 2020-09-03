import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import _ from "lodash";

import recipeActions from "store/recipe/actions";

import { recipeComplexity, recipeCategory } from "helpers/params";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import InputLabel from "@material-ui/core/InputLabel";

import { ReactComponent as EmptyImg } from "assets/icons/empty-recipe-img.svg";

import "./styles.css";
import { TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: 'none'
  },
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

  const [category, setCategory] = useState([]);

  const handleSelectCategory = (event) => {
    setCategory(event.target.value);
  };

  const recipeList = useSelector((state) => _.get(state.recipe, "list"));
  const recipeSearchFilter = useSelector((state) =>
    _.get(state.recipe, "filters.recipeSearch")
  );
  const recipeComplexityFilter = useSelector((state) =>
    _.get(state.recipe, "filters.complexity")
  );

  const setSearchFilter = ({ target }) => {
    const { value } = target;
    const query = { recipeSearch: value !== "" ? value : undefined };
    dispatch(recipeActions.setFilters(query));
  };

  const setFilter = ({ target }) => {
    const { value, name } = target;
    const query = {
      [name]: value
    }

    dispatch(recipeActions.setFilters(query))
  };

  const renderFilter = () => {
    return (
      <TextField
        id="outlined-search"
        label="Search field"
        type="search"
        variant="outlined"
        onChange={(e) => setSearchFilter(e)}
        value={recipeSearchFilter}
      />
    );
  };

  const sortByComplexity = () => {
    return (
      <FormControl>
        <InputLabel htmlFor="age-native-helper">Сложность</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          name="complexity"
          value={recipeComplexity[_.get(recipeList, "complexity")]}
          onChange={(e) => setFilter(e)}
        >
          <MenuItem value="">&nbsp;</MenuItem>
          {_.map(recipeComplexity, (item) => {
            return <MenuItem value={item.value}>{item.name}</MenuItem>;
          })}
        </Select>
      </FormControl>
    );
  };

  const sortByCategory = () => {
    return (
      <FormControl>
        <InputLabel htmlFor="age-native-helper">Сложность</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          name="category"
          // renderValue={(selected) => selected.join(', ')}
          // value={category}
          // onChange={(e) => handleSelectCategory(e)}
        >
          {_.map(recipeCategory, (item) => {
            return (
              <MenuItem value={item.value}>
                {/* <Checkbox checked={recipeComplexity.indexOf(item.value) > -1} /> */}
                <ListItemText primary={item.name} />
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    );
  };

  const FormRow = ({ recipeItem }) => {
    const complexityName = recipeComplexity[recipeItem.complexity].name;
    const ingredients = _.map(_.map(recipeItem.ingredients, 'ingredient'), 'ingredientName').join(', ');

    return (
      <Grid item lg={4} md={4} sm={6} xs={12}>
        <Link to={`/recipe/${recipeItem.id}`} className={classes.link}>
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
                  {ingredients}
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
      <Typography align="center" variant="h4">
        Каталог рецептов
      </Typography>
      {renderFilter()}
      {sortByComplexity()}
      {sortByCategory()}
      <Grid container spacing={3}>
        {_.map(recipeList, (item) => {
          return <FormRow recipeItem={item} />;
        })}
      </Grid>
    </div>
  );
};

export default Dashboard;
