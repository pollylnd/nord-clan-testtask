const DOCUMENT = "AUTH_";

const actions = {
  USER_GET_SUCCESS:        DOCUMENT + 'USER_GET_SUCCESS',
  USER_GET_FAILURE:        DOCUMENT + 'USER_GET_FAILURE',

  SIGNIN:                  DOCUMENT + 'SERVER:SIGNIN',
  SIGNIN_SUCCESS:          DOCUMENT + 'SIGNIN_SUCCESS',
  SIGNIN_FAILURE:          DOCUMENT + 'SIGNIN_FAILURE',

  SIGNOUT:                 DOCUMENT + 'SERVER:SIGNOUT',
  SIGNOUT_SUCCESS:         DOCUMENT + 'SIGNOUT_SUCCESS',
  SIGNOUT_FAILURE:         DOCUMENT + 'SIGNOUT_FAILURE',

  SIGNUP:                  DOCUMENT + 'SERVER:SIGNUP',
  SIGNUP_SUCCESS:          DOCUMENT + 'SIGNUP_SUCCESS',
  SIGNUP_FAILURE:          DOCUMENT + 'SIGNUP_FAILURE',

  CHANGE_FIELD:            DOCUMENT + 'CHANGE_FIELD',

  signInJWT: (accessToken) => {
    const authorization = {
      strategy: 'jwt',
      accessToken
    }
  
    return {
      type: actions.SIGNIN,
      payload: authorization,
    }
  },

  signIn: ({ email, password }) => {
    const authorization = {
      strategy: 'local',
      email,
      password,
    }
  
    return {
      type: actions.SIGNIN,
      payload: authorization,
    }
  },
  
  signInSuccess: (accessToken) => {
    return {
      type: actions.SIGNIN_SUCCESS,
      payload: accessToken,
    }
  },
  
  getUserSuccess: (user) => {
    return {
      type: actions.USER_GET_SUCCESS,
      payload: user
    }
  },
  
  signInFailure: (error) => {
    return {
      type: actions.SIGNIN_FAILURE,
      payload: error,
    }
  },
  
  signOut: () => {
    return {
      type: actions.SIGNOUT,
      payload: null,
    }
  },
  
  signOutSuccess: () => {
    return {
      type: actions.SIGNOUT_SUCCESS,
      payload: null,
    }
  },
  
  signOutFailure: (error) => {
    return {
      type: actions.SIGNOUT_FAILURE,
      payload: error,
    }
  },
  
  signUp: (newUser) => {
    return {
      type: actions.SIGNUP,
      payload: {...newUser},
    }
  },
  
  signUpSuccess: () => {
    return {
      type: actions.SIGNUP_SUCCESS,
      payload: null
    }
  },
  
  signUpFailure: (error) => {
    return {
      type: actions.SIGNUP_FAILURE,
      payload: error,
    }
  },

  changeField: (type, key, value) => ({
    type: actions.CHANGE_FIELD,
    payload: { type, key, value }
  }),
}
  
export default actions; 
  