'use server'

import { Puppet } from '@/data/database/models'

// TODO: Refactor?!
export type PuppetDTO = { identifier: string; url: string; key: string }

export const getPuppets = async () => {
  try {
    const puppetsData = await Puppet.findAll()
    const puppets = puppetsData.map((puppetData) => {
      return puppetData.toJSON()
    })

    return puppets
  } catch (error) {
    console.log('Error in getPuppets', error)

    // TODO: Proper return value.
    return null
  }
}

export type AddPuppetConnectionDTO = PuppetDTO

export const addPuppetConnection = async (data: AddPuppetConnectionDTO) => {
  try {
    const puppet = await Puppet.create(data)

    return puppet.toJSON()
  } catch (error) {
    console.log('Error in addPuppetConnection', error)

    // TODO: Proper return value.
    return null
  }
}

export type RemovePuppetConnectionDTO = { identifier: string }

export const removePuppetConnection = async (
  data: RemovePuppetConnectionDTO,
) => {
  try {
    await Puppet.destroy({
      where: {
        identifier: data.identifier,
      },
    })

    // TODO: Proper return value.
    return true
  } catch (error) {
    console.log('Error in removePuppetConnection', error)

    // TODO: Proper return value.
    return null
  }
}

//

export const getPuppetHealth = async (puppet: PuppetDTO) => {
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

    // TODO: Proper return value.
    return null
  }
}

export const getPuppetData = async (puppet: PuppetDTO) => {
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

    // TODO: Proper return value.
    return null
  }
}
