import { auth } from '@/auth'
import { baseUrl } from '@/lib/constants'

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'

type CustomFetchProps = {
  path: string
  method: Method
  withCredentials: boolean
  body?: Record<string, any>
}

async function customFetch({
  path,
  method,
  withCredentials,
  body
}: CustomFetchProps) {
  const session = await auth()
  console.log('sesion customfetch', session)

  const headers = new Headers()
  headers.append('Content-Type', 'application/json')
  if (withCredentials) {
    headers.append('Authorization', JSON.stringify(session))
  }

  try {
    const response = await fetch(`${baseUrl}${path}`, {
      method: method,
      headers: headers,
      body: JSON.stringify(body)
    })
    return response
  } catch (error) {
    console.error(error)
    throw new Error('Error en la petición.')
  }
}

export default customFetch