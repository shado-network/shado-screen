'use server'

import { Play } from '@/data/database/models'

// TODO: Refactor?!
export type PlayDTO = {
  identifier: string
  key: string
  http_url: string
  ws_url: string
}

export const getPlays = async () => {
  try {
    const playsData = await Play.findAll()
    const plays = playsData.map((playData) => {
      return playData.toJSON()
    })

    return plays
  } catch (error) {
    console.log('Error in getPlays', error)

    // TODO: Proper return value.
    return null
  }
}

export const getPlayByIdentifier = async (
  identifier: PlayDTO['identifier'],
) => {
  try {
    const playData = await Play.findOne({
      where: {
        identifier: identifier,
      },
    })

    if (!playData) {
      throw `No play found for identifier ${identifier}`
    }

    const play = playData.toJSON()

    return play as PlayDTO
  } catch (error) {
    console.log('Error in getPlayByIdentifier', error)

    // TODO: Proper return value.
    return null
  }
}

export type AddPlayConnectionDTO = PlayDTO

export const addPlayConnection = async (data: AddPlayConnectionDTO) => {
  try {
    const play = await Play.create(data)

    return play.toJSON()
  } catch (error) {
    console.log('Error in addPlayConnection', error)

    // TODO: Proper return value.
    return null
  }
}

export type RemovePlayConnectionDTO = { identifier: string }

export const removePlayConnection = async (data: RemovePlayConnectionDTO) => {
  try {
    await Play.destroy({
      where: {
        identifier: data.identifier,
      },
    })

    // TODO: Proper return value.
    return true
  } catch (error) {
    console.log('Error in removePlayConnection', error)

    // TODO: Proper return value.
    return null
  }
}

//

export const getPlayHealth = async (play: PlayDTO) => {
  try {
    const url = `${play.http_url}/ping`

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
    console.log('Error in getPlayHealth', error)

    // TODO: Proper return value.
    return null
  }
}

export const getPlayData = async (play: PlayDTO) => {
  try {
    const url = `${play.http_url}/play`

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
    console.log('Error in getPlayData', error)

    // TODO: Proper return value.
    return null
  }
}
