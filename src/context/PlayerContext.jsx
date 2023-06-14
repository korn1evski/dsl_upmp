import React, { createContext, useState, useEffect} from 'react'

export const PlayerContext = createContext()

export const PlayerProvider = ({children}) => {
    const [playingUri, setPlayingUri] = useState('')
    const [playingImage, setPlayingImage] = useState('')
}