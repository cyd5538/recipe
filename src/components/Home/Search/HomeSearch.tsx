"use client";

import CustomButton from '@/components/ui/CustomButton';
import React, { useState } from 'react'
import { CiSearch } from "react-icons/ci";
import { IoIosClose } from "react-icons/io";

const HomeSearch = () => {
    const [search, setSearch] = useState<string>("");
        
    return (
        <form className='mt-4 flex flex-col gap-4 border dark:bg-zinc-800 dark:text-white  bg-white text-black p-6 rounded-xl shadow-md dark:border-[1px]   '>
            <div className='relative rounded-xl shadow-md h-12 text-black'>
                <CiSearch className='absolute top-[50%] left-[5%] translate-y-[-50%]' size={24} />
                <input onChange={(e) => setSearch(e.target.value)} value={search} type="text" className='w-full h-full px-12 rounded-xl border dark:bg-zinc-800 dark:text-white  border-black bg-white text-black' />
                <IoIosClose className='absolute top-[50%] right-[5%] translate-y-[-50%] cursor-pointer'  size={28} />
            </div>
            <div className='pl-2 py-2 text-gray-400 bg:text-white'>음식을 검색하세요!</div>
            <div className='flex justify-end'>
                <CustomButton className='px-6 py-2 rounded-xl flex gap-2 items-center'>
                    <span>검색</span>
                    <CiSearch size={20}/> 
                </CustomButton>
            </div>
        </form> 
    )
}

export default HomeSearch
