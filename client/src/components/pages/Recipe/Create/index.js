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

import "./style.css";

const Create = () => {
  const dispatch = useDispatch();
  const [countIngredients, setCountIngredients] = useState(1);
  const [countStages, setCountStages] = useState(1);
  const [errorField, setErrorField] = useState([])

  const recipe = useSelector((state) => _.get(state.recipe, "create"));
  const currentUser = useSelector((state) => _.get(state.auth, "user"));

  const handleChange = (e) => {
    const value = _.get(e.target, "value");
    const key = _.get(e.target, "name");
 
    dispatch(recipeActions.changeField("create", key, value));
  };

  const onDrop = (acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const fileReader = new FileReader()
      fileReader.onload = function (event) {
        const image = new Image()
        image.src = fileReader.result
        image.onload = function (e) {
          const imageInfo = {
            name: file.name,
            src: fileReader.result,
            type: file.type
          }
          dispatch(recipeActions.changeField("create", "image", imageInfo));
        }
      }
      fileReader.readAsDataURL(file)
    })
  }

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

    setCountStages(countStages - 1);
  };

  const handleAddStage = () => {
    const newStageIndex = countStages + 1;
    dispatch(recipeActions.addFieldMultiple("create", "stages", countStages));

    setCountStages(newStageIndex);
  };

  const handleRemoveIngredient = (index) => {
    dispatch(recipeActions.removeFieldMultiple("create", "ingredients", index));

    setCountIngredients(countIngredients - 1);
  };

  const handleAddIngredient = () => {
    const newIngredientIndex = countIngredients + 1;
    dispatch(
      recipeActions.addFieldMultiple("create", "ingredients", countIngredients)
    );

    setCountIngredients(newIngredientIndex);
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

  const mapValidation = [
    'name',
    'complexity',
    'category',
  ]

  const handleCreate = () => {
    const formData = recipe;
    const errorFields = [];

    formData.authorId = currentUser.id
    formData.author = currentUser.name
    
    for(let field in formData) {
      if(!formData[field] && _.includes(mapValidation, field)) {
        errorFields.push(field)
        setErrorField(prev => [...prev, field])
      }
    }
    if( _.isEmpty(errorFields)) {
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
        <CardContent>
          Шаг {i + 1}
          <FormControl fullWidth>
            <TextField
              id="outlined-name"
              value={_.get(stageItem, "description")}
              name="description"
              variant="outlined"
              required
              placeholder="Описание"
              onChange={(e) => handleChangeStage(e, i)}
            />
          </FormControl>
          <DeleteIcon onClick={() => handleRemoveStage(i)} />
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
        <CardContent className="recipe-ingr-form">
          <TextField
            id="outlined-name"
            value={_.get(ingredientItem, "ingredientName")}
            name="ingredientName"
            variant="outlined"
            placeholder="Название"
            onChange={(e) => handleChangeIngredient(e, index)}
          />
          <TextField
            id="outlined-name"
            value={_.get(ingredientItem, "ingredientAmount")}
            name="ingredientAmount"
            variant="outlined"
            placeholder="Кол-во"
            type="number"
            onChange={(e) => handleChangeIngredient(e, index)}
          />
          <FormControl required>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="unit"
              value={_.get(ingredientItem, "unit")}
              onChange={(e) => handleChangeIngredient(e, index)}
            >
              {_.map(ingredientUnit, (item) => {
                return <MenuItem value={item.value}>{item.name}</MenuItem>;
              })}
            </Select>
          </FormControl>
          <DeleteIcon onClick={() => handleRemoveIngredient(index)} />

          {altIngredientForm(ingredientItem, index)}
        </CardContent>
      );
    });
  };

  const altIngredientForm = (ingredient, index) => {
    const altIngredient = ingredient.altIngredient;
    return (
      <>
        <TextField
          id="outlined-name"
          value={_.get(altIngredient, "altIngredientName")}
          name="ingredientName"
          variant="outlined"
          required
          placeholder="Название"
          onChange={(e) => handleChangeAltIngredient(e, index)}
        />
        <TextField
          id="outlined-name"
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
            id="demo-simple-select"
            name="unit"
            value={_.get(altIngredient, "unit")}
            onChange={(e) => handleChangeAltIngredient(e, index)}
          >
            {_.map(ingredientUnit, (item) => {
              return <MenuItem value={item.value}>{item.name}</MenuItem>;
            })}
          </Select>
        </FormControl>
      </>
    );
  };

  return (
    <div className="recipe-create-wrapper">
      <Typography align="center" variant="h3">
        Добавление рецепта
      </Typography>
      <Card>
        <CardContent>
          <div className="recipe-form">
            <FormControl fullWidth>
              <TextField
                error={_.includes(errorField, 'name') && _.isEmpty(_.get(recipe, "name")) ? true : false}
                id="outlined-name"
                label="Название"
                name="name"
                value={_.get(recipe, "name")}
                variant="outlined"
                required
                placeholder="Введите название рецепта"
                onChange={(e) => handleChange(e)}
                // helperText="Incorrect entry."
              />
            </FormControl>

            <div className='recipe-upload-image'>
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
                    {
                      !_.isNil(recipe.image) && (
                        <div className="recipe-image">
                          <span className="recipe-image-name">{recipe.image.name}</span>
                          <img className='img-preview' src={recipe.image.src} alt={recipe.image.name} />
                        </div>
                      )
                    }
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
                    <FormControl fullWidth required 
                      error={_.includes(errorField, 'complexity') && _.isNil(_.get(recipe, "complexity")) ? true : false}>
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
                            <MenuItem value={item.value}>{item.name}</MenuItem>
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
                    <FormControl fullWidth required
                      error={_.includes(errorField, 'category') && _.isNil(_.get(recipe, "category")) ? true : false}>
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
                            <MenuItem value={item.value}>{item.name}</MenuItem>
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
            <div>
              <Button onClick={() => handleAddStage()}>+ Добавить шаг</Button>
              <Card>{stageForm()}</Card>
            </div>
          </div>
        </CardContent>
      </Card>
      <Button onClick={() => handleCreate()}>Опубликовать</Button>
    </div>
  );
};

export default Create;
