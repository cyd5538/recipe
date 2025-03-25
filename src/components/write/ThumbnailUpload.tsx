"use client";

import Image from "next/image";
import { useState } from "react";

interface Props {
    thumbnail: File | null;
    setThumbnail: (file: File | null) => void;
}

const ThumbnailUpload: React.FC<Props> = ({ setThumbnail }) => {
    const [preview, setPreview] = useState<string | null>(null);

    const handleThumbnailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setThumbnail(file);

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
                            className="object-cover rounded-md w-full h-full "
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
