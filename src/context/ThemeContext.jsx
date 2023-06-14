import React, {createContext, useState, useEffect} from 'react'

const getInitialTheme = () => {
    if (typeof window !== 'undefined' && window.localStorage) {
        const storedPrefs = window.localStorage.getItem('color-theme')
        if (typeof storedPrefs === 'string')
            return storedPrefs


        const userMedia = window.matchMedia('(prefers-color-scheme: dark)')
        if (userMedia.matches)
            return 'dark'
    }
    return 'light'
}

export const ThemeContext = createContext()

export const ThemeProvider = ({initialTheme, children}) => {
    const [theme, setTheme] = useState(getInitialTheme);

    const [contextAccessToken, setContextAccessToken] = useState('');
    const [playingUri, setPlayingUri] = useState('')
    const [playingName, setPlayingName] = useState('')
    const [playingAuthor, setPlayingAuthor] = useState('')
    const [playingImage, setPlayingImage] = useState('')
    const [isPlaying, setIsPlaying] = useState(true)
    const [playingProgress, setPlayingProgress] = useState(0)


    const rawSetTheme = (theme) => {
        const root = window.document.documentElement;
        const isDark = theme === 'dark'

        root.classList.remove(isDark ? 'light' : 'dark')
        root.classList.add(theme)

        localStorage.setItem('color-theme', theme)
    }

    if (initialTheme)
        rawSetTheme(initialTheme)

    useEffect(() => {
        rawSetTheme(theme)
    }, [theme]);

    return (
        <ThemeContext.Provider value={{
            theme,
            setTheme,
            contextAccessToken,
            setContextAccessToken,
            playingUri,
            setPlayingUri,
            playingName,
            setPlayingName,
            playingAuthor,
            setPlayingAuthor,
            playingImage,
            setPlayingImage,
            isPlaying,
            setIsPlaying,
            playingProgress,
            setPlayingProgress
        }}>{children}</ThemeContext.Provider>
    )
}