import React, {useContext} from 'react'
import {useEffect, useState} from 'react';
import {ThemeContext, accessToken} from '../context/ThemeContext';
import {RxHamburgerMenu} from 'react-icons/rx'
import Burger from "../components/Burger";
import TopSearch from "../components/topSearch";
import MusicRes from "../components/MusicRes";
import MiniPlayer from "../components/MiniPlayer";
import {DEVICE_ID} from "../spotify_keys.js"
import axios from "axios";
import {CLIENT_ID, CLIENT_SECRET} from "../spotify_keys.js"

function Search({isShown, setIsShown}) {

    const {theme, setTheme, setPlayingUri, playingUri, setPlayingName, setPlayingAuthor, setPlayingImage, contextAccessToken, setcontextAccessToken, setIsPlaying} = useContext(ThemeContext);
    const [searchResult, setSearchResult] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    const scope = 'user-read-currently-playing user-modify-playback-state user-read-playback-state streaming';
    const SCOPE = 'user-read-playback-state user-modify-playback-state';

    const authParamsUser = new URLSearchParams({
        response_type: 'code',
        client_id: CLIENT_ID,
        redirect_uri: 'http://localhost:3000',
        scope: SCOPE,
    });


    useEffect(() => {
        const url = window.location.href;
        const urlParams = new URLSearchParams(new URL(url).search);
        const code = urlParams.get('code');
        const fetchData = async () => {
            let authParams = {
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: `grant_type=authorization_code&code=${code}&redirect_uri=${encodeURIComponent("http://localhost:3000")}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&scope=${encodeURIComponent(scope)}`,
            };

            fetch('https://accounts.spotify.com/api/token', authParams)
                .then(result => result.json())
                .then(data => {
                    window.localStorage.setItem("token", data.access_token)
                    window.location.href = "http://localhost:3000"
                });
        }
        if(code != null){
            fetchData()
        }
    }, [])

    const addSongToQueue = async (uri) => {
        // try {
        //     const response = await axios.post(
        //         `https://api.spotify.com/v1/me/player/queue?uri=${uri}&device_id=${DEVICE_ID}`,
        //         {
        //             headers: {
        //                 Authorization: `Bearer ${localStorage.getItem('token')}`,
        //             },
        //         }
        //     );
        //
        //     console.log(response.data);
        // } catch (error) {
        //     console.error(error);
        // }

        let param = {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: `uri=${uri}&device_id=${DEVICE_ID}`,
        };

        fetch('https://api.spotify.com/v1/me/player/queue', param)
            .then(result => result.json())
            .then(data => {
                console.log(data)
            });
    };

    const skipToNext = async () => {
        const {data} = await axios.post('https://api.spotify.com/v1/me/player/next', {
            device_id: DEVICE_ID,
        },{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        console.log(data)
    }

    return (
        <div className={'bg-leftMenu-gradient w-full h-screen overflow-y-scroll z-200'}>
            <RxHamburgerMenu className={!isShown ? 'text-primary visible absolute left-4 top-4' : 'hidden'} size={40}
                             onClick={() => {
                                 setIsShown(!isShown)
                             }}/>
            {window.localStorage.getItem("token") != null ? <div className={'md:w-[90%] w-[93%] m-auto h-[94vh]'}>
                <TopSearch setSearchResult={setSearchResult} setIsSearching={setIsSearching}/>
                {searchResult.length > 1 ?
                    <h3 className={'text-primary text-[32px] pt-[34px] pb-[16px]'}>TOP RESULTS</h3> : null}
                {/*<MusicRes name="mlsf" author="klsdmnf" time="3:14"/>*/}
                {
                    searchResult.includes('failed') & isSearching != true ? (
                            <h3 className={'absolute text-xl left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]'}>No
                                search result</h3>)
                        :
                        !isSearching ? searchResult.map((result) => {
                                console.log(result)
                                const totalSeconds = Math.floor(result.duration_ms / 1000);
                                const minutes = Math.floor(totalSeconds / 60);
                                const seconds = totalSeconds % 60;
                                return (<div key={result.id} onClick={() => {
                                    setPlayingUri(result.uri)
                                    setPlayingName(result.name)
                                    setPlayingAuthor(result.artists[0].name)
                                    setPlayingImage(result.album.images[0].url)
                                    setIsPlaying(true)
                                    addSongToQueue(result.uri)
                                    // skipToNext()

                                }}><MusicRes key={result.id} name={result.name} author={result.artists[0].name}
                                             image={result.album.images[0].url}
                                             time={`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`}/></div>)
                            }
                        ) : <div
                            className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-12 h-12 rounded-full border-4 border-gray-300 border-t-transparent animate-spin"></div>
                }
            </div> : <a href={`https://accounts.spotify.com/authorize?${authParamsUser.toString()}`}>Click me</a>}

        </div>
    );
}

export default Search;