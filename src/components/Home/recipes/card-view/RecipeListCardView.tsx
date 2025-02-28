import React from 'react';
import RecipeCard from './RecipeCard';

const RecipeListCardView = () => {
  const recipeMockData = [
    {
      id: 1,
      title: '정말 맛있는 우삼겹 덮밥 규동 레시피! 간단한 한끼로 딱입니다.',
      description: "정말 맛있는 우삼겹 덮밥 규동 레시피! 간단한 한끼로 딱입니다.정말 맛있는 우삼겹 덮밥 규동 레시피! 간단한 한끼로 딱입니다.정말 맛있는 우삼겹 덮밥 규동 레시피! 간단한 한끼로 딱입니다.",
      tags: ['밥', '한식', '우삼겹', '덮밥', '규동'],
      category: '한식',
      cookingTime: '20분',
      difficulty: '상',
      image: '/mock.webp'
    },
    {
      id: 2,
      title: '오향장육 개맛있음',
      description: "정말 맛있는 우삼겹 덮밥 규동 레시피! 간단한 한끼로 딱입니다.",
      tags: ['오향장육', '중식', '아롱사태', '술안주'],
      category: '한식',
      cookingTime: '20분',
      difficulty: '상',
      image: '/mock.webp'
    },
    {
      id: 3,
      title: '마제소바',
      description: "정말 맛있는 우삼겹 덮밥 규동 레시피! 간단한 한끼로 딱입니다.정말 맛있는 우삼겹 덮밥 규동 레시피! 간단한 한끼로 딱입니다.",
      tags: ['마제소바', '일식', '덮밥', ],
      category: '한식',
      cookingTime: '20분',
      difficulty: '상',
      image: '/mock.webp'
    },
    {
      id: 4,
      title: '마파두부',
      description: "정말 맛있는 우삼겹 덮밥 규동 레시피! 간단한 한끼로 딱입니다.정말 맛있는 우삼겹 덮밥 규동 레시피! 간단한 한끼로 딱입니다.정말 맛있는 우삼겹 덮밥 규동 레시피! 간단한 한끼로 딱입니다.",
      tags: ['마파두부', '중식', '매움', '밥도둑'],
      category: '한식',
      cookingTime: '20분',
      difficulty: '상',
      image: '/mock.webp'
    },
  ];

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3'>
      {recipeMockData.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
};

export default RecipeListCardView;
