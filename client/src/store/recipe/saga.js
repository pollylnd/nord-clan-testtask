import { takeEvery, put, all, select } from 'redux-saga/effects';
import backend from 'helpers/api/feathers'

import actions from './actions';

const getPage = state => state.recipe.page;

function* get({payload}) {
  
  try {
    const recipeList = yield backend.service('recipe').find({
      query: {},
    })
    yield put(actions.getSuccess(recipeList))
  } catch (e) {
    console.log(e)
    yield put(actions.getFailure(e))
  }
}

function* recipeSaga() {
  yield all([
    takeEvery(actions.GET, get)
  ]) 
}

export default {
  recipeSaga
}