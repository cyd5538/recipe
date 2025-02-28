import React from 'react';
import RecipeTable from './RecipeTable';

const RecipeListView = () => {
  const recipeMockData = [
    {
      id: 1,
      title: '정말 맛있는 우삼겹 덮밥 규동 레시피! 간단한 한끼로 딱입니다.',
      tags: ['밥', '한식', '우삼겹', '덮밥', '규동'],
      category: '한식',
      cookingTime: '20분',
      difficulty: '상',
      image: '/mock.webp'
    },
    {
      id: 2,
      title: '오향장육 개맛있음',
      tags: ['오향장육', '중식', '아롱사태', '술안주'],
      category: '한식',
      cookingTime: '20분',
      difficulty: '상',
      image: '/mock.webp'
    },
  ];

  return <RecipeTable recipes={recipeMockData} />;

};

export default RecipeListView;
