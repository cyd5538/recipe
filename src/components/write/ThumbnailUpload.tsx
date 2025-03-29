"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface Props {
    thumbnail: File | string | null;
    setThumbnail: (file: File | null) => void;
}

const ThumbnailUpload: React.FC<Props> = ({ thumbnail, setThumbnail }) => {
    const [preview, setPreview] = useState<string | null>(null);

    // 기존 썸네일 URL이 있을 경우 반영
    useEffect(() => {
        if (typeof thumbnail === "string") {
            setPreview(thumbnail); // 기존 URL 적용
        } else if (thumbnail instanceof File) {
            // 새 파일이 들어오면 Data URL 변환
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result as string);
            reader.readAsDataURL(thumbnail);
        }
    }, [thumbnail]);

    const handleThumbnailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setThumbnail(file);

        // 새 파일 미리보기 설정
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const handleClick = () => {
        document.getElementById("thumbnailInput")?.click();
    };

    return (
        <div className="mt-4 flex flex-col w-full">
            <h2 className="text-lg font-semibold mb-4">🖼️ 썸네일을 올려주세요.</h2>

            {/* 썸네일 선택 박스 */}
            <div
                className="w-full flex justify-center border-2 border-dashed cursor-pointer rounded-md"
                onClick={handleClick}
            >
                <div className="sm:w-[420px] w-full h-[300px] flex justify-center items-center">
                    {preview ? (
                        <Image
                            src={preview} 
                            alt="Thumbnail Preview"
                            width={420}
                            height={300}
                            className="object-cover rounded-md w-full h-full"
                        />
                    ) : (
                        <span className="text-gray-500">썸네일 이미지를 올려주세요</span>
                    )}
                </div>
            </div>

            <input
                id="thumbnailInput"
                type="file"
                accept="image/*"
                onChange={handleThumbnailChange}
                className="hidden"
            />
        </div>
    );
};

export default ThumbnailUpload;
