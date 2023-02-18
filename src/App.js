import React, {useState, useEffect} from 'react'
import {Routes, Route, Link} from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import axios from 'axios';
import {RxCross2, RxDotsHorizontal, RxHeart} from 'react-icons/rx'
import Search from "./routes/Search";
import MiniPlayer from "./components/MiniPlayer";

function App() {
  const [isShown, setIsShown] = useState(window.innerWidth >= 1000)
  window.addEventListener('resize', () =>{
    if(window.innerWidth < 1280)
      setIsShown(false);
    else
      setIsShown(true);
  });


  return <ThemeProvider>
    <div className={'flex w-full h-screen overflow-x-hidden'}>
      <div className={isShown ? 'pl-[20px] w-full md:w-1/2 2xl:w-1/5 color bg-[#151515] duration-300 transition-w ease-in-out' : 'w-0 bg-[#151515] duration-300 transition-w ease-in-out'}>
        <RxCross2 className={'text-white mt-4 xl:opacity-0 mb-10'} size={40} onClick={() => {setIsShown(!isShown)}}/>
        <RxDotsHorizontal className={'text-white mb-4'} size={40}/>
        <Link to={''}>
          <div className={'flex mb-4'}>
            <h3 className={'text-[25px] text-white pl-[9px] mr-[20px] font-[600]'}>#</h3>
            <h3 className={'text-[20px] text-white font-[600]'}>Your library</h3>
          </div>
        </Link>
        <Link to={''}>
          <div className={'flex mb-4'}>
            <RxHeart  className={'text-white mr-[20px]'} size={30}/>
            <h3 className={'text-[20px] text-white font-[600]'}>Favourite songs</h3>
          </div>
        </Link>
      </div>
      <div className={window.innerWidth < 786 ? isShown ? 'w-0 duration-300 transition-all ease-in-out overflow-y-scroll' : 'w-full h-full duration-300 transition-all ease-in-out overflow-y-scroll' : 'h-full w-full transition-all overflow-y-scroll'}>

        <Routes>
          <Route path='/' element={<Search isShown={isShown} setIsShown={setIsShown}/>}/>
        </Routes>
      </div>
      <MiniPlayer author={'Drake'} name={'Savage'} progress={30}/>
    </div>
  </ThemeProvider>
}

export default App;
