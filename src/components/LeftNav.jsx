import React from 'react'
import {categories} from '../utils/constants';
import LeftNavItem from './LeftNavItem';
import useAppContext from '../context/context';
import { useNavigate } from 'react-router-dom';

function LeftNav() {

    const {selectCategory, setSelectCategory} = useAppContext();

    const navigate = useNavigate();

    function clickHandler(name, type) {
        type === 'menu' ? null : setSelectCategory(name);
        navigate('/');
    }

    
    return (
    <div className='w-[240px] overflow-y-auto h-full py-4 bg-black transition-all'>
        <div className='flex flex-col px-5'>
            {categories.map((element) => (
                <React.Fragment key={element.name}>
                    <LeftNavItem
                        title={element.type === 'home'? 'Home' : element.name}
                        icon={element.icon}
                        action={() => clickHandler(element.name, element.type)}
                        className={selectCategory === element.name ? 'bg-white/[0.15]' : ''}
                    />
                    {element.divider && <hr className='my-4 border-white/[0.2]' />}
                </React.Fragment>
            ))}
            <hr className='my-4 border-white/[0.2]' />
            <div className='text-white/[0.5] text-[12px]'>
                Clone by: Naveen Khangrawat
            </div>
        </div>
    </div>
    )
}

export default LeftNav;
