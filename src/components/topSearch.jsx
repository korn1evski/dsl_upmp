import React from 'react';

function TopSearch(props) {
    return (
        <div className={'flex justify-between h-[126px] w-full items-center md:pt-[66px] pt-[75px]'}>
            <img src={require("../assets/mood_core.png")} alt="logo" className={'md:w-[82px] md:h-[46px]  w-[53px] h-[33px]'}/>
            <div className={'w-[70%] h-full relative'}>
                <div className={'bg-[#E8FF5E] rounded-full md:w-[28px] md:h-[28px] w-[18px] h-[18px] absolute md:left-[18px] md:top-[17px] left-[18px] top-[18px]'}></div>
                <input type="text" placeholder={"Enter your mood..."} className={'bg-transparent border-white border h-full w-full rounded-full text-white md:pl-20 pl-12 text-xl placeholder-white focus:outline-none'}/>
            </div>
            <div className={'rounded-[100px] bg-gray-50 md:h-full md:w-[60px] h-[42px] w-[42px]'}></div>
        </div>
    );
}

export default TopSearch;