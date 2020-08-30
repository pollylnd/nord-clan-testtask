import actions from "./actions";

const initState = {
  list: {},
  page: 1,
  filters: {},
  current: {},
  create: {},
  errorMessage: "",
};

export default function reducer(state = initState, { type, payload }) {
  switch (type) {
    case actions.GET:
      return {
        ...state,
        errorMessage: "",
      };

    case actions.GET_SUCCESS:
      return {
        ...state,
        list: payload.data,
        errorMessage: "",
      };

    case actions.GET_FAILURE:
      return {
        ...state,
        errorMessage: "Error",
      };

    case actions.GET_ID:
      return {
        ...state,
        errorMessage: "",
      };

    case actions.GET_ID_SUCCESS:
      return {
        ...state,
        current: payload.data,
        errorMessage: "",
      };

    case actions.GET_ID_FAILURE:
      return {
        ...state,
        errorMessage: "Error",
      };

    case actions.CREATE:
      return {
        ...state,
        errorMessage: "",
      };

    case actions.CREATE_SUCCESS:
      return {
        ...state,
        create: payload.data,
        errorMessage: "",
      };

    case actions.CREATE_FAILURE:
      return {
        ...state,
        errorMessage: "Error",
      };

    case actions.UPDATE:
      return {
        ...state,
        errorMessage: "",
      };

    case actions.UPDATE_SUCCESS:
      return {
        ...state,
        current: payload.data,
        errorMessage: "",
      };

    case actions.UPDATE_FAILURE:
      return {
        ...state,
        errorMessage: "Error",
      };

    case actions.REMOVE:
      return {
        ...state,
        errorMessage: "",
      };

    case actions.REMOVE_SUCCESS:
      return {
        ...state,
        list: {
          ...state.list,
        },
        errorMessage: "",
      };

    case actions.REMOVE_FAILURE:
      return {
        ...state,
        errorMessage: "Error",
      };

    case actions.SET_PAGE:
      return {
        ...state,
        page: payload.page,
      };

    case actions.SET_FILTERS:
      return {
        ...state,
        page: payload.page,
        filters: payload.filters,
      };
    default:
      return state;
  }
};
