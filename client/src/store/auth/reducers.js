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
