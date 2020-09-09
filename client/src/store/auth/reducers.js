import actions from "./actions";

const initState = {
  user: null,
  error: null,
  edit: {},
  isSignInFetching: false,
};

export default function reducer(state = initState, { type, payload }) {
  switch (type) {
    case actions.USER_GET_SUCCESS: {
      const user = { ...payload };

      return {
        ...state,
        user,
      };
    }

    case actions.SIGNIN: {
      return {
        ...state,
        isSignInFetching: true,
      };
    }

    case actions.SIGNIN_SUCCESS: {
      return {
        ...state,
        accessToken: payload,
        isSignInFetching: false,
      };
    }

    case actions.SIGNIN_FAILURE: {
      return {
        ...state,
        error: payload.error,
        isSignInFetching: false,
      };
    }

    case actions.SIGNOUT_SUCCESS: {
      return {
        ...initState,
      };
    }

    case actions.SIGNOUT_FAILURE: {
      return {
        ...state,
        error: payload.error,
      };
    }

    case actions.SIGNUP_FAILURE: {
      return {
        ...state,
        error: payload.error,
      };
    }

    case actions.SET_LIKE: {
      const oldRecipeLikes = state.user.recipeLikes.slice(0, state.user.recipeLikes.length)
      oldRecipeLikes.push(payload)

      return {
        ...state,
        user: {
          ...state.user,
          recipeLikes: oldRecipeLikes
        }
      };
    }

    case actions.CHANGE_FIELD:
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

    default:
      return state;
  }
}
