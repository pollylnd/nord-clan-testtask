import axios from 'axios'
import { HttpMiddlewareService } from 'axios-middleware'
import AuthMiddleware from './authMiddleware.js'

const apiUrl = `${process.env['REACT_APP_API_SCHEME']}://` +
  `${process.env['REACT_APP_API_HOST']}:${process.env['REACT_APP_API_PORT']}`

const service = new HttpMiddlewareService(axios)

service.register([
  new AuthMiddleware()
])

export const get = (entity, data, params) => {
  return axios.get(apiUrl + '/' + entity, data, params)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      throw error
    })

}

export const post = (entity, data, params) => {
  return axios.post(apiUrl + '/' + entity, data, params)
    .then((response) => {

      return response.data

    })
    .catch((error) => {

      throw error

    })

}

export const patch = (entity, data, params) => {

  return axios.patch(apiUrl + '/' + entity, data, params)
    .then((response) => {

      return response.data

    })
    .catch((error) => {

      throw error

    })

}

export const remove = (entity, id) => {

  return axios.delete(apiUrl + '/' + entity + '/' + id)
    .then((response) => {

      return response.data

    })
    .catch((error) => {

      throw error

    })

}

// export const resetPassword = (data) => {
//   return axios.post(apiUrl + '/restore', data)
//     .then((response) => {
//       return response.data
//     })
//     .catch((error) => {
//       throw error
//     })
// }
//
// export const updatePassword = ({id, password}) => {
//   return axios.patch(apiUrl + `/restore/${id}`, password)
//     .then((response) => {
//       return response.data
//     })
//     .catch((error) => {
//       throw error
//     })
// }
