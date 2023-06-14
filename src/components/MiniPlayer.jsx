import React, {useContext, useState} from 'react';
import pictRec from "../assets/song.jpg";
import { ThemeContext} from '../context/ThemeContext';
import SpotifyPlayer from 'react-spotify-web-playback';


function MiniPlayer({props, author, name, progress}) {
    const {theme, setTheme, contextAccessToken, playingUri, playingName, playingAuthor, playingImage, isPlaying, setIsPlaying, playingProgress, setPlayingProgress} = useContext(ThemeContext);

    const size = {
        width: '100%',
        height: 100,
    };

    const handleClick = (event) => {
        const divElement = document.getElementById('total_progress');
        const { left, width } = divElement.getBoundingClientRect();
        const clickPosition = event.clientX - left;
        const percentage = (clickPosition / width) * 100;

        setPlayingProgress(percentage)


    };

    const pictRec = require('../assets/song.jpg')
    return (
        playingName != '' ? <div className={'sticky w-full overflow-x-hidden bg-mini opacity-97 h-[92px] bottom-0 flex items-center justify-between'}>
            <div className={'flex xl:w-[15%] items-center h-full'}>
            <div className={"w-[92px] h-[92px] bg-cover bg-center mr-[14px]"} style={{backgroundImage: `url(${playingImage})`}}></div>
            <div className={'justify-center flex flex-col h-full'}>
                <h3 className={'text-[16px] font-medium text-primary'}>{playingName}</h3>
                <h3 className={'text-[16px] font-light text-primary'}>{playingAuthor}</h3>
            </div>
            </div>
            <div id = 'total_progress' onClick={handleClick} className={'md:w-[30%] w-[40%] justify-center relative cursor-pointer'}>
                <div className={theme === 'dark' ? 'w-full bg-[#727272] h-[7px] rounded-full absolute' : 'w-full bg-[#BEBEBE] h-[7px] rounded-full absolute'}></div>
                <div className={theme === 'dark' ? `bg-white h-[7px] rounded-full absolute` : `bg-black h-[7px] rounded-full absolute`} style={{width: `${playingProgress}%`}}></div>
            </div>
            <div className={'flex md:pr-[30px] pr-[10px] justify-between 2xl:w-[13%] md:w-[20%] w-[20%]'}>
                <img src={theme === 'dark' ? require('../assets/prev.png') : require('../assets/prev_black.png')} className={'w-auto 2xl:h-auto md:h-[30px] h-[20px]'}alt=""/>
                <img onClick={() => setIsPlaying(!isPlaying)} src={isPlaying ? (theme === 'dark' ? require('../assets/stop.png') : require('../assets/stop_black.png')) : (theme === 'dark' ? require('../assets/play_white.png') : require('../assets/play_black.png'))} className={'w-auto 2xl:h-auto md:h-[30px] h-[20px]'} alt=""/>
                <img src={theme === 'dark' ? require('../assets/next.png') : require('../assets/next_black.png')} className={'w-auto 2xl:h-auto md:h-[30px] h-[20px]'} alt=""/>
            </div>
        </div> : null
        // <div onClick={() => {console.log(playingUri)}}><SpotifyPlayer
        //     token={contextAccessToken}
        //     uri={`${playingUri}`}
        //     size={size}
        //     view={'coverart'}
        //     theme={'black'}
        // /></div>
    //
    // <SpotifyPlayer
    //     token={contextAccessToken}
    //    // token={"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMy44MC4xODIuMTM4L2FwaS9hdXRoL3JlZnJlc2giLCJpYXQiOjE2ODEwMzU5NjAsImV4cCI6MTY4MTA1NDQxMywibmJmIjoxNjgxMDUwODEzLCJqdGkiOiIxTklmZFp1VHZVbFpla1lKIiwic3ViIjoiMiIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.DeOYHKotQBgarZVyDSpfL7QCKSJQTHR60XYoc0Fh3Rg"}
    //     uris={['spotify:artist:6HQYnRM4OzToCYPpVBInuU']}
    // />
    );
}

export default MiniPlayer;