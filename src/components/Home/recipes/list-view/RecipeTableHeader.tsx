import React from 'react';

const RecipeTableHeader = () => {
  return (
    <thead >
      <tr>
        <th className="p-2 text-center w-[250px]">제목</th>
        <th className="p-2 w-[100px] text-center">카테고리</th>
        <th className="p-2 w-[100px] text-center">요리시간</th>
        <th className="p-2 w-[80px] text-center">난이도</th>
        <th className="p-2 justify-center hidden 1125px:flex">사진</th>
      </tr>
    </thead>
  );
};

export default RecipeTableHeader;
