import React, { useState } from 'react'
import Loader from './Loader';
import useAppContext from '../context/context';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import youtubeLogo from '../images/yt-logo.png';
import youtubeLogoMobile from '../images/yt-logo-mobile.png';

import {SlMenu} from 'react-icons/sl';
import {IoIosSearch} from 'react-icons/io';
import {RiVideoAddLine} from 'react-icons/ri';
import {FiBell, FiTrendingUp} from 'react-icons/fi';


function Header() {

    const [searchQuery, setSearchQuery] = useState('');

    const {loading, mobileMenu, setMobileMenu, setSelectCategory} = useAppContext();

    const {pathname} = useLocation();
    const pageName = pathname?.split('/')?.filter((element) => element.length>0)[0];

    const navigate = useNavigate();

    function mobileMenuToggle() {
        setMobileMenu((prevState) => !prevState);
    }

    function searchQueryHandler(event) {
        if((event.key === 'Enter') && searchQuery.length > 0){
            navigate(`/searchResult/${searchQuery}`)
            event.target.blur();
            
        }
    }

    function searchButtonHandler() {
        if(searchQuery.length > 0){
            navigate(`/searchResult/${searchQuery}`);
        }
    }


    return (
        <div className='sticky top-0 z-10 flex flex-row items-center justify-between h-14 px-4 bg-white md:px-5 dark:bg-black'>
            {loading && <Loader />}
            <div className='flex items-center h-5'>
                
                     
                <div 
                    className={`flex cursor-pointer items-center justify-center h-10 w-10 rounded-full hover:bg-[#303030]/[0.6] md:mr-6 ${pageName !== 'video' ? 'md:hidden' : ''}`}
                    onClick={mobileMenuToggle}
                >               
                    <SlMenu className='text-white text-xl' />                
                </div>
                    
                
                
                <div 
                    className='flex h-5 items-center cursor-pointer'
                    onClick={() => {
                        setSelectCategory('New');
                        navigate('/')
                    }}
                >
                    <img src={youtubeLogo} alt="YouTube" className='h-full hidden dark:md:block' />
                    <img src={youtubeLogoMobile} alt="Youtube" className='h-full md:hidden' />
                </div>
            </div>

            <div className='group flex items-center'>
                <div className='flex h-8 border border-[#303030] rounded-l-3xl group-focus-within:border-blue-500 md:h-10 md:ml-10 md:pl-5 md:group-focus-within:ml-5 md:group-focus-within:pl-0'>
                    <div className='w-10 items-center justify-center hidden group-focus-within:md:flex'>
                        <IoIosSearch className='text-white text-xl' />
                    </div>
                    <input 
                        type="text"
                        placeholder='Search'    
                        className='bg-transparent outline-none text-white pl-5 pr-5 md:pl-0 w-44 md:w-64 group-focus-within:md:pl-0 lg:w-[500px]'
                        value={searchQuery}
                        onChange={(event) => setSearchQuery(event.target.value)}
                        onKeyUp={searchQueryHandler}
                    />
                </div>
                <button 
                    type="button" 
                    className='flex items-center justify-center w-[40px] h-8 md:w-[60px] md:h-10 border border-l-0 border-[#303030] rounded-r-3xl bg-white/[0.1]'
                    onClick={searchButtonHandler}
                >
                    <IoIosSearch className='text-white text-2xl' />
                </button>
            </div>

            <div className='flex items-center'>
                <div className='hidden gap-2 md:flex'>
                    <div className='flex items-center justify-center h-10 w-10 rounded-full hover:bg-[#303030]/[0.6]'>
                        <RiVideoAddLine className='text-white text-xl cursor-pointer' />
                    </div>
                    <div className='flex items-center justify-center h-10 w-10 rounded-full hover:bg-[#303030]/[0.6]'>
                        <FiBell className='text-white text-xl cursor-pointer' />
                    </div>
                </div>
                <div className='flex h-10 w-10 overflow-hidden rounded-full cursor-pointer ml-2'>
                    <img src="https://xsgames.co/randomusers/assets/avatars/pixel/3.jpg" alt="" />
                </div>
            </div>
        </div>
    )
}

export default Header;
