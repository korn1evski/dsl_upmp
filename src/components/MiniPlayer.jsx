import React, {useContext, useState} from 'react';
import pictRec from "../assets/song.jpg";
import { ThemeContext } from '../context/ThemeContext';

function MiniPlayer({props, author, name, progress}) {
    const {theme, setTheme} = useContext(ThemeContext);
    const [isPlaying, setIsPlaying] = useState(true);
    const pictRec = require('../assets/song.jpg')
    return (
        <div className={'sticky w-full overflow-x-hidden bg-mini opacity-97 h-[92px] bottom-0 flex items-center justify-between'}>
            <div className={'flex xl:w-[15%] items-center h-full'}>
            <div className={"w-[92px] h-[92px] bg-cover bg-center mr-[14px]"} style={{backgroundImage: `url(${pictRec})`}}></div>
            <div className={'justify-center flex flex-col h-full'}>
                <h3 className={'text-[16px] font-medium text-primary'}>{name}</h3>
                <h3 className={'text-[16px] font-light text-primary'}>{author}</h3>
            </div>
            </div>
            <div className={'md:w-[30%] w-[40%] justify-center relative'}>
                <div className={theme === 'dark' ? 'w-full bg-[#727272] h-[7px] rounded-full absolute' : 'w-full bg-[#BEBEBE] h-[7px] rounded-full absolute'}></div>
                <div className={theme === 'dark' ? `bg-white h-[7px] rounded-full absolute` : `bg-black h-[7px] rounded-full absolute`} style={{width: `${progress}%`}}></div>
            </div>
            <div className={'flex md:pr-[30px] pr-[10px] justify-between 2xl:w-[13%] md:w-[20%] w-[20%]'}>
                <img src={theme === 'dark' ? require('../assets/prev.png') : require('../assets/prev_black.png')} className={'w-auto 2xl:h-auto md:h-[30px] h-[20px]'}alt=""/>
                <img src={isPlaying ? (theme === 'dark' ? require('../assets/stop.png') : require('../assets/stop_black.png')) : (null)} className={'w-auto 2xl:h-auto md:h-[30px] h-[20px]'} alt=""/>
                <img src={theme === 'dark' ? require('../assets/next.png') : require('../assets/next_black.png')} className={'w-auto 2xl:h-auto md:h-[30px] h-[20px]'} alt=""/>
            </div>
        </div>
    );
}

export default MiniPlayer;