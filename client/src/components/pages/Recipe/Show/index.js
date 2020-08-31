import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from 'moment';
import 'moment/locale/ru';
import _ from "lodash";

import recipeActions from "store/recipe/actions";

import { recipeComplexity, recipeCategory } from 'helpers/params'

import Divider from "@material-ui/core/Divider";
import FavoriteIcon from "@material-ui/icons/Favorite";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import { ReactComponent as EmptyImg } from "assets/icons/empty-recipe-img.svg";

import "./style.css";

moment.locale('ru');

const Show = (props) => {
  const dispatch = useDispatch();

  const currentId = props.match.params.id

  useEffect(() => {
    dispatch(recipeActions.getId(currentId));
  }, [dispatch]);

  const recipe = useSelector(state => _.get(state.recipe, 'current'))
  
  const createdAt = !_.isEmpty(recipe) && moment(recipe.createdAt).format("DD MMMM YYYY")
  const complexity = !_.isEmpty(recipe) && recipeComplexity[recipe.complexity].name
  const category = !_.isEmpty(recipe) && recipeCategory[recipe.category].name
  
  return (
    <div className="recipe-container">
      <div className="recipe-header">
        <div className="recipe-name">{recipe.name}</div>
        <div className="recipe-info">
          <div className="recipe-category">{category}</div>
          <Divider />
          <div className="recipe-date">{createdAt}</div>
        </div>
      </div>
      <Divider />
      <div className="recipe-description">
        <div className="recipe-image">
          {!_.isNil(recipe.image) ? (
            <img
              className="recipe-item-image"
              src={recipe.image}
              alt=""
            />
          ) : (
            <EmptyImg />
          )}
        </div>
        <div className="recipe-description-info ">
          <div className="recipe-description-text col-md-8">{recipe.description}</div>
          <div className="recipe-description-main">
            <div className="recipe-description-item">
              <div className="recipe-description-item-name">
                Сложность приготовления:
              </div>
              <div className="recipe-description-item-desc">{complexity}</div>
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
      <div className="recipe-ingredients">
        <div className="recipe-ingredients-main">
          <div className="recipe-item-title">Ингредиенты</div>
          <List component="nav" aria-label="secondary mailbox folders">
            <ListItem className="recipe-ingredients-list">
              <ListItemText primary="- огурцы – 1,5 кг" />
              <ListItemText primary="- чеснок – 5–6 зубчиков" />
              <ListItemText primary="- листья хрена – 1–2 шт" />
              <ListItemText primary="- листья вишни – 3 шт." />
              <ListItemText primary="- листья смородины – 5–6 шт." />
              <ListItemText primary="- укроп – 3 веточки" />
              <ListItemText primary="- питьевая вода – 2 л" />
              <ListItemText primary="- соль – 4 ст. л." />
              <ListItemText primary="- душистый перец – 8–10 шт." />
              <ListItemText primary="- гвоздика – 3–4 бутона" />
              <ListItemText primary="- лавровый лист – 3–4 шт." />
            </ListItem>
          </List>
        </div>
        <div className="recipe-ingredients-alt">
          <div className="recipe-item-title">Альтернативные ингредиенты</div>
          <List component="nav" aria-label="secondary mailbox folders">
            <ListItem className="recipe-ingredients-list">
              <ListItemText primary="  " />
              <ListItemText primary="  " />
              <ListItemText primary="- петрушка - 3 веточки" />
              <ListItemText primary="  " />
              <ListItemText primary="- листья яблони – 5–6 шт." />
              <ListItemText primary="  " />
              <ListItemText primary="  " />
              <ListItemText primary="   " />
              <ListItemText primary="  " />
              <ListItemText primary="  " />
              <ListItemText primary="  " />
            </ListItem>
          </List>
        </div>
      </div>
      <Divider />
      <div className="recipe-steps">
        <div className="recipe-item-title">ПОШАГОВЫЙ РЕЦЕПТ ПРИГОТОВЛЕНИЯ</div>
        <div className="recipe-steps-item">
          <div className="recipe-steps-item-index">Шаг 1</div>
          <div className="recipe-steps-item-desc">
            Подготовьте все ингредиенты для приготовления хрустящих малосольных
            огурцов. Прежде всего, отберите огурцы. Они должны быть некрупными,
            не больше 6–7 см в длину. Вымойте их обсушите бумажными полотенцами
            и срежьте кончики. Зубчики чеснока очистите. Можно крупно их
            нарезать. Листья хрена, вишни и смородины, а также укроп вымойте и
            хорошо обсушите на бумажных полотенцах.
          </div>
        </div>
        <div className="recipe-steps-item">
          <div className="recipe-steps-item-index">Шаг 2</div>
          <div className="recipe-steps-item-desc">
            Подготовьте все ингредиенты для приготовления хрустящих малосольных
            огурцов. Прежде всего, отберите огурцы. Они должны быть некрупными,
            не больше 6–7 см в длину. Вымойте их обсушите бумажными полотенцами
            и срежьте кончики. Зубчики чеснока очистите. Можно крупно их
            нарезать. Листья хрена, вишни и смородины, а также укроп вымойте и
            хорошо обсушите на бумажных полотенцах.
          </div>
        </div>
      </div>
    </div>
  );
}

export default Show;