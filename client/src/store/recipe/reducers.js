import actions from "./actions";

const initState = {
  list: {},
  page: 1,
  filters: {},
  current: {},
  create: {
    name: "",
    description: "",
    complexity: null,
    category: null,
    ingredients: [
      {},
    ],
    stages: [
      {},
    ]
  },
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
        current: {
          ...initState.current,
        },
        errorMessage: "",
      };

    case actions.GET_ID_SUCCESS:
      return {
        ...state,
        current: payload,
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

    case actions.CHANGE_FIELD:
    {
      const type = payload.type;
      const key = payload.key;
      const value = payload.value;
      return {
        ...state,
        [type]: {
          ...state[type],
          [key]: value,
        },
      };
    }

    case actions.ADD_FIELD_MULTIPLE:
    {
      const type = payload.type;
      const key = payload.key;
      const index = payload.index;

      const oldFields = state[type][key].slice(0, state[type][key].lenght);

      oldFields[index] = {};

      return {
        ...state,
        [type]: {
          ...state[type],
          [key]: oldFields
        }
      }
    }

    case actions.CHANGE_FIELD_MULTIPLE:
    {
      const type = payload.type;
      const key = payload.key;
      const value = payload.value;
      const index = payload.index;
      const field = payload.field;

      const oldFields = state[type][key].slice(0, state[type][key].lenght);
      
      oldFields[index] = {
        ...oldFields[index],
        [field]: value
      };

      return {
        ...state,
        [type]: {
          ...state[type],
          [key]: oldFields,
        },
      };
    }

    case actions.REMOVE_FIELD_MULTIPLE: 
    {
      const type = payload.type;
      const key = payload.key;
      const index = payload.index;
      const oldFields = state[type][key].slice(0, state[type][key].lenght)
      oldFields.splice(index, 1)

      return {
        ...state,
        [type]: {
          ...state[type],
          [key]: oldFields
        }
      }
    }

    case actions.CHANGE_ALT_INGREDIENT:
    {
      const {
        type,
        key,
        index,
        field,
        value,
      } = payload;

      const allIngredients = state[type][key].slice(0, state[type][key].lenght)

      allIngredients[index] = {
        ...allIngredients[index],
        altIngredient: {
          ...allIngredients[index].altIngredient,
          [field]: value
        },
      };



      return {
        ...state,
        [type]: {
          ...state[type],
          [key]: allIngredients,
        }
      }
    }

    default:
      return state;
  }
}
