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
    image: null,
    ingredients: [
      {},
    ],
    stages: [
      {},
    ]
  },
  edit: {},
  errorMessage: "",
  isGetFetching: false,
};

export default function reducer(state = initState, { type, payload }) {
  switch (type) {
    case actions.GET:
      return {
        ...state,
        isGetFetching: true,
        errorMessage: "",
      };

    case actions.GET_SUCCESS:
      return {
        ...state,
        list: payload.data,
        errorMessage: "",
        isGetFetching: false,
      };

    case actions.GET_FAILURE:
      return {
        ...state,
        isGetFetching: false,
        errorMessage: "Error",
      };

    case actions.GET_ID:
      return {
        ...state,
        current: {
          ...initState.current,
        },
        isGetFetching: true,
        errorMessage: "",
      };

    case actions.GET_ID_SUCCESS:
      return {
        ...state,
        current: {
          ...state.current,
          ...payload
        },
        edit: { 
          ...state.edit,
          ...payload 
        },
        isGetFetching: false,
        errorMessage: "",
      };

    case actions.GET_ID_FAILURE:
      return {
        ...state,
        isGetFetching: false,
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

    case actions.REMOVE_SUCCESS:
      {
        const newList = {...state.list}
        delete newList[payload.id]
        return {
          ...state,
          origin: {...newList},
          errorMessage: "",
        };
      }

    case actions.REMOVE_FAILURE:
      return {
        ...state,
        errorMessage: "Error",
      };

    case actions.SET_LIKE_SUCCESS:
      return {
        ...state,
        current: {
          ...state.current,
          likes: state.current.likes + 1,
        }
      };

    case actions.SET_FILTERS:
      {
        return {
          ...state,
          filters: {
            ...state.filters,
            ...payload
          }
        };
      }

    case actions.RESET_FILTERS:
    {
      return {
        ...state,
        filters: {
          ...payload.filters,
        }
      }
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
