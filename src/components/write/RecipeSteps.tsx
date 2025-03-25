import Image from "next/image";
import React, { useState } from "react";
import CustomButton from "../ui/CustomButton";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react"; // X 아이콘 추가

interface RecipeStep {
  description: string;
  image: File | null;
}

interface RecipeStepsProps {
  steps: RecipeStep[];
  addStep: () => void;
  updateStepDescription: (index: number, value: string) => void;
  updateStepImage: (index: number, file: File | null) => void;
  removeStep: (index: number) => void;
}

const RecipeSteps: React.FC<RecipeStepsProps> = ({ steps, addStep, updateStepDescription, updateStepImage, removeStep }) => {
  const [previews, setPreviews] = useState<(string | null)[]>(steps.map(() => null));

  const handleImageChange = (index: number, file: File | null) => {
    updateStepImage(index, file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews((prev) => {
          const newPreviews = [...prev];
          newPreviews[index] = reader.result as string;
          return newPreviews;
        });
      };
      reader.readAsDataURL(file);
    } else {
      setPreviews((prev) => {
        const newPreviews = [...prev];
        newPreviews[index] = null;
        return newPreviews;
      });
    }
  };

  const removeImage = (index: number) => {
    updateStepImage(index, null);
    setPreviews((prev) => {
      const newPreviews = [...prev];
      newPreviews[index] = null;
      return newPreviews;
    });
  };

  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold">🍳 요리 순서 추가</h2>
      {steps.map((step, index) => (
        <div key={index} className="mt-4 border p-4 rounded-md flex flex-col sm:flex-row gap-4 items-center">
          <Textarea
            value={step.description}
            onChange={(e) => updateStepDescription(index, e.target.value)}
            placeholder={`Step ${index + 1} 설명 입력`}
            className="w-full border rounded p-2"
            rows={7}
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange(index, e.target.files?.[0] || null)}
            className="hidden"
            id={`stepImageInput-${index}`}
          />

          <div
            className="relative sm:w-[300px] w-full sm:h-[160px] h-[250px] border-2 border-dashed flex justify-center items-center cursor-pointer rounded-md"
            onClick={() => document.getElementById(`stepImageInput-${index}`)?.click()}
          >
            {previews[index] ? (
              <>
                <Image width={300} height={200} src={previews[index] as string} alt="step" className="w-full h-full object-cover rounded-md" />
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // 클릭 이벤트 버블링 방지
                    removeImage(index);
                  }}
                  className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-1"
                >
                  <X size={18} />
                </button>
              </>
            ) : (
              <span className="text-gray-500">이미지 추가</span>
            )}
          </div>

          <CustomButton text="삭제 X" onClick={() => removeStep(index)} className="w-24" />
        </div>
      ))}

      <CustomButton text="+ 단계 추가" onClick={addStep} className="mt-4" />
    </div>
  );
};

export default RecipeSteps;
