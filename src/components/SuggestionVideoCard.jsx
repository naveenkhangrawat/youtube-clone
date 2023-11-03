import React from 'react'
import { Link } from 'react-router-dom';
import {BsFillCheckCircleFill} from 'react-icons/bs';
import { abbreviateNumber } from "js-abbreviation-number";
import VideoLength from "./VideoLength";

function SuggestionVideoCard({video}) {

    return (
    <>
        <Link to={`/video/${video?.videoId}`}>
            <div className="flex mb-3">

                <div className="relative h-24 lg:h-20 xl:h-24 w-40 min-w-[160px] lg:w-32 lg:min-w-[128px] xl:w-40 xl:min-w-[160px] rounded-xl bg-slate-800 overflow-hidden">
                    <img 
                        className="h-full w-full object-cover" 
                        src={video?.thumbnails[0]?.url} 
                    />
                    {video?.lengthSeconds && (
                        <VideoLength time={video?.lengthSeconds}/>
                    )}
                </div>
                <div className="flex flex-col ml-3 overflow-hidden">
                    <span className="text-sm lg:text-xs xl:text-sm font-semibold line-clamp-2 text-white">
                        {video?.title}
                    </span>
                    <span className="text-[12px] lg:text-[10px] xl:text-[12px] font-semibold mt-2 text-white/[0.7] flex items-center">
                        {video?.author?.title}
                        {video?.author?.badges[0]?.type === 'VERIFIED_CHANNEL' && (
                            <BsFillCheckCircleFill className="text-white/[0.5] text-[12px] lg:text-[10px] xl:text-[12px] ml-1" />
                        )}
                    </span>
                    <div className="flex text-[12px] lg:text-[10px] xl:text-[12px] font-semibold text-white/[0.7] overflow-hidden whitespace-nowrap text-ellipsis">
                        <span>
                            {`${abbreviateNumber(video?.stats?.views,2)} views`}
                        </span>
                        <span className="flex text-[24px] leading-none font-bold text-white/[0.7] mx-1 relative top-[-10px]">
                            .
                        </span>
                        <span className="overflow-hidden whitespace-nowrap text-ellipsis">
                            {video?.publishedTimeText}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    </>
    )
}

export default SuggestionVideoCard;