"use client";

import Header from "@/components/layout/header/Header";
import React, { use } from 'react';
import { useRouter } from 'next/navigation';

interface PageProps {
  params: Promise<{
    id: string[];
  }>;
}

export default function RecipeDetail({ params }: PageProps) {
  const router = useRouter();
  const resolvedParams = use(params);
  const { id } = resolvedParams;

  const saveAiRecipe = async () => {
    try {
      const response = await fetch('/api/ai-recipe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
      
      if (response.ok) {
        const data = await response.json();
        router.push(`/aiwrite/${data.id}`);
      }
    } catch (error) {
      console.error('레시피 저장 중 오류 발생:', error);
    }
  };

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <h1>{id}</h1>
        <button 
          onClick={saveAiRecipe}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          레시피 저장
        </button>
      </div>
    </>
  );
}