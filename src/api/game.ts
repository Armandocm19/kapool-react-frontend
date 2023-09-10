import { type ImageResponse, type IGame } from '../interfaces'
import axios from 'axios'
import { baseUrl } from '../utils'
import { fetchSinToken, fetchToRemoveImage, fetchToUploadImage } from '../helpers/fetch'
import { toast } from 'sonner'

export const getGame = async (hostId: string) => {
  try {
    const resp = await fetchSinToken(`getGame/${hostId}`)
    const body = await resp.json()

    if (body.ok) {
      return {
        ok: true,
        gameBD: body.game
      }
    }
  } catch (error) {
    console.error('Error al almacenar datos: ', error)
    return { ok: false }
  }
}

export const createGame = async (game: IGame) => {
  try {
    const url = `${baseUrl}/saveGame`
    const newGame = await axios.post(url, game)
    return { newGame: newGame.data }
  } catch (error) {
    console.error('Error al almacenar datos: ', error)
  }
}

export const getGamesByOwner = async (idOwner: string) => {
  try {
    const resp = await fetchSinToken(`getGames/${idOwner}`)
    const body = await resp.json()
    if (body.ok) {
      return {
        ok: true,
        games: body.games
      }
    }
  } catch (error) {
    console.error('Error al almacenar datos: ', error)
    return { ok: false }
  }
}

export const updateStateGame = async (hostId: string, game: IGame, state: boolean) => {
  try {
    const resp = await fetchSinToken(`updateStateGame/${hostId}`, { game, state }, 'PUT')
    const body = await resp.json()

    if (body.ok) {
      return { ok: true }
    } else {
      toast.error(`Algo salió mal al activar el juego...${body.msg}`)
      return { ok: false }
    }
  } catch (error) {
    console.log(error)
    return { ok: false }
  }
}

export const getGameOwner = async (gameId: string) => {
  try {
    const resp = await fetchSinToken(`getGameById/${gameId}`)
    const body = await resp.json()
    if (body.ok) {
      return {
        ok: true,
        ownerId: body.game.owner
      }
    }
  } catch (error) {
    console.error(error)
    return { ok: false }
  }
}

export const uploadImage = async (file: File | null) => {
  try {
    const resp: ImageResponse = await fetchToUploadImage('uploadImage', file, 'POST')
    if (resp.ok) {
      return { ok: resp.ok, data: resp }
    }
  } catch (error) {
    console.error(error)
    return { ok: false, data: null }
  }
}

export const removeImage = async (key: string) => {
  interface resDB { ok: boolean }
  try {
    const resp: resDB = await fetchToRemoveImage('removeImage', key, 'POST')
    if (resp.ok) {
      return { ok: true }
    }
  } catch (error) {
    console.error(error)
    return { ok: false }
  }
}
