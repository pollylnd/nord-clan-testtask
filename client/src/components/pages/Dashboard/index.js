import React, { useEffect } from "react";
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
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import Chip from "@material-ui/core/Chip";

import { ReactComponent as EmptyImg } from "assets/icons/empty-recipe-img.svg";

import "./styles.css";
import { TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: "none",
  },
  root: {
    flexGrow: 1,
  },
  card: {
    height: 420,
  },
  ingredients: {
    height: 50,
  },
}));

const Dashboard = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    if(!_.isNil(props.authorId)) {
      dispatch(recipeActions.get({
        authorId: props.authorId
      }));
    } else {
      dispatch(recipeActions.get());
    }
    
  }, [dispatch, props.authorId]);

  const recipeList = useSelector((state) => _.get(state.recipe, "list"));

  const recipeSearchFilter = useSelector((state) =>
    _.get(state.recipe, "filters.recipeSearch")
  );
  const recipeComplexityFilter = useSelector((state) =>
    _.get(state.recipe, "filters.complexity")
  );
  const recipeCategoryFilter = useSelector((state) =>
    _.get(state.recipe, "filters.category")
  );

  const filters = {
    recipeSearch: recipeSearchFilter,
    complexity: recipeComplexityFilter,
    category: recipeCategoryFilter,
  };

  const setSearchFilter = ({ target }) => {
    const { value } = target;
    const query = {
      ...filters,
      recipeSearch: value !== "" ? value : undefined,
    };
    dispatch(recipeActions.setFilters(query));
  };

  const setFilter = ({ target }) => {
    const { value, name } = target;
    const query = {
      ...filters,
      [name]: value,
    };
    dispatch(recipeActions.setFilters(query));
  };

  const resetFilters = () => {
    const query = {
      filters: {
        recipeSearch: "",
        complexity: "",
        category: "",
      },
    };
    dispatch(recipeActions.resetFilters(query));
  };

  const renderFilter = () => {
    return (
      <TextField
        id="outlined-search"
        className="dashboard-filter-search"
        label="Поиск"
        type="search"
        variant="outlined"
        placeholder="Название рецепта или ингредиент"
        onChange={(e) => setSearchFilter(e)}
        value={recipeSearchFilter}
      />
    );
  };

  const sortByComplexity = () => {
    const complexity = recipeComplexity[recipeComplexityFilter];
    return (
      <FormControl className="dashboard-sorter">
        <InputLabel id="demo-simple-select-label">Уровень сложности</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          name="complexity"
          value={!_.isNil(complexity) ? complexity.value : ""}
          onChange={(e) => setFilter(e)}
        >
          <MenuItem value="">Любой</MenuItem>
          {_.map(recipeComplexity, (item, index) => {
            return <MenuItem key={index} value={item.value}>{item.name}</MenuItem>;
          })}
        </Select>
      </FormControl>
    );
  };

  const sortByCategory = () => {
    const category = recipeCategory[recipeCategoryFilter];
    return (
      <FormControl className="dashboard-sorter">
        <InputLabel id="demo-simple-select-label">Категория</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          name="category"
          value={!_.isNil(category) ? category.value : ""}
          onChange={(e) => setFilter(e)}
        >
          <MenuItem value="">Любая</MenuItem>
          {_.map(recipeCategory, (item, index) => {
            return <MenuItem key={index} value={item.value}>{item.name}</MenuItem>;
          })}
        </Select>
      </FormControl>
    );
  };

  const renderResetFilters = () => {
    return <Button onClick={() => resetFilters()}>Сбросить фильтры</Button>;
  };

  const FormRow = ({ recipeItem }) => {
    const complexityName = recipeComplexity[recipeItem.complexity].name;
    const categoryName = recipeCategory[recipeItem.category].name;
    const ingredients = _.map(
      _.map(recipeItem.ingredients, "ingredient"),
      "ingredientName"
    ).join(", ");

    return (
      <Grid item lg={4} md={4} sm={6} xs={12}>
        <Link to={`/recipe/${recipeItem.id}`} className={classes.link}>
          <Card className="recipe-card">
            <CardActionArea className={classes.card}>
              {!_.isNil(recipeItem.image) ? (
                <CardMedia
                  component="img"
                  alt="recipe_img"
                  image={recipeItem.image.src}
                  title="recipe_img"
                />
              ) : (
                <div className="recipe-card-empty-img">
                  <EmptyImg />
                </div>
              )}
              <Divider light variant="middle" />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {recipeItem.name}
                </Typography>
                <Chip
                  className="recipe-card-category"
                  variant="outlined"
                  label={categoryName}
                />
                <Typography
                  className={classes.ingredients}
                  gutterBottom
                  color="textSecondary"
                  variant="body2"
                  component="p"
                >
                  {ingredients}
                </Typography>
                <Divider light variant="middle" />
                <div className="recipe-card-bottom">
                  <div className="recipe-card-likes">
                    <FavoriteIcon /> &nbsp;{" "}
                    <div className="recipe-card-complexity-name">
                      {recipeItem.likes}
                    </div>
                  </div>
                  <div className="recipe-card-complexity">
                    Уровень:&nbsp;
                    <div className="recipe-card-complexity-name">
                      {complexityName}
                    </div>
                  </div>
                </div>
              </CardContent>
            </CardActionArea>
          </Card>
        </Link>
      </Grid>
    );
  };

  return (
    <div className={classes.root}>
      <Typography className="dashboard-title" align="center" variant="h4">
        Каталог рецептов
      </Typography>
      <div className="dashboard-filters">
        {renderFilter()}
        <div className="dashboard-filters-sort">
          {sortByComplexity()}
          {sortByCategory()}
        </div>
        {renderResetFilters()}
      </div>

      <Grid container spacing={3}>
        {_.map(recipeList, (item) => {
          return <FormRow key={item.id} recipeItem={item} />;
        })}
      </Grid>
    </div>
  );
};

export default Dashboard;
