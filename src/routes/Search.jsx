import React, {useContext} from 'react'
import { useEffect,useState } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import {RxHamburgerMenu} from 'react-icons/rx'
import Burger from "../components/Burger";
import TopSearch from "../components/topSearch";
import MusicRes from "../components/MusicRes";
import MiniPlayer from "../components/MiniPlayer";

function Search({isShown, setIsShown}) {
    const {theme, setTheme} = useContext(ThemeContext);

    const [searchResult, setSearchResult] = useState('');
   
    return (
        <div className={'bg-leftMenu-gradient  w-full relative'}>
            <div className={'bg-opacity-10 bg-black tw-full'}>
                <RxHamburgerMenu className={!isShown ? 'text-primary visible absolute left-4 top-4' : 'hidden'} size={40} onClick={() => {setIsShown(!isShown)}}/>
                <div className={'md:w-[90%] w-[93%] m-auto h-[94vh]'}>
                    <TopSearch setSearchResult = {setSearchResult}/>
                    <h3 className={'text-primary text-[32px] pt-[34px] pb-[16px]'}>TOP RESULTS</h3>
                    <MusicRes name={'Savage'} author={'Drake'} time={'3:55'}/>
                    <p>{searchResult}</p>
                </div>
            </div>
        </div>
    );
}

export default Search;