"use client"
import { apiRequest } from '@/lib/axios'

export const useGamedata = () => {
      const rowGameData = async ({ gamesKey, setGamesData, setErrors, ...props }) => {
        try {
          const response = await apiRequest.get('/casino/data/games-row?key='+gamesKey, { ...props })
            setGamesData(response.data);
        } catch (error) {
          setErrors(error);
        }
      }
      const gameInfo = async ({ slugId, setGamesData, setErrors, ...props }) => {
        try {
          const response = await apiRequest.get('/casino/data/game-info?id='+slugId, { ...props })
            setGamesData(response.data);
        } catch (error) {
          setErrors(error);
        }
      }
    return {
        rowGameData,
        gameInfo,
    }
}
