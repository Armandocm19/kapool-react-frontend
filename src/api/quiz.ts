import { type QuizStateInDB } from '../interfaces'
import axios from 'axios'
import { baseUrl } from '../utils'
import { fetchSinToken } from '../helpers/fetch'

export const getQuiz = async (id: string) => {
  try {
    const resp = await fetchSinToken(`quiz/${id}`)
    const body = await resp.json()
    if (body.ok) {
      return {
        ok: true,
        quiz: body.quiz
      }
    }
  } catch (error) {
    console.error('Error al almacenar datos: ', error)
    return { ok: false }
  }
}

export const createQuiz = async (game: QuizStateInDB) => {
  try {
    const url = `${baseUrl}/createQuiz`
    const newQuiz = await axios.post(url, game)
    return { newQuiz: newQuiz.data.quiz }
  } catch (error) {
    console.error('Error al almacenar datos: ', error)
  }
}
