import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import "moment/locale/ru";
import _ from "lodash";

import recipeActions from "store/recipe/actions";

import {
  recipeComplexity,
  recipeCategory,
  ingredientUnit,
} from "helpers/params";

import Divider from "@material-ui/core/Divider";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";

import { ReactComponent as EmptyImg } from "assets/icons/empty-recipe-img.svg";

import "./style.css";

moment.locale("ru");

const Show = (props) => {
  const dispatch = useDispatch();

  const currentId = props.match.params.id;

  useEffect(() => {
    dispatch(recipeActions.getId(currentId));
  }, [dispatch, currentId]);

  const recipe = useSelector((state) => _.get(state.recipe, "current"));
  const currentUser = useSelector((state) => _.get(state.auth, "user"));
  
  const handleRemove = () => {
    dispatch(recipeActions.remove(currentId))
  }

  const createdAt =
    !_.isEmpty(recipe) && moment(recipe.createdAt).format("DD MMMM YYYY");
  const complexity =
    !_.isEmpty(recipe) && recipeComplexity[recipe.complexity].name;
  const category = !_.isEmpty(recipe) && recipeCategory[recipe.category].name;

  const ingredientTable = () => {

    function preparedMainIngredient(ingredientItem) {
      const unit = ingredientUnit[ingredientItem.unit].name;
      return (
        ingredientItem.ingredient.ingredientName + " - " + ingredientItem.ingredientAmount + unit
      );
    }

    function preparedAltIngredient(ingredientItem) {
      const alternativeIngredient = ingredientItem.alternativeIngredient;

      if (!_.isEmpty(alternativeIngredient) && !_.isNil(alternativeIngredient)) {
        const unitInteger = _.get(alternativeIngredient, 'unit');
        const unit = _.get(_.get(ingredientUnit, `${unitInteger}`), 'name');
  
        return (
          _.get(alternativeIngredient, 'ingredientName') +
          " - " +
          _.get(alternativeIngredient, 'ingredientAmount') + 
          unit
        );
      } else {
        return "";
      }
    }

    function createData(mainIngredients, alternativeIngredients) {
      return { mainIngredients, alternativeIngredients };
    }

    const rows = _.map(recipe.ingredients, ingredient => {
      return createData(preparedMainIngredient(ingredient), preparedAltIngredient(ingredient))
    });

    return (
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="recipe-table-header">Ингредиенты</TableCell>
              <TableCell className="recipe-table-header" align="right">Альтернативные ингредиенты</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.mainIngredients}
                </TableCell>
                <TableCell align="right">
                  {row.alternativeIngredients}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <div className="recipe-container">
      <Card variant="outlined" className="recipe-card">
        <CardContent className="recipe-card-content">
          <div className="recipe-header">
            <div className="recipe-header-right">
              <div className="recipe-name">{recipe.name}</div>
              <div className="recipe-author-name">{_.get(recipe, 'author.userName')}</div>
            </div>
            <div className="recipe-info">
              {currentUser && currentUser.id === recipe.authorId && (
                <div className="recipe-actions">
                  <Link to={`/recipe/${recipe.id}/edit`} className="recipe-edit-button">
                    Редактировать
                  </Link>
                  <Button onClick={() => handleRemove()} className="recipe-edit-button">
                    Удалить
                  </Button>
                </div>
              )}
              
              <div className="recipe-category">{category}</div>
              <Divider />
              <div className="recipe-date">{createdAt}</div>
            </div>
          </div>
          <Divider />
          <div className="recipe-description">
            <div className="recipe-image">
              {!_.isNil(recipe.image) ? (
                <img className="recipe-item-image" src={recipe.image.src} alt="" />
              ) : (
                <EmptyImg />
              )}
            </div>
            <div className="recipe-description-info ">
              <div className="recipe-description-text col-md-8">
                {recipe.description}
              </div>
              <div className="recipe-description-main">
                <div className="recipe-description-item">
                  <div className="recipe-description-item-name">
                    Уровень сложности приготовления:
                  </div>
                  <div className="recipe-description-item-desc">
                    {complexity}
                  </div>
                </div>
                <div className="recipe-description-item">
                  <div className="recipe-description-item-name">
                    <FavoriteIcon />
                    {recipe.likes}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Divider />
          <div className="recipe-ingredients">{ingredientTable()}</div>
          <Divider />
          <div className="recipe-steps">
            <div className="recipe-item-title">
              ПОШАГОВЫЙ РЕЦЕПТ ПРИГОТОВЛЕНИЯ
            </div>
            {_.map(recipe.stages, (stage) => {
              return (
                <div className="recipe-steps-item">
                  <div className="recipe-steps-item-index">
                    Шаг {stage.index + 1}
                  </div>
                  <div className="recipe-steps-item-desc">
                    {stage.description}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Show;
