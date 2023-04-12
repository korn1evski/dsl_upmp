import React, {useContext, useState} from 'react';
import { ThemeContext } from '../context/ThemeContext';
import {RxCross2, RxDotsHorizontal, RxHeart} from 'react-icons/rx'
import MenuText from "./MenuText"
import {Routes, Route, Link} from 'react-router-dom';
import ToggleTheme from './ToggleTheme'

function Menu({isShown, setIsShown}) {
    const {theme, setTheme} = useContext(ThemeContext);
    window.addEventListener('resize', () =>{
        if(window.innerWidth < 1280)
            setIsShown(false);
        else
            setIsShown(true);
    });
    return (
        <div className={isShown ? 'bg-leftMenu-gradient pl-[20px] w-full md:w-1/4 2xl:w-1/5 color duration-300 transition-w ease-in-out flex justify-between flex-col' : 'w-0 bg-leftMenu-gradient bg-blend-darken from-[#000] to-[#4d1f00] duration-300 transition-w ease-in-out'}>
            <div>
                <RxCross2 className={'text-primary mt-4 xl:hidden mb-10'} size={35} onClick={() => {setIsShown(!isShown)}}/>
                <img src={theme === 'dark' ? require("../assets/mood_core.png") : require("../assets/logo_light.png")} alt="logo" className={'w-[82px] h-[46px] mt-[35px] mb-[25px]'}/>
                <Link to={''}>
                    <MenuText text={"search"} selected={true} margin={true}/>
                </Link>
                <Link to={''}>
                    <MenuText text={"your library"} selected={false} margin={true}/>
                </Link>
                <Link to={''}>
                    <MenuText text={"favorite"} selected={false} margin={false}/>
                </Link>
            </div>

            <div className={"cursor-pointer absolute top-[50%]"}>
                <ToggleTheme/>
            </div>

            <div>
                <Link to={''}>
                    <MenuText text={"your account"} margin={true}/>
                </Link>
                <Link to={''}>
                    <MenuText text={"settings"} margin={true}/>
                </Link>
            </div>
        </div>
    );
}

export default Menu;