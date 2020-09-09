import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from 'react-loader-spinner'

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
import TextField from "@material-ui/core/TextField";

import { ReactComponent as EmptyImg } from "assets/icons/empty-recipe-img.svg";
import { ReactComponent as NothingFound } from "assets/ne_res.svg";

import "./styles.css";


const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: "none",
    display: "flex",
    height: "100%"
  },
  root: {
    flexGrow: 1,
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  ingredients: {
    width: "350px",
    minHeight: "50px",
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap"
  },
  cardContent: {
    height: "50%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "95%"
  }
}));

const Dashboard = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!_.isNil(props.authorId)) {
      dispatch(
        recipeActions.get({
          authorId: props.authorId,
        })
      );
    } else {
      dispatch(recipeActions.get());
    }
  }, [dispatch, props.authorId]);

  const recipeList = useSelector((state) => _.get(state.recipe, "list"));
  const isGetFetching = useSelector((state) => _.get(state.recipe, "isGetFetching"));

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
          value={_.get(complexity, "value", "")}
          onChange={(e) => setFilter(e)}
        >
          <MenuItem value="">Любой</MenuItem>
          {_.map(recipeComplexity, (item, index) => {
            return (
              <MenuItem key={index} value={item.value}>
                {item.name}
              </MenuItem>
            );
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
            return (
              <MenuItem key={index} value={item.value}>
                {item.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    );
  };

  const renderResetFilters = () => {
    return <Button onClick={() => resetFilters()}>Сбросить фильтры</Button>;
  };

  const FormRow = ({ recipeItem }) => {
    const complexity = recipeComplexity[recipeItem.complexity];
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
              <CardContent className={classes.cardContent}>
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
                    <div className="recipe-card-likes-data">
                      {_.isNil(recipeItem.likes) ? 0 : recipeItem.likes}
                    </div>
                  </div>
                  <div className="recipe-card-complexity">
                    Уровень:&nbsp;
                    <div className="recipe-card-complexity-name" style={{color: complexity.color}}>
                      {complexity.name}
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
        {_.isNil(props.authorId) ? "Каталог рецептов" : "Мои рецепты"}
      </Typography>
      
      <div className="dashboard-filters">
        {renderFilter()}
        <div className="dashboard-filters-sort">
          {sortByComplexity()}
          {sortByCategory()}
        </div>
        {renderResetFilters()}
      </div>
      {isGetFetching ? (
        <div className="dashboard-loading">
          <Loader
            type="Oval"
            color="#16612c"
            height={150}
            width={150}
          />
        </div>
        
      ) : (
        !_.isEmpty(recipeList) ? (
          <Grid container spacing={3}>
            {_.map(recipeList, (item) => {
              return <FormRow key={item.id} recipeItem={item} />;
            })}
          </Grid>
        ) : (
          <div className="dashboard-nothing-found">
            <NothingFound />
          </div>
        ))}
      
    </div>
  );
};

export default Dashboard;
