import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";

import recipeActions from "store/recipe/actions";

import { recipeComplexity, recipeCategory, ingredientUnit } from 'helpers/params'

import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import "./style.css";

const Create = () => {
  const dispatch = useDispatch();
  const [complexity, setDiff] = useState("");
  const [category, setCategory] = useState("");
  const [unit, setUnit] = useState("");
  const [stage, setStage] = useState(0);

  const handleChangeUnit = (event) => {
    setUnit(event.target.value);
  };

  const recipe = useSelector(state => _.get(state.recipe, 'create'));

  const handleChange = (e) => {
    const value = _.get(e.target, 'value')
    const key = _.get(e.target, 'name')
    
    dispatch(recipeActions.changeField('create', key, value))
  }

  return (
    <>
      <Typography>Добавление рецепта</Typography>
      <Grid container spacing={3}>
        <Grid item xs={7}>
          <div className="recipe-form">
            <FormControl fullWidth>
              <TextField
                id="outlined-name"
                label="Название"
                name="name"
                value={_.get(recipe, 'name')}
                variant="outlined"
                required
                placeholder="Введите название рецепта"
                onChange={(e) => handleChange(e)}
              />
            </FormControl>

            <Dropzone onDrop={(acceptedFiles) => console.log(acceptedFiles)}>
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>Загрузите фотографию</p>
                  </div>
                </section>
              )}
            </Dropzone>
            <FormControl fullWidth>
              <TextField
                id="outlined-multiline-static"
                label="Описание"
                multiline
                name="description"
                value={_.get(recipe, 'description')}
                rows={4}
                placeholder="Добавьте описание рецепта"
                variant="outlined"
                onChange={(e) => handleChange(e)}
              />
            </FormControl>

            <div className="create-recipe-selectors">
              <FormControl required>
                <InputLabel id="demo-simple-select-label">Сложность</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="complexity"
                  value={recipeComplexity[complexity]}
                  onChange={(e) => handleChange(e)}
                >
                  {
                    _.map(recipeComplexity, item => {
                      return <MenuItem value={item.value}>{item.name}</MenuItem>
                    })
                  }
                </Select>
              </FormControl>
              <FormControl required>
                <InputLabel id="demo-simple-select-label">Категория</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="category"
                  value={recipeCategory[category]}
                  onChange={(e) => handleChange(e)}
                >
                  {
                    _.map(recipeCategory, item => {
                      return <MenuItem value={item.value}>{item.name}</MenuItem>
                    })
                  }
                </Select>
              </FormControl>
            </div>
            <div>
              <Button>+ Добавить шаг</Button>
              <Card>
                <CardContent>
                  Шаг 1
                  <FormControl fullWidth>
                    <TextField
                      id="outlined-name"
                      label=""
                      // value={name}
                      // onChange={handleChange}
                      variant="outlined"
                      required
                      placeholder="Описание"
                      onChange={(e) => handleChange(e)}
                    />
                  </FormControl>
                </CardContent>
              </Card>
            </div>
          </div>
        </Grid>
        <Grid item xs={5}>
          Ингредиенты
          <>
            <Button>+ Добавить ингредиент</Button>
            <Card>
              <CardContent className="recipe-ingr-form">
                <TextField
                  id="outlined-name"
                  label=""
                  // value={name}
                  // onChange={handleChange}
                  variant="outlined"
                  required
                  placeholder="Название"
                  onChange={(e) => handleChange(e)}
                />
                <TextField
                  id="outlined-name"
                  label=""
                  // value={name}
                  variant="outlined"
                  required
                  placeholder="Кол-во"
                  type="number"
                  onChange={(e) => handleChange(e)}
                />
                <FormControl required>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={unit}
                    onChange={handleChangeUnit}
                  >
                    <MenuItem value={1}>стакан</MenuItem>
                    <MenuItem value={2}>ст. л.</MenuItem>
                    <MenuItem value={3}>ч. л.</MenuItem>
                    <MenuItem value={4}>по вкусу</MenuItem>
                    <MenuItem value={5}>шт.</MenuItem>
                    <MenuItem value={6}>г.</MenuItem>
                    <MenuItem value={7}>мл.</MenuItem>
                    <MenuItem value={8}>кг.</MenuItem>
                  </Select>
                </FormControl>
              </CardContent>
            </Card>
          </>
        </Grid>
      </Grid>
      <Button>Опубликовать</Button>
    </>
  );
};

export default Create;
