import React from 'react';
import { CiTimer } from "react-icons/ci";

const RecipeDetails = ({ description, category, difficulty, cookingTime }) => {
    const desSlicing = description.length > 80 ? description.slice(0, 80) + "..." : description;

    return (
        <div className='flex flex-col gap-2'>
            <div className='h-24 overflow-hidden'>{desSlicing}</div>
            <div className='flex gap-2 my-4  justify-between items-center'>
                <div className='flex gap-2 justify-center'>
                    <div>{category}, </div>
                    <div>난이도 {difficulty}</div>
                </div>
                <div className='flex gap-[2px] items-center'><CiTimer size={28}/> {cookingTime}</div>
            </div>

        </div>
    );
};

export default RecipeDetails;
