import { type IUser } from '../interfaces'
import { fetchSinToken } from '../helpers/fetch'
import Swal from 'sweetalert2'

export const saveUser = async (user: IUser) => {
  const resp = await fetchSinToken('user/new', user, 'POST')
  const body = await resp.json()

  if (body.ok) {
    const { user } = body
    localStorage.setItem('id', user._id)
    localStorage.setItem('name', user.username)
    Swal.fire('¡Exito!', 'Cuenta creada correctamente', 'success')
    return { ok: true }
  } else {
    Swal.fire('Algo salió mal...', body.msg, 'error')
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
    return { ok: true }
  } else {
    Swal.fire('Algo salió mal...', body.msg, 'error')
    return { ok: false }
  }
}
