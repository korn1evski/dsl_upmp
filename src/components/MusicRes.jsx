import React from 'react';
import {AiFillHeart, AiOutlineHeart} from 'react-icons/ai'

function MusicRes({id, name, author, time, image, liked, receiveFav, showLike=true}) {
    return (
        <div className={'flex height-full items-center'}>
        <div className={'h-[86px] md:w-[90%] w-full flex items-center py-[8px] cursor-pointer hover:bg-gray-200 hover:bg-opacity-10 px-[8px]'}>
            <div className={"w-[90px] h-[74px] bg-cover bg-center p-0"} style={{backgroundImage: `url(${image})`}}></div>
            <div className={'justify-center flex flex-col h-full w-full ml-4'}>
                <h3 className={'text-[14px] font-medium text-primary'}>{name}</h3>
                <h3 className={'text-[14px] font-light text-primary'}>{author}</h3>
            </div>
            <h3 className={'text-[14px] text-primary'}>{time}</h3>

        </div>
            {showLike ? (liked ? (<AiFillHeart onClick={async () => {await receiveFav(id)}} size={22} className={'ml-4 cursor-pointer'}/>) : <AiOutlineHeart onClick={async () => {await receiveFav(id)}} size={22} className={'ml-4 cursor-pointer'}/>) : null}
        </div>
    );
}

export default MusicRes;