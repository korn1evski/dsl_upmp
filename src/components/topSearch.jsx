import React, {useContext} from 'react'
import {useEffect, useState} from 'react';
import axios from "axios";
import {CLIENT_ID, CLIENT_SECRET} from "../spotify_keys.js"
import {ThemeContext, accessToken} from '../context/ThemeContext';

function TopSearch({setSearchResult, search, setIsSearching}) {
    const {theme, setTheme, setContextAccessToken, contextAccessToken} = useContext(ThemeContext);
    const [inputText, setInputText] = useState('');
    const scope = 'user-read-currently-playing user-modify-playback-state user-read-playback-state streaming';
    const SCOPE = 'user-read-playback-state user-modify-playback-state';

    const authParamsUser = new URLSearchParams({
        response_type: 'code',
        client_id: CLIENT_ID,
        redirect_uri: 'http://localhost:3000',
        scope: SCOPE,
    });


    useEffect(() => {
        let authParams = {
            method: 'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET + `&scope=${scope}`
        }

        fetch('https://accounts.spotify.com/api/token', authParams)
            .then(result => result.json())
            .then(data => {
                setContextAccessToken(data.access_token)
                console.log(data)
            })

    }, [])

    const handleInputChange = (event) => {
        setInputText(event.target.value);
    };

    const handleSubmit = async (event) => {

        setIsSearching(true);

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            body: JSON.stringify({input: inputText})
        };

        const response = await fetch('/api', requestOptions);
        const data = await response.json();

        let arr = data.output

        for (let i = 0; i < arr.length; i++)
            arr[i] = arr[i].split(':')[2]

        console.log(arr)
        const checkArr = ['7zgqtptZvhf8GEmdsM2vp2', '4Vxu50qVrQcycjRyJQaZLC', '6b8Be6ljOzmkOmFslEb23P']
        const containsAllUris = checkArr.every(uri => arr.includes(uri));

        if (containsAllUris) {
            setIsSearching(false);
            setSearchResult(['failed']);
            return;
        }


        await axios.get(`https://api.spotify.com/v1/tracks?ids=${arr.join(',')}`, {
            headers: {
                Authorization: `Bearer ${contextAccessToken}`
            }
        })
            .then(response => {
                setSearchResult(response.data.tracks);
            })
            .catch(error => {
                console.error(error);
            });

        setIsSearching(false);

    }


    return (
        <div className={'flex justify-between h-[126px] w-full items-center md:pt-[66px] pt-[75px]'}>
            <div className={'w-[100%] h-full relative'}>
                {/*<a href={`https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-read-playback-state%20user-modify-playback-state`}>Press</a>*/}
                {/*<a href={"https://accounts.spotify.com/authorize?client_id=213d17c016aa45a191b7656dd3036160&response_type=code&redirect_uri=http://localhost:3000&scope=streaming"}>Press</a>*/}
                <input type="text" value={inputText} onChange={handleInputChange} placeholder={"Enter your mood..."}
                       className={`bg-transparent ${theme === 'dark' ? "border-white placeholder-white" : "border-black placeholder-black"} border h-full w-full rounded-full text-primary md:pl-10 pl-12 text-l focus:outline-none`}/>
                <div onClick={handleSubmit}
                     className={'bg-[#F66060] rounded-full md:w-[28px] md:h-[28px] w-[18px] h-[18px] absolute md:right-[18px] md:top-[17px] right-[18px] top-[18px] blur-sm hover:scale-110 duration-300 cursor-pointer'}></div>
            </div>
            {/*<div className={'rounded-[100px] bg-gray-50 md:h-full md:w-[60px] h-[42px] w-[42px]'}></div>*/}
        </div>
    );
}

export default TopSearch;