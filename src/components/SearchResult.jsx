import React, { useEffect, useState } from 'react';
import LeftNav from './LeftNav';
import useAppContext from '../context/context';
import { useParams } from 'react-router-dom';
import { fetchData } from '../utils/fetchData';
import SearchResultVideoCard from './SearchResultVideoCard';


function SearchResult() {

    const {searchQuery} = useParams();
    const {loading, setLoading, setSelectCategory, mobileMenu} = useAppContext();

    const [searchResultData, setSearchResultData] = useState([]);

    async function fetchSearchResultData(query) {
        setLoading(true);
        const {contents} = await fetchData(`search/?q=${query}&`);
        setSearchResultData(contents);
        setLoading(false);
    }

    
   

    useEffect(() => {
        setSelectCategory('');
        document.getElementById('root').classList.remove('custom-h');
        fetchSearchResultData(searchQuery);
    },[searchQuery])

    return (
        <div className='flex flex-row h-[calc(100%-56px)]'>

            <div className={`h-full md:block fixed md:relative z-10 transition-transform left-[-240px] md:left-0 md:translate-x-0 ${mobileMenu ? 'translate-x-[240px]' : ''}`}>
                <LeftNav />
            </div> 

            <div className='grow w-[calc(100%-240px)] h-full bg-black overflow-y-auto'>
                <div className='grid grid-cols-1 gap-2 p-5'>
                    {!loading && searchResultData && searchResultData?.map((element) => {
                        if(element?.type !== 'video'){
                            return false;
                        }
                        return (
                            <SearchResultVideoCard 
                                key={element?.video?.videoId}
                                video={element?.video}
                            />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default SearchResult;
