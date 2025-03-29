"use client";

import { useState } from "react";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import Heading from "@tiptap/extension-heading";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";
import Youtube from "@tiptap/extension-youtube";
import { toast } from "sonner";

export const useRecipeEditor = () => {
    const [title, setTitle] = useState<string>("");
    const [selectedOptions, setSelectedOptions] = useState({
        category: "",
        cookTime: "",
        difficulty: "",
        materialPrice: "",
    });
    const [thumbnail, setThumbnail] = useState<File | null>(null);
    const [tags, setTags] = useState<string[]>([]);
    const [inputTag, setInputTag] = useState<string>("");
    const [ingredients, setIngredients] = useState<string[]>([]);
    const [ingredientTag, setIngredientTag] = useState<string>("");
    const [steps, setSteps] = useState<{ description: string; image: File | null }[]>([]);

    // 요리 순서 상태
    const addStep = () => {
        setSteps([...steps, { description: "", image: null }]);
    };

    const updateStepDescription = (index: number, value: string) => {
        const updatedSteps = [...steps];
        updatedSteps[index].description = value;
        setSteps(updatedSteps);
    };

    const updateStepImage = (index: number, file: File | null) => {
        const updatedSteps = [...steps];
        updatedSteps[index].image = file;
        setSteps(updatedSteps);
    };

    const removeStep = (index: number) => {
        setSteps(steps.filter((_, i) => i !== index));
    };


    const handleCategoryChange = (
        key: keyof typeof selectedOptions,
        value: string
    ) => {
        setSelectedOptions((prev) => ({ ...prev, [key]: value }));
    };

    // TipTap Editor 설정
    const editor = useEditor({
        extensions: [
            StarterKit.configure({ heading: false }),
            Heading.configure({ levels: [1, 2, 3] }),
            Bold,
            Italic,
            BulletList,
            OrderedList,
            ListItem,
            Underline,
            Image,
            Youtube.configure({ width: 480, height: 270 }),
        ],
        editorProps: {
            attributes: { class: "prose focus:outline-none dark:text-white" },
        },
    });

    // 레시피 벨리데이션
    const validateRecipeInput = (): string | null => {
        if (!title.trim()) return "레시피 제목을 입력해주세요.";
        if (!thumbnail) return "레시피 썸네일을 업로드해주세요.";
        if (!selectedOptions.category) return "카테고리를 선택해주세요.";
        if (!selectedOptions.cookTime) return "요리 시간을 선택해주세요.";
        if (!selectedOptions.difficulty) return "요리 난이도를 선택해주세요.";
        if (!selectedOptions.materialPrice) return "재료 가격대를 선택해주세요.";
        if (tags.length < 1 || tags.length > 5) return "태그는 최소 1개, 최대 5개 입력해야 합니다.";
        
        // 🔹재료 최소 1개 이상 체크
        if (ingredients.length < 1) return "적어도 하나 이상의 재료를 추가해야 합니다.";
    
        // 요리 순서(steps) 체크
        if (steps.length < 1) return "적어도 하나 이상의 요리 순서를 추가해야 합니다.";
        for (const step of steps) {
            if (!step.description.trim()) return "요리 순서 설명을 입력해주세요.";
        }

        const editorContent = editor?.getHTML() || "";
        if (!editorContent.trim() || editorContent === "<p></p>") {
            return "레시피 내용을 작성해주세요.";
        }
        return null;
    };

    // 태그 추가
    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.nativeEvent.isComposing) return; // 한글 입력 중이면 무시
        if (event.key === "Enter") {
            handleAddTag();
        }
    };

    const handleAddTag = () => {
        if (!inputTag.trim()) {
            toast.warning("태그를 입력해주세요.");
            return;
        }

        if (tags.includes(inputTag.trim())) {
            toast.warning("이미 존재하는 태그입니다.");
            return;
        }

        if (tags.length >= 5) {
            toast.warning("태그는 최대 5개까지 가능합니다.");
            return;
        }

        setTags((prevTags) => [...prevTags, inputTag.trim()]);
        setInputTag("");
    };


    // 태그 삭제
    const handleRemoveTag = (tagToRemove: string) => {
        setTags((prevTags) => prevTags.filter((tag) => tag !== tagToRemove));
    };

    // 재료 추가
    const handleIngredientKeyDown = (event: React.KeyboardEvent) => {
        if (event.nativeEvent.isComposing) return; 
        if (event.key === "Enter") {
            handleAddIngredient();
        }
    };

    const handleAddIngredient = () => {
        if (!ingredientTag.trim()) {
            toast.warning("재료를 입력해주세요.");
            return;
        }

        if (ingredients.includes(ingredientTag.trim())) {
            toast.warning("이미 추가된 재료입니다.");
            return;
        }

        setIngredients((prevIngredients) => [...prevIngredients, ingredientTag.trim()]);
        setIngredientTag("");
    };

    // 재료 삭제
    const handleRemoveIngredient = (ingredientToRemove: string) => {
        setIngredients((prevIngredients) => prevIngredients.filter((ingredient) => ingredient !== ingredientToRemove));
    };


    return {
        title,
        setTitle,
        selectedOptions,
        setSelectedOptions,
        thumbnail,
        setThumbnail,
        handleCategoryChange,
        handleRemoveTag,
        tags,
        setTags,
        inputTag,
        setInputTag,
        editor,
        validateRecipeInput,
        handleAddTag,
        handleKeyDown,
        ingredients,
        setIngredients,
        ingredientTag,
        setIngredientTag,
        handleAddIngredient,
        handleRemoveIngredient,
        handleIngredientKeyDown,
        steps,
        setSteps,
        addStep,
        updateStepDescription,
        updateStepImage,
        removeStep,
    };
};
