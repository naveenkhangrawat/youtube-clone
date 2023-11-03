import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { AiOutlineLike } from 'react-icons/ai';
import { abbreviateNumber } from 'js-abbreviation-number';
import { fetchData } from '../utils/fetchData';
import useAppContext from '../context/context';
import LeftNav from './LeftNav';
import SuggestionVideoCard from './SuggestionVideoCard';


function VideoDetail() {

    const {videoId} = useParams();

    const {setLoading, mobileMenu, setMobileMenu, setSelectCategory} = useAppContext();

    const [videoDetails, setVideoDetails] = useState({});
    const [relatedVideos, setRelatedVideos] = useState([]);

    async function fetchVideoDetailsData(id) {
    setLoading(true);
    const data = await fetchData(`video/details/?id=${id}&`);
    setVideoDetails(data);
    setLoading(false); 
    }

    async function fetchVideoRelatedContentsData(id) {
    setLoading(true);
    const {contents} = await fetchData(`video/related-contents/?id=${id}&`);
    setRelatedVideos(contents);
    setLoading(false);
    }

    
    

    useEffect(() => {
        setSelectCategory('');
        setMobileMenu(false);
        document.getElementById('root').classList.add('custom-h');
        fetchVideoDetailsData(videoId);
        fetchVideoRelatedContentsData(videoId);
    },[videoId])


    return (
    <>
        <div className='flex flex-row justify-center h-[calc(100%-56px)] bg-black relative'>

            <div className={`h-[calc(100vh-56px)] fixed left-[-240px] z-10 ${mobileMenu ? 'translate-x-[240px]' : ''} transition-all`}>
                <LeftNav />
            </div>

            <div className='w-full max-w-[1280px] flex flex-col lg:flex-row'>
                <div className='flex flex-col px-4 py-3 lg:py-6 overflow-y-auto lg:w-[calc(100%-350px)] xl:w-[calc(100%-400px)]'>
                    <div className='h-[200px] md:h-[400px] lg:h-[400px] xl:h-[500px] ml-[-16px] lg:ml-0 mr-[-16px] lg:mr-0'>
                        <ReactPlayer
                        url={`https://www.youtube.com/watch?v=${videoId}`}
                        controls
                        width='100%'
                        height='100%'
                        style={{backgroundColor: '#000000'}}
                        />
                    </div>

                    <div className='text-white font-bold text-sm md:text-xl mt-4 line-clamp-2'>
                        {videoDetails?.title}
                    </div>

                    <div className='flex justify-between flex-col md:flex-row mt-4'>
                         
                        <div className='flex'>
                            <div className='flex items-start'>
                                <div className='flex h-11 w-11 rounded-full overflow-hidden'>
                                    <img 
                                        src={videoDetails?.author?.avatar[0]?.url} 
                                        className='w-full h-full object-cover' 
                                    />
                                </div>
                            </div>

                            

                            <div className='flex flex-col ml-3'>
                                <div className='text-white text-base font-semibold flex items-center'>
                                    {videoDetails?.author?.title}
                                    {videoDetails?.author?.badges[0]?.type === 'VERIFIED_CHANNEL' && (
                                        <BsFillCheckCircleFill className="text-white/[0.5] text-[12px] ml-1" />
                                    )}
                                </div>
                                <div className='text-white/[0.7] text-sm'>
                                {videoDetails?.author?.stats?.subscribersText}
                                </div>
                            </div>
                                
                        </div>
                          

                        <div className='flex text-white mt-4 md:mt-0'>
                            <div className='flex items-center justify-center px-6 h-11 rounded-3xl bg-white/[0.15] cursor-pointer'>
                                <AiOutlineLike className='text-xl text-white mr-2' />
                                <span>
                                    {abbreviateNumber(videoDetails?.stats?.likes, 2)} Likes
                                </span>
                            </div>

                            <div className='flex items-center justify-center px-6 h-11 rounded-3xl bg-white/[0.15] cursor-pointer ml-4'>
                                <AiOutlineLike className='text-xl text-white mr-2' />
                                <span>
                                    {abbreviateNumber(videoDetails?.stats?.views, 2)} Views
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='flex flex-col py-6 px-4 overflow-y-auto lg:w-[350px] xl:w-[400px]'>
                    {relatedVideos?.map((element) => {            
                        if(element?.type !== 'video'){
                            return false;
                        }
                        return (
                            <SuggestionVideoCard 
                                key={element?.video?.videoId}
                                video={element?.video}
                            />
                        )            
                    })}
                </div>
            </div>
        </div>
    </>
    )
}

export default VideoDetail;



