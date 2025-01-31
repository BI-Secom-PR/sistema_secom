import axios from 'axios'

const ApiBase = axios.create({
    baseURL: 'https://secom-api.vercel.app'
})

export default ApiBase;