import React from 'react'

const TagSection = () => {
    const mockData = ["한식","중식","양식","일식","돼지고기","소고기","계란","빵","커피","우유","파스타","짜장면", "짬뽕","비빔밥","오향장육", "스시",];
        
    return (
        <div className='mt-4 flex flex-col gap-4 bg-white dark:bg-transparent p-6 rounded-xl shadow-md dark:border-[1px]  '>
            <div>인기 태그</div>
            <div className='flex gap-2 flex-wrap'>
                {mockData.map((data,index) => {
                    return  <div key={data} className='px-2 py-1 border rounded-md cursor-pointer hover:bg-gray-100 shadow-md dark:hover:bg-zinc-950'>{data}</div>
                })}
            </div>
        </div>
    )
}

export default TagSection
