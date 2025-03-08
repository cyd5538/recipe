import React from 'react';
import { CiTimer } from "react-icons/ci";

interface Prop {
    description: string,
    category: string,
    difficulty: string | null,
    cookingTime: string | null
}

const RecipeDetails:React.FC<Prop> = ({ description, category, difficulty, cookingTime }) => {
    // HTML 태그 제거
    const plainText = description.replace(/<[^>]*>/g, "");

    return (
        <div className='flex flex-col gap-2'>
            <div className='h-12 overflow-hidden line-clamp-3'>{plainText}</div>
            <div className='flex gap-2 my-4 justify-between items-center'>
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
