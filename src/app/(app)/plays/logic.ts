'use server'

import { Play } from '@/data/database/models'

export const getPlays = async () => {
  try {
    const playsData = await Play.findAll()
    const plays = playsData.map((playData) => {
      return playData.toJSON()
    })
  
    return plays
  } catch (error) {
    console.log('Error in getPlays', error)
    return null
  }
}

// TODO: Refactor?!
export type PlayDTO = { identifier: string; url: string; key: string }
