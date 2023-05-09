import { baseUrl } from '../utils'

const fetchSinToken = async (endpoint: string, data?: any, method = 'GET') => {
  const url = `${baseUrl}/${endpoint}`

  if (method === 'GET') {
    return await fetch(url)
  } else {
    return await fetch(url, {
      method,
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    })
  }
}

export {
  fetchSinToken
}
