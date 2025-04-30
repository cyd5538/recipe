"use client";

import Header from "@/components/layout/header/Header";
import React, { use } from 'react';

interface PageProps {
  params: Promise<{
    id: string[];
  }>;
}

export default function RecipeDetail({ params }: PageProps) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <h1>{id}</h1>
      </div>
    </>
  );
}