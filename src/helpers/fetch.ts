import axios from 'axios'
import { baseUrl } from '../utils'

const fetchSinToken = async (endpoint: string, data?: any, method = 'GET') => {
  const url = `${baseUrl}/${endpoint}`

  if (method === 'GET' || method === 'DELETE') {
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

const fetchToUploadImage = async (endpoint: string, data: File | null, method = 'GET') => {
  const templateFormData = new FormData()
  templateFormData.append('file', data!)
  templateFormData.append('upload_preset', 'kapoolProject')
  const url = `${baseUrl}/${endpoint}`
  const cloudinaryResponse = await fetch(url, {
    method,
    body: templateFormData
  }).then(async res => await res.json()).catch(err => err)

  return cloudinaryResponse
}

const fetchToRemoveImage = async (endpoint: string, key: string, method = 'GET') => {
  try {
    const url = `${baseUrl}/${endpoint}`
    const cloudinaryResponse = await axios.post(url, { key }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return cloudinaryResponse.data
  } catch (error) {
    console.log(error)
  }
}

export {
  fetchSinToken,
  fetchToUploadImage,
  fetchToRemoveImage
}
