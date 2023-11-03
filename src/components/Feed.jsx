import React, { useEffect } from 'react'
import LeftNav from './LeftNav';
import useAppContext from '../context/context';
import VideoCard from '../components/VideoCard';

function Feed() {
  
  const {loading, searchResults, mobileMenu, selectCategory, setSelectCategory} = useAppContext();

  useEffect(() => {
    if(selectCategory === ''){
      setSelectCategory('New');
    }
    document.getElementById('root').classList.remove('custom-h');
  },[])
  
  return (
    <div className='flex flex-row h-[calc(100%-56px)]'>

      <div className={`h-full md:block fixed md:relative z-10 transition-transform left-[-240px] md:left-0 md:translate-x-0 ${mobileMenu ? 'translate-x-[240px]' : ''}`}>
        <LeftNav />
      </div>

        <div className='grow w-[calc(100%-240px)] h-full bg-black overflow-y-auto'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-5'>
              {!loading && searchResults && searchResults?.map((element) => {
                if(element?.type !== 'video'){
                  return false;
                }
                return (
                  <VideoCard
                    key={element?.video?.videoId}
                    video={element?.video}
                  />
                )
              }
              )}      
            </div>
        </div>
    </div>
  )
}

export default Feed;
