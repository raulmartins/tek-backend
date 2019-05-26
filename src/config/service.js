const axios = require('axios')

const api = axios.create({
  baseURL: 'https://tekapi20190525114423.azurewebsites.net/api'
})

module.exports = api
