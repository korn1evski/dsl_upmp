import React from 'react';

function MusicRes({name, author, time, image}) {
    return (
        <div className={'h-[86px] md:w-[90%] w-full flex items-center py-[8px] cursor-pointer hover:bg-gray-200 hover:bg-opacity-10 px-[8px]'}>
            <div className={"w-[90px] h-[74px] bg-cover bg-center p-0"} style={{backgroundImage: `url(${image})`}}></div>
            <div className={'justify-center flex flex-col h-full w-full ml-4'}>
                <h3 className={'text-[14px] font-medium text-primary'}>{name}</h3>
                <h3 className={'text-[14px] font-light text-primary'}>{author}</h3>
            </div>
            <h3 className={'text-[14px] text-primary'}>{time}</h3>
        </div>
    );
}

export default MusicRes;