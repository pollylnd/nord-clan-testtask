const DOCUMENT = "USER_";

const actions = {
  SIGNUP: DOCUMENT + "SIGNUP",
  SIGNUP_SUCCESS: DOCUMENT + "SIGNUP_SUCCESS",
  SIGNUP_FAILURE: DOCUMENT + "SIGNUP_FAILURE",

  SIGNIN: DOCUMENT + "SIGNIN",
  SIGNIN_SUCCESS: DOCUMENT + "SIGNIN_SUCCESS",
  SIGNIN_FAILURE: DOCUMENT + "SIGNIN_FAILURE",

  CHANGE_FIELD: DOCUMENT + "CHANGE_FIELD",

  signUp: () => {
    return { type: actions.SIGNUP };
  },

  signUpSuccess: (data) => ({
    type: actions.SIGNUP_SUCCESS,
    payload: data,
  }),

  signUpFailure: (error) => ({
    type: actions.SIGNUP_FAILURE,
    payload: error,
  }),

  signIn: () => {
    return { type: actions.SIGNIN };
  },

  signInSuccess: (data) => ({
    type: actions.SIGNIN_SUCCESS,
    payload: data,
  }),

  signInFailure: (error) => ({
    type: actions.SIGNIN_FAILURE,
    payload: error,
  }),

  changeField: (type, key, value) => ({
    type: actions.CHANGE_FIELD,
    payload: { type, key, value }
  }),
};

export default actions;
