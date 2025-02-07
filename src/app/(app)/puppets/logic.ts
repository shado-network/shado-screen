// NOTE: Stub data.
// TODO: Replace with sqlite.
import puppets from '@/data/stub/puppets.json'
export { puppets }

// TODO: Refactor?!
export type PuppetBase = { identifier: string; url: string; key: string }

// // TODO: Refactor?!
// type PuppetData = {
//   id: string
//   name: string
//   image: string
//   url: string
//   //
//   status: 'online' | 'offline'
// }

export const getPuppetHealth = async (puppet: PuppetBase) => {
  try {
    const url = `${puppet.url}/ping`

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      cache: 'no-store',
    })

    if (!response.ok) {
      throw 'Uh oh!'
    }

    const result = await response.json()

    if (result.status !== 'success') {
      throw 'Uh oh!'
    }

    return result
  } catch (error) {
    console.log('Error in getPuppetHealth', error)
    return null
  }
}

export const getPuppetData = async (puppet: PuppetBase) => {
  try {
    const url = `${puppet.url}/puppet`

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      cache: 'no-store',
    })

    if (!response.ok) {
      throw 'Uh oh!'
    }

    const result = await response.json()

    if (result.status !== 'success') {
      throw 'Uh oh!'
    }

    return result
  } catch (error) {
    console.log('Error in getPuppetData', error)
    return null
  }
}
