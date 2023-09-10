import { type IUser } from '../interfaces'
import { fetchSinToken } from '../helpers/fetch'
import { toast } from 'sonner'

export const saveUser = async (user: IUser) => {
  const resp = await fetchSinToken('user/new', user, 'POST')
  const body = await resp.json()

  if (body.ok) {
    const { user } = body
    localStorage.setItem('id', user._id)
    localStorage.setItem('name', user.username)
    toast.success('Cuenta creada correctamente')
    return { ok: true }
  } else {
    toast.error(body.msg)
    return { ok: false }
  }
}

export const loginUser = async (user: IUser) => {
  const resp = await fetchSinToken('user', user, 'POST')
  const body = await resp.json()

  if (body.ok) {
    const { user } = body
    localStorage.setItem('id', user._id)
    localStorage.setItem('name', user.username)
    toast.success('Te has logueado correctamente')
    return { ok: true }
  } else {
    toast.error(body.msg)
    return { ok: false }
  }
}
