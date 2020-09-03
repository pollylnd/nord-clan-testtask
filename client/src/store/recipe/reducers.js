import actions from "./actions";

const initState = {
  list: {},
  page: 1,
  filters: {
    search: "",
    complexity: ""
  },
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
  edit: {},
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
        edit: { 
          ...state.edit,
          ...payload 
        },
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
        create: {},
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
        current: {},
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
      {
        console.log(payload)
        return {
          ...state,
          filters: {
            ...state.filters,
            ...payload
          }
        };
      }
      

    case actions.CHANGE_FIELD:
    {
      const {
        type,
        key,
        value
      } = payload;

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
      const {
        type,
        key,
        index
      } = payload;

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
      const {
        type,
        key,
        value,
        index,
        field,
      } = payload;

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
      const {
        type,
        key,
        index
      } = payload;

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
        alternativeIngredient: {
          ...allIngredients[index].alternativeIngredient,
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
