import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";

import recipeActions from "store/recipe/actions";

import {
  recipeComplexity,
  recipeCategory,
  ingredientUnit,
} from "helpers/params";

import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import DeleteIcon from "@material-ui/icons/Delete";
import ClearIcon from '@material-ui/icons/Clear';

import "../style.css";

const Create = () => {
  const dispatch = useDispatch();
  const [countIngredients, setCountIngredients] = useState(1);
  const [countStages, setCountStages] = useState(1);
  const [errorFields, setErrorFields] = useState([]);

  const recipe = useSelector((state) => _.get(state.recipe, "create"));
  const currentUser = useSelector((state) => _.get(state.auth, "user"));

  const mapValidationSimpleFields = ["name", "complexity", "category"];

  const validateIngredients = () => {
    if (countIngredients > 0 && !_.isNil(recipe.ingredients)) {
      for (const ingredient of recipe.ingredients) {
        if (
          ingredient.ingredientName &&
          ingredient.ingredientAmount &&
          ingredient.unit
        ) {
          return true;
        }
      }
    }

    return false;
  };

  const validateStages = () => {
    if (countStages > 0 && !_.isNil(recipe.stages)) {
      for (const stages of recipe.stages) {
        if (
          stages.description
        ) {
          return true;
        }
      }
    }
    return false;
  };

  const handleChange = (e) => {
    const value = _.get(e.target, "value");
    const key = _.get(e.target, "name");

    dispatch(recipeActions.changeField("create", key, value));
  };

  const onDrop = (acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const fileReader = new FileReader();
      fileReader.onload = function (event) {
        const image = new Image();
        image.src = fileReader.result;
        image.onload = function (e) {
          const imageInfo = {
            name: file.name,
            src: fileReader.result,
            type: file.type,
          };
          dispatch(recipeActions.changeField("create", "image", imageInfo));
        };
      };
      fileReader.readAsDataURL(file);
    });
  };

  const handleRemoveImage = () => {
    dispatch(recipeActions.changeField("create", "image", null));
  };

  const handleChangeIngredient = (e, index) => {
    const value = _.get(e.target, "value");
    const field = _.get(e.target, "name");

    dispatch(
      recipeActions.changeFieldMultiple(
        "create",
        "ingredients",
        value,
        index,
        field
      )
    );
  };

  const handleChangeStage = (e, index) => {
    const value = _.get(e.target, "value");
    const field = _.get(e.target, "name");

    dispatch(
      recipeActions.changeFieldMultiple("create", "stages", value, index, field)
    );
  };

  const handleRemoveStage = (index) => {
    dispatch(recipeActions.removeFieldMultiple("create", "stages", index));

    setCountStages((prevCount) => prevCount - 1);
  };

  const handleAddStage = () => {
    dispatch(recipeActions.addFieldMultiple("create", "stages", countStages));

    setCountStages((prevCount) => prevCount + 1);
  };

  const handleAddIngredient = () => {
    dispatch(
      recipeActions.addFieldMultiple("create", "ingredients", countIngredients)
    );

    setCountIngredients((prevCount) => prevCount + 1);
  };

  const handleRemoveIngredient = (index) => {
    dispatch(recipeActions.removeFieldMultiple("create", "ingredients", index));

    setCountIngredients((prevCount) => prevCount - 1);
  };

  const handleChangeAltIngredient = (e, index) => {
    const value = _.get(e.target, "value");
    const field = _.get(e.target, "name");

    dispatch(
      recipeActions.changeAltIngredient(
        "create",
        "ingredients",
        index,
        field,
        value
      )
    );
  };

  const handleCreate = () => {
    const formData = recipe;
    const notValidFields = [];
    const isValidIngredients = validateIngredients();
    const isValidStages = validateStages();

    formData.authorId = currentUser.id;
    formData.author = currentUser.name;

    for (let field in formData) {
      if (!_.includes(mapValidationSimpleFields, field)) {
        continue;
      }

      const stringValue = !_.isNil(formData[field]) && formData[field].toString();

      if ((_.isNil(stringValue) || _.isEmpty(stringValue))) {
        notValidFields.push(field);
        setErrorFields((prev) => [...prev, field]);
      }
    }

    if (!isValidIngredients) {
      notValidFields.push("ingredients");
      setErrorFields((prev) => [...prev, "ingredients"]);
    }

    if (!isValidStages) {
      notValidFields.push("stages");
      setErrorFields((prev) => [...prev, "stages"]);
    }

    if (_.isEmpty(notValidFields)) {
      dispatch(recipeActions.create(formData));
    }
  };

  const stageForm = () => {
    return _.map(new Array(countStages), (v, i) => {
      if (!recipe.stages) {
        return false;
      }
      const stageItem = recipe.stages[i];
      return (
        <CardContent key={i} className="recipe-stages-form">
          <div className="recipe-stages-step">
            Шаг {i + 1}
          </div>
          <FormControl fullWidth>
            <TextField
              error={
                _.includes(errorFields, "stages") && _.isNil(stageItem.description)
                  ? true
                  : false
              }
              id="outlined-name"
              value={_.get(stageItem, "description")}
              name="description"
              rows={4}
              multiline
              variant="outlined"
              required
              placeholder="Описание"
              onChange={(e) => handleChangeStage(e, i)}
            />
          </FormControl>
          <DeleteIcon className="recipe-delete-icon" onClick={() => handleRemoveStage(i)} />
        </CardContent>
      );
    });
  };

  const ingredientForm = () => {
    return _.map(new Array(countIngredients), (value, index) => {
      if (!recipe.ingredients) {
        return false;
      }
      const ingredientItem = recipe.ingredients[index];
      return (
        <CardContent key={index} className="recipe-ingredient-form">
          <div className={_.includes(errorFields, "ingredients") &&
          ( _.isNil(ingredientItem.ingredientName) || (_.isEmpty(ingredientItem.ingredientAmount) || ingredientItem.ingredientAmount === 0) ||
           _.isNil(ingredientItem.unit))
              ? "ingredient-forms-error"
              : "ingredient-forms"}
          >
            <TextField
              id="outlined-name"
              className="recipe-ingredient-name"
              value={_.get(ingredientItem, "ingredientName")}
              name="ingredientName"
              variant="outlined"
              placeholder="Название"
              onChange={(e) => handleChangeIngredient(e, index)}
            />
            <TextField
              id="outlined-name"
              className="recipe-ingredient-amount"
              value={_.get(ingredientItem, "ingredientAmount")}
              name="ingredientAmount"
              variant="outlined"
              placeholder="Кол-во"
              type="number"
              inputProps={{ min: "0" }}
              onChange={(e) => handleChangeIngredient(e, index)}
            />
            <FormControl required>
              <Select
                className="recipe-ingredient-unit"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="unit"
                value={_.get(ingredientItem, "unit")}
                onChange={(e) => handleChangeIngredient(e, index)}
              >
                {_.map(ingredientUnit, (item) => {
                  return <MenuItem key={item.value} value={item.value}>{item.name}</MenuItem>;
                })}
              </Select>
            </FormControl>
            <DeleteIcon className="recipe-delete-icon" onClick={() => handleRemoveIngredient(index)} />
          </div>
          <div className="ingredient-alt-forms">
            {altIngredientForm(ingredientItem, index)}
          </div>
        </CardContent>
      );
    });
  };

  const altIngredientForm = (ingredient, index) => {
    const altIngredient = !_.isNil(ingredient) && ingredient.altIngredient;
    return (
      <>
        <TextField
          id="outlined-name"
          className="recipe-ingredient-name"
          value={_.get(altIngredient, "altIngredientName")}
          name="ingredientName"
          variant="outlined"
          required
          placeholder="Альтернативный ингредиент"
          onChange={(e) => handleChangeAltIngredient(e, index)}
        />
        <TextField
          id="outlined-name"
          className="recipe-ingredient-amount"
          value={_.get(altIngredient, "altIngredientAmount")}
          name="ingredientAmount"
          variant="outlined"
          required
          placeholder="Кол-во"
          type="number"
          onChange={(e) => handleChangeAltIngredient(e, index)}
        />
        <FormControl required>
          <Select
            labelId="demo-simple-select-label"
            className="recipe-ingredient-unit"
            id="demo-simple-select"
            name="unit"
            value={_.get(altIngredient, "unit")}
            onChange={(e) => handleChangeAltIngredient(e, index)}
          >
            {_.map(ingredientUnit, (item) => {
              return <MenuItem key={item.value} value={item.value}>{item.name}</MenuItem>;
            })}
          </Select>
        </FormControl>
      </>
    );
  };

  return (
    <div className="recipe-form-wrapper">
      <Typography align="center" variant="h3">
        Добавление рецепта
      </Typography>
      <Card>
        <CardContent>
          <div className="recipe-form">
            <FormControl fullWidth>
              <TextField
                error={
                  _.includes(errorFields, "name") &&
                  _.isEmpty(_.get(recipe, "name"))
                    ? true
                    : false
                }
                id="outlined-name"
                label="Название"
                name="name"
                value={_.get(recipe, "name")}
                variant="outlined"
                required
                placeholder="Введите название рецепта"
                onChange={(e) => handleChange(e)}
              />
            </FormControl>

            <div className="recipe-upload-image">
              <Dropzone
                onDrop={(acceptedFiles) => onDrop(acceptedFiles)}
                accept="image/*"
                multiple={false}
              >
                {({ getRootProps, getInputProps }) => (
                  <section>
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <Button variant="contained" component="span">
                        Загрузите изображение
                      </Button>
                    </div>
                    {!_.isNil(recipe.image) && (
                      <div className="recipe-image">
                        <span className="recipe-image-name">
                          {recipe.image.name}
                        </span>
                        <div>
                          <img
                            className="img-preview"
                            src={recipe.image.src}
                            alt={recipe.image.name}
                          />
                          <Button onClick={() => handleRemoveImage()}>
                            <ClearIcon />
                          </Button>
                        </div>
                      </div>
                    )}
                  </section>
                )}
              </Dropzone>
            </div>

            <FormControl fullWidth>
              <TextField
                id="outlined-multiline-static"
                label="Описание"
                multiline
                name="description"
                value={_.get(recipe, "description")}
                rows={4}
                placeholder="Добавьте описание рецепта"
                variant="outlined"
                onChange={(e) => handleChange(e)}
              />
            </FormControl>

            <div className="create-recipe-selectors">
              <Box width="45%">
                <Card>
                  <CardContent>
                    <FormControl
                      fullWidth
                      required
                      error={
                        _.includes(errorFields, "complexity") &&
                        _.isNil(_.get(recipe, "complexity"))
                          ? true
                          : false
                      }
                    >
                      <InputLabel id="demo-simple-select-label">
                        Сложность
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="complexity"
                        value={recipeComplexity[_.get(recipe, "complexity")]}
                        onChange={(e) => handleChange(e)}
                      >
                        {_.map(recipeComplexity, (item) => {
                          return (
                            <MenuItem key={item.value} value={item.value}>{item.name}</MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </CardContent>
                </Card>
              </Box>
              <Box width="45%">
                <Card>
                  <CardContent>
                    <FormControl
                      fullWidth
                      required
                      error={
                        _.includes(errorFields, "category") &&
                        _.isNil(_.get(recipe, "category"))
                          ? true
                          : false
                      }
                    >
                      <InputLabel id="demo-simple-select-label">
                        Категория
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="category"
                        value={recipeCategory[_.get(recipe, "category")]}
                        onChange={(e) => handleChange(e)}
                      >
                        {_.map(recipeCategory, (item) => {
                          return (
                            <MenuItem key={item.value} value={item.value}>{item.name}</MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </CardContent>
                </Card>
              </Box>
            </div>
            <>
              <Button onClick={() => handleAddIngredient()}>
                + Добавить ингредиент
              </Button>
              <Card>{ingredientForm()}</Card>
            </>
            <div className="recipe-form-stages">
              <Button onClick={() => handleAddStage()}>+ Добавить шаг</Button>
              <Card>{stageForm()}</Card>
            </div>
          </div>
        </CardContent>
      </Card>
      <Button className="recipe-create-button" onClick={() => handleCreate()}>Опубликовать</Button>
    </div>
  );
};

export default Create;
