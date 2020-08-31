const DOCUMENT = "RECIPE_";

const actions = {
  GET: DOCUMENT + "GET",
  GET_SUCCESS: DOCUMENT + "GET_SUCCESS",
  GET_FAILURE: DOCUMENT + "GET_FAILURE",

  GET_ID: DOCUMENT + "GET_ID",
  GET_ID_SUCCESS: DOCUMENT + "GET_ID_SUCCESS",
  GET_ID_FAILURE: DOCUMENT + "GET_ID_FAILURE",

  CREATE: DOCUMENT + "CREATE",
  CREATE_SUCCESS: DOCUMENT + "CREATE_SUCCESS",
  CREATE_FAILURE: DOCUMENT + "CREATE_FAILURE",

  UPDATE: DOCUMENT + "UPDATE",
  UPDATE_SUCCESS: DOCUMENT + "UPDATE_SUCCESS",
  UPDATE_FAILURE: DOCUMENT + "UPDATE_FAILURE",

  REMOVE: DOCUMENT + "REMOVE",
  REMOVE_SUCCESS: DOCUMENT + "REMOVE_SUCCESS",
  REMOVE_FAILURE: DOCUMENT + "REMOVE_FAILURE",

  SET_PAGE: DOCUMENT + "SET_PAGE",
  SET_FILTERS: DOCUMENT + "SET_FILTERS",

  CHANGE_FIELD: DOCUMENT + "CHANGE_FIELD",

  get: () => {
    return { type: actions.GET };
  },

  getSuccess: (data) => ({
    type: actions.GET_SUCCESS,
    payload: data,
  }),

  getFailure: (error) => ({
    type: actions.GET_FAILURE,
    payload: error,
  }),

  getId: (id) => ({
    type: actions.GET_ID,
    payload: id,
  }),

  getIdSuccess: (data) => ({
    type: actions.GET_ID_SUCCESS,
    payload: data,
  }),

  getIdFailure: (error) => ({
    type: actions.GET_ID_FAILURE,
    payload: error,
  }),

  create: () => {
    return { type: actions.CREATE };
  },

  createSuccess: (data) => ({
    type: actions.CREATE_SUCCESS,
    payload: data,
  }),

  createFailure: (error) => ({
    type: actions.CREATE_FAILURE,
    payload: error,
  }),

  update: () => {
    return { type: actions.UPDATE };
  },

  updateSuccess: (data) => ({
    type: actions.UPDATE_SUCCESS,
    payload: data,
  }),

  updateFailure: (error) => ({
    type: actions.UPDATE_FAILURE,
    payload: error,
  }),

  remove: () => {
    return { type: actions.REMOVE };
  },

  removeSuccess: (data) => ({
    type: actions.REMOVE_SUCCESS,
    payload: data,
  }),

  removeFailure: (error) => ({
    type: actions.REMOVE_FAILURE,
    payload: error,
  }),

  setFilters: (filters, page = 1) => ({
    type: actions.SET_FILTERS,
    payload: { filters, page },
  }),

  setPage: (page) => ({
    type: actions.SET_PAGE,
    payload: page,
  }),

  changeField: (type, key, value) => ({
    type: actions.CHANGE_FIELD,
    payload: { type, key, value }
  }),

};

export default actions;
