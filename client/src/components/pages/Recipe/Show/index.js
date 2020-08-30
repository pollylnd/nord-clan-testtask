import React from "react";

import Divider from "@material-ui/core/Divider";
import FavoriteIcon from "@material-ui/icons/Favorite";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import image from "./b432a7d2.jpg";

import "./style.css";

const Show = () => {
  return (
    <div className="recipe-container">
      <div className="recipe-header">
        <div className="recipe-name">Малосольные огурчики</div>
        <div className="recipe-info">
          <div className="recipe-category">Закуски</div>
          <Divider />
          <div className="recipe-date">5 июня 2020</div>
        </div>
      </div>
      <Divider />
      <div className="recipe-description">
        <div className="recipe-image">
          <img src={image} alt="image" />
        </div>
        <div className="recipe-description-info ">
          <div className="recipe-description-text col-md-8">
            Приготовить хрустящие малосольные огурцы — не так просто, как
            кажется на первый взгляд. Многие пробуют делать это, причем не один
            раз, но в результате все получается как-то не так. Почему? Причин
            несколько. Иногда всему виной могут быть сами огурцы. Дело в том,
            что засаливать лучше всего очень свежие плоды, в идеале — только что
            собранные с грядки. Именно они имеют упругую кожицу и идеальную
            хрустящую мякоть, которые при засаливании не утратят этих свойств.
            Причиной неудовлетворительного результата, конечно же, может стать
            нарушение технологии засаливания и, наконец, неудачный рецепт. Наш
            же — проверенный и надежный! Попробуйте приготовить малосольные
            огурцы по этому рецепту, чтобы затем сполна насладиться их хрустящей
            текстурой и безупречным вкусом.
          </div>
          <div className="recipe-description-main">
            <div className="recipe-description-item">
              <div className="recipe-description-item-name">
                Сложность приготовления:
              </div>
              <div className="recipe-description-item-desc">Легко</div>
            </div>
            <div className="recipe-description-item">
              <div className="recipe-description-item-name">
                Количество порций:
              </div>
              <div className="recipe-description-item-desc">4</div>
            </div>
            <div className="recipe-description-item">
              <div className="recipe-description-item-name">
                <FavoriteIcon />
                16
              </div>
            </div>
          </div>
        </div>
      </div>
      <Divider />
      <div className="recipe-ingridients">
        <div className="recipe-ingridients-main">
          <div className="recipe-item-title">Ингредиенты</div>
          <List component="nav" aria-label="secondary mailbox folders">
            <ListItem className="recipe-ingridients-list">
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
        <div className="recipe-ingridients-alt">
          <div className="recipe-item-title">Альтернативные ингредиенты</div>
          <List component="nav" aria-label="secondary mailbox folders">
            <ListItem className="recipe-ingridients-list">
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