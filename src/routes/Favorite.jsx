import React, {useContext, useEffect, useState} from 'react';
import {RxHamburgerMenu} from 'react-icons/rx'
import {ThemeContext, accessToken} from '../context/ThemeContext';
import MusicRes from "../components/MusicRes";
import axios from "axios";

function Favorite({isShown, setIsShown}) {
    let arrLiked = []
    const [liked, setLiked] = useState([]);
    let newArr = []
    const {theme, setTheme, setContextAccessToken, contextAccessToken} = useContext(ThemeContext);
    const receiveFav = async (id) => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            body: JSON.stringify({input: id})
        };

        const response = await fetch('http://127.0.0.1:5000/api/data', requestOptions);
        const data = await response.json();
        arrLiked = data.output
        getLikedInfo()
    }

    const getLikedInfo = async () => {
        await axios.get(`https://api.spotify.com/v1/tracks?ids=${arrLiked.join(',')}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(response => {
                console.log(response.data.tracks[0].id)
                setLiked(response.data.tracks)
            })
            .catch(error => {
                console.error(error);
            });
    }

    useEffect(() => {
        receiveFav("")
    }, [])
    return (
        <div className={'bg-leftMenu-gradient w-full h-screen overflow-y-scroll z-200'}>
            <RxHamburgerMenu className={!isShown ? 'text-primary visible absolute left-4 top-4' : 'hidden'} size={40}
                             onClick={() => {
                                 setIsShown(!isShown)
                             }}/>
            <div className={"pt-24"}>
                {liked.length != 0 ? liked.map((result) => {
                    return (<div className={'my-[4px]'}><MusicRes key={result.id} id={result.id} name={result.name} author={result.artists[0].name}
                                           image={result.album.images[0].url}
                                           time=''
                                           liked={false}
                                            showLike={false}
                                           receiveFav={receiveFav}/></div>)
                }) : null}
            </div>
        </div>
    );
}

export default Favorite;