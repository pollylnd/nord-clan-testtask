import { HttpMiddleware } from 'axios-middleware'
import { store } from '../store'

export default class AuthMiddleware extends HttpMiddleware {

  constructor(token) {

    super()

  }

  onRequest(config) {

    config.headers = {
      'Authorization': store.getState().auth.accessToken,
      ...config.headers,
    }

    return config

  }

}
