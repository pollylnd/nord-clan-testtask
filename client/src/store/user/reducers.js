import actions from "./actions";

const initState = {
  signUp: {
    userName: "",
    email: "",
    password: "",
  },
  signIn: {
    email: "",
    password: "",
  },
  errorMessage: "",
};

export default function reducer(state = initState, { type, payload }) {
  switch (type) {
    case actions.SIGNUP:
      return {
        ...state,
      };

    case actions.SIGNUP_SUCCESS:
      return {
        ...state,
      };

    case actions.SIGNUP_FAILURE:
      return {
        ...state,
        errorMessage: payload,
      };

    case actions.SIGNIN:
      return {
        ...state,
      };

    case actions.SIGNIN_SUCCESS:
      return {
        ...state,
      };

    case actions.SIGNIN_FAILURE:
      return {
        ...state,
        errorMessage: payload,
      };

    case actions.CHANGE_FIELD: 
      const type = payload.type
      const key = payload.key
      const value = payload.value
      return {
        ...state,
        [type]: {
          ...state[type],
          [key]: value
        }
      }

    default:
      return state;
  }
};
