'use server'

import { Play } from '@/data/database/models'

// TODO: Refactor?!
export type PlayDTO = { identifier: string; url: string; key: string }

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
