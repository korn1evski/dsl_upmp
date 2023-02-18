import React from 'react';
import {RxHamburgerMenu} from 'react-icons/rx'
import Burger from "../components/Burger";
import TopSearch from "../components/topSearch";
import MusicRes from "../components/MusicRes";
import MiniPlayer from "../components/MiniPlayer";

function Search({isShown, setIsShown}) {
    return (
        <div className={'bg-gradient-to-b bg-blend-darken from-[#FFE55E] to-[#151515] w-full relative'}>
            <div className={'bg-opacity-40 bg-black tw-full'}>
                <RxHamburgerMenu className={!isShown ? 'text-white visible absolute left-4 top-4' : 'hidden'} size={40} onClick={() => {setIsShown(!isShown)}}/>
                <div className={'md:w-[80%] w-[93%] m-auto'}>
                    <TopSearch/>
                    <h3 className={'text-white text-[32px] pt-[34px] pb-[16px]'}>Top Search</h3>
                    <MusicRes name={'Savage'} author={'Drake'} time={'3:55'}/>
                    <MusicRes name={'Savage'} author={'Drake'} time={'3:55'}/>
                    <MusicRes name={'Savage'} author={'Drake'} time={'3:55'}/>
                    <MusicRes name={'Savage'} author={'Drake'} time={'3:55'}/>
                    <MusicRes name={'Savage'} author={'Drake'} time={'3:55'}/>
                    <MusicRes name={'Savage'} author={'Drake'} time={'3:55'}/>
                    <MusicRes name={'Savage'} author={'Drake'} time={'3:55'}/>
                    <MusicRes name={'Savage'} author={'Drake'} time={'3:55'}/>
                    <MusicRes name={'Savage'} author={'Drake'} time={'3:55'}/>
                    <MusicRes name={'Savage'} author={'Drake'} time={'3:55'}/>
                    <MusicRes name={'Savage'} author={'Drake'} time={'3:55'}/>
                    <MusicRes name={'Savage'} author={'Drake'} time={'3:55'}/>
                    <MusicRes name={'Savage'} author={'Drake'} time={'3:55'}/>
                    <MusicRes name={'Savage'} author={'Drake'} time={'3:55'}/>
                </div>
            </div>
        </div>
    );
}

export default Search;