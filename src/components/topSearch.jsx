import React, {useContext} from 'react'
import { useEffect,useState } from 'react';
import { ThemeContext } from '../context/ThemeContext';

function TopSearch({setSearchResult}) {
    const {theme, setTheme} = useContext(ThemeContext);

    const [inputText, setInputText] = useState('');
    const [responseText, setResponseText] = useState('');

    const handleInputChange = (event) => {
        setInputText(event.target.value);
    };

    const handleSubmit = async (event) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            body: JSON.stringify({ input: inputText })
        };

        const response = await fetch('/api', requestOptions);
        const data = await response.json();
        setResponseText(data.output);
        setSearchResult(data.output)
    }
    

    return (
        <div className={'flex justify-between h-[126px] w-full items-center md:pt-[66px] pt-[75px]'}>
            <div className={'w-[100%] h-full relative'}>
            
                <input type="text" value={inputText} onChange={handleInputChange}  placeholder={"Enter your mood..."} className={`bg-transparent ${theme === 'dark' ? "border-white placeholder-white" : "border-black placeholder-black"} border h-full w-full rounded-full text-primary md:pl-10 pl-12 text-l focus:outline-none`}/>
               <div onClick={handleSubmit} className={'bg-[#F66060] rounded-full md:w-[28px] md:h-[28px] w-[18px] h-[18px] absolute md:right-[18px] md:top-[17px] right-[18px] top-[18px] blur-sm hover:scale-110 duration-300 cursor-pointer'}></div>
            </div>
            {/*<div className={'rounded-[100px] bg-gray-50 md:h-full md:w-[60px] h-[42px] w-[42px]'}></div>*/}
        </div>
    );
}

export default TopSearch;