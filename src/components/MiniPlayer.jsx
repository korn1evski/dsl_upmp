import React from 'react';
import pictRec from "../assets/song.jpg";

function MiniPlayer({props, author, name, progress}) {
    const pictRec = require('../assets/song.jpg')
    return (
        <div className={'fixed w-screen bg-black opacity-95 h-[92px] bottom-0 flex p-[7px] items-center justify-between'}>
            <div className={'flex xl:w-[10%] items-center'}>
            <div className={"w-[78px] h-[78px] bg-cover bg-center mr-[14px]"} style={{backgroundImage: `url(${pictRec})`}}></div>
            <div className={'justify-center flex flex-col h-full'}>
                <h3 className={'text-[16px] font-medium text-white'}>{name}</h3>
                <h3 className={'text-[16px] font-light text-white'}>{author}</h3>
            </div>
            </div>
            <div className={'md:w-[50%] w-[40%] justify-center relative'}>
                <div className={'w-full bg-[#727272] h-[7px] rounded-full absolute'}></div>
                <div className={`bg-white h-[7px] rounded-full absolute`} style={{width: `${progress}%`}}></div>
            </div>
            <div className={'flex md:pr-[30px] pr-[10px] justify-between xl:w-[13%] md:w-[20%] w-[20%]'}>
                <img src={require('../assets/back.png')} className={'md:w-auto md:h-auto w-[20px]'}alt=""/>
                <img src={require('../assets/play.png')} className={'md:w-auto md:h-auto w-[20px]'} alt=""/>
                <img src={require('../assets/forward.png')} className={'md:w-auto md:h-auto w-[20px]'} alt=""/>
            </div>
        </div>
    );
}

export default MiniPlayer;