"use client";

import React from "react";

interface Props {
  title: string;
  setTitle: (value: string) => void;
}

export function WriteTitle({ title, setTitle }: Props) {
  return (
    <input
      type="text"
      className="w-full p-3 border rounded-md text-lg"
      placeholder="레시피 제목을 입력하세요"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
    />
  );
}
