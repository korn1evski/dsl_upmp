import React, {useContext} from 'react';
import MenuText from './MenuText'
import { ThemeContext } from '../context/ThemeContext';
const ToggleTheme = () => {
    const {theme, setTheme} = useContext(ThemeContext);
    return (
        <div onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            <MenuText text={"dark / light"}/>
        </div>
    );
}

export default ToggleTheme;