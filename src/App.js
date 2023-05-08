import React, {useState, useEffect, useContext} from 'react'
import {Routes, Route, Link} from 'react-router-dom';
import { ThemeProvider, ThemeContext} from './context/ThemeContext';
import axios from 'axios';
import {RxCross2, RxDotsHorizontal, RxHeart} from 'react-icons/rx'
import Search from "./routes/Search";
import MiniPlayer from "./components/MiniPlayer";
import MenuText from "./components/MenuText"
import Menu from './components/Menu'
import Favorite from "./routes/Favorite"

function App() {
  const [isShown, setIsShown] = useState(window.innerWidth >= 1000)
  window.addEventListener('resize', () =>{
    if(window.innerWidth < 1280)
      setIsShown(false);
    else
      setIsShown(true);
  });


  
  // style={{backgroundImage: require("./assets/menu_gradient.png")}}

  return <ThemeProvider>
    <div className={'flex w-full h-screen overflow-x-hidden bg-leftMenu-gradient'}>
     <Menu isShown={isShown} setIsShown={setIsShown}/>
      <div className={window.innerWidth < 786 ? isShown ? 'w-0 duration-300 transition-all ease-in-out overflow-y-scroll bg-leftMenu-gradient' : 'w-full h-full duration-300 transition-all ease-in-out overflow-y-scroll bg-leftMenu-gradient' : 'h-screen w-full relative transition-all overflow-y-scroll bg-leftMenu-gradient'}>

        <Routes>
          <Route path='/' element={<Search isShown={isShown} setIsShown={setIsShown}/>}/>
          <Route path='/favorite' element={<Favorite isShown={isShown} setIsShown={setIsShown}/>}/>
        </Routes>
        <MiniPlayer author={'Drake'} name={'Savage'} progress={30}/>
      </div>
    </div>
  </ThemeProvider>
}

export default App;
