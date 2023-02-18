import React from 'react';

function MusicRes({name, author, time}) {
    const pictRec = require('../assets/song.jpg')
    return (
        <div className={'h-[96px] md:w-[70%] w-full flex items-center pb-3'}>
            <div className={"md:h-[84px] md:w-[84px] w-[63px] h-[63px] bg-cover bg-center p-0"} style={{backgroundImage: `url(${pictRec})`}}></div>
            <div className={'justify-center flex flex-col h-full w-full pl-4'}>
                <h3 className={'text-[16px] font-medium text-white'}>{name}</h3>
                <h3 className={'text-[16px] font-light text-white'}>{author}</h3>
            </div>
            <h3 className={'text-[16px] text-white'}>{time}</h3>
        </div>
    );
}

export default MusicRes;