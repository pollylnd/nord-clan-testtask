import React, { useState } from "react";
import Dropzone from "react-dropzone";

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
  const [diff, setDiff] = useState("");
  const [category, setCategory] = useState("");
  const [unit, setUnit] = useState("");

  const handleChangeDiff = (event) => {
    setDiff(event.target.value);
  };

  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
  };

  const handleChangeUnit = (event) => {
    setUnit(event.target.value);
  };

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
                // value={name}
                // onChange={handleChange}
                variant="outlined"
                required
                placeholder="Введите название рецепта"
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
                rows={4}
                placeholder="Добавьте описание рецепта"
                variant="outlined"
              />
            </FormControl>

            <div className="create-recipe-selectors">
              <FormControl required>
                <InputLabel id="demo-simple-select-label">Сложность</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={diff}
                  onChange={handleChangeDiff}
                >
                  <MenuItem value={1}>Очень простой</MenuItem>
                  <MenuItem value={2}>Простой</MenuItem>
                  <MenuItem value={3}>Средний</MenuItem>
                  <MenuItem value={4}>Сложный</MenuItem>
                  <MenuItem value={5}>Очень сложный</MenuItem>
                </Select>
              </FormControl>
              <FormControl required>
                <InputLabel id="demo-simple-select-label">Категория</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={category}
                  onChange={handleChangeCategory}
                >
                  <MenuItem value={1}>Салаты</MenuItem>
                  <MenuItem value={2}>Супы</MenuItem>
                  <MenuItem value={3}>Закуски</MenuItem>
                  <MenuItem value={4}>Вторые блюда</MenuItem>
                  <MenuItem value={5}>Десерты</MenuItem>
                  <MenuItem value={6}>Выпечка</MenuItem>
                  <MenuItem value={7}>Заготовки</MenuItem>
                  <MenuItem value={8}>Соусы</MenuItem>
                  <MenuItem value={9}>Напитки</MenuItem>
                  <MenuItem value={10}>Украшения блюда</MenuItem>
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
                />
                <TextField
                  id="outlined-name"
                  label=""
                  // value={name}
                  // onChange={handleChange}
                  variant="outlined"
                  required
                  placeholder="Кол-во"
                  type="number"
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
