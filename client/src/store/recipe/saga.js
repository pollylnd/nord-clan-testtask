import { takeEvery, put, all } from "redux-saga/effects";
import { push } from "react-router-redux";
import backend from "helpers/api/feathers";
import _ from "lodash";

import actions from "./actions";

function* get(action) {
  try {
    const recipeList = yield backend.service("recipe").find({
      query: {
        ...action.payload,
      },
    });
    yield put(actions.getSuccess(recipeList));
  } catch (e) {
    console.log(e);
    yield put(actions.getFailure(e));
  }
}

function* getId(action) {
  try {
    const id = action.payload;
    const recipe = yield backend.service("recipe").get(id);
    if (_.size(recipe)) {
      if(!_.isNil(recipe.image)) {
        const uploadedImage = yield backend.service("uploads").get(recipe.image)
        delete recipe.image
        recipe.image = {
          src: uploadedImage.uri
        }
      }
      yield put(actions.getIdSuccess(recipe));
    }
  } catch (e) {
    console.log(e)
    yield put(actions.getIdFailure(e));
  }
}

function* create(action) {
  try {
    const recipeData = action.payload;

    if(!_.isNil(recipeData.image)) {
      const formData = new FormData();
      formData.append("uri", recipeData.image.src);

      const uploadData = yield backend.service("uploads").create(formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Content-Disposition": "form-data",
        },
      });
  
      recipeData.image = uploadData.id;
    }

    const recipe = yield backend.service("recipe").create(recipeData);
    if (_.size(recipe)) {
      yield put(actions.createSuccess(recipeData));
      yield put(push('/dashboard'));
    }
  } catch (e) {
    console.log(e);
    yield put(actions.createFailure(e));
  }
}

function* update(action) {
  try {
    const recipeData = action.payload;
    
    if(!_.isNil(recipeData.image)) {
      const formData = new FormData();
      formData.append("uri", recipeData.image.src);

      const uploadData = yield backend.service("uploads").create(formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Content-Disposition": "form-data",
        },
      });
  
      recipeData.image = uploadData.id;
    }
    
    const recipe = yield backend.service("recipe").patch(recipeData.id, recipeData);
    if (_.size(recipe)) {
      yield put(actions.updateSuccess(recipeData));
      yield put(push(`/recipe/${recipeData.id}`));
    }
  } catch (e) {
    console.log(e);
    yield put(actions.updateFailure(e));
  }
}

function* setLike(action) {
  const recipeLikesData = action.payload
  try {
    const likedRecipe = yield backend.service("recipe_likes").create(recipeLikesData);
    yield put(actions.setLikeSuccess(likedRecipe));
  } catch (e) {
    console.log(e);
    yield put(actions.setLikeFailure(e));
  }
}

function* remove(action) {
  try {
    const id = action.payload
    console.log(action)

    const deleteRecipe = yield backend.service("recipe").remove(id)

    if(_.size(deleteRecipe)) {
      yield put(actions.removeSuccess(deleteRecipe))
      yield put(push('/dashboard'));
    }

  } catch (e) {
    console.log(e)
    yield put(actions.removeFailure(e))
  }
}

function* recipeSaga() {
  yield all([
    takeEvery(actions.GET, get),
    takeEvery(actions.GET_ID, getId),
    takeEvery(actions.CREATE, create),
    takeEvery(actions.UPDATE, update),
    takeEvery(actions.SET_FILTERS, get),
    takeEvery(actions.RESET_FILTERS, get),
    takeEvery(actions.REMOVE, remove),
    takeEvery(actions.SET_LIKE, setLike)
  ]);
}

export default {
  recipeSaga,
};
