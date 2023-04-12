import React from 'react';
import {BsArrowRightShort} from 'react-icons/bs'

function MenuText({selected, text, margin}) {
    return (
        <div className={margin ? 'flex items-center h-[35px] mb-4' : 'flex items-center h-[20px]'}>
            <BsArrowRightShort className={selected ? 'block text-primary arrow_anim' : 'hidden'} size={30}/>
            <h3 className={'text-primary text-xltext-primary font-[300]'}>{text.toUpperCase()}</h3>
        </div>
    );
}

export default MenuText;