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
    const [inputText, setInputText] = useState('');
    const [responseText, setResponseText] = useState('');

    const handleInputChange = (event) => {
        setInputText(event.target.value);
    };

    const handleSubmit = async (event) => {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input: inputText })
    };

    const response = await fetch('http://localhost:5000/api', requestOptions);
    const data = await response.json();
    setResponseText(data.output);
  }
   
    return (
        <div className={'bg-leftMenu-gradient  w-full relative'}>
            <div className={'bg-opacity-10 bg-black tw-full'}>
                <RxHamburgerMenu className={!isShown ? 'text-primary visible absolute left-4 top-4' : 'hidden'} size={40} onClick={() => {setIsShown(!isShown)}}/>
                <div className={'md:w-[90%] w-[93%] m-auto'}>
                            <div className={'flex justify-between h-[126px] w-full items-center md:pt-[66px] pt-[75px]'}>
                        <div className={'w-[100%] h-full relative'}>
                        
                            <input type="text" value={inputText} onChange={handleInputChange}  placeholder={"Enter your mood..."} className={`bg-transparent ${theme === 'dark' ? "border-white placeholder-white" : "border-black placeholder-black"} border h-full w-full rounded-full text-primary md:pl-10 pl-12 text-l focus:outline-none`}/>
                        <div onClick={handleSubmit} className={'bg-[#F66060] rounded-full md:w-[28px] md:h-[28px] w-[18px] h-[18px] absolute md:right-[18px] md:top-[17px] right-[18px] top-[18px] blur-sm'}></div>
                        </div>
                        {/*<div className={'rounded-[100px] bg-gray-50 md:h-full md:w-[60px] h-[42px] w-[42px]'}></div>*/}
                    </div>
                    <h3 className={'text-primary text-[32px] pt-[34px] pb-[16px]'}>TOP RESULTS</h3>
                    <MusicRes name={'Savage'} author={'Drake'} time={'3:55'}/>
                    <p>{responseText}</p>
                </div>
            </div>
        </div>
    );
}

export default Search;