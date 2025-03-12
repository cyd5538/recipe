"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
} from "@/components/ui/animated-modal";

import CustomButton from "@/components/ui/CustomButton";
import SeacrhModalBtn from "./SeacrhModalBtn";
import SearhModalTitle from "./SearhModalTitle";
import SearchImages from "./SearchImages";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Input from "@/components/ui/Input";

export function SearchModal() {
  const [search, setSearch] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false); // 모달 상태 추가
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleSearch = () => {
    if (!search.trim()) {
      return toast.warning("빈 검색어는 안돼요😂");
    }
    router.push(`/search?query=${encodeURIComponent(search)}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  // 모달이 열릴 때 input에 focus 적용
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  return (
    <div className="py-40 flex items-center justify-center">
      <Modal
        onOpenChange={(open) => setIsOpen(open)} // 모달 상태 변경 감지
      >
        {/* 모달  버튼 */}
        <SeacrhModalBtn />

        <ModalBody>
          <ModalContent>
            {/* 제목 */}
            <SearhModalTitle />

            {/* 검색 인풋 */}
            <div className="w-full justify-center items-center">
              <Input
                ref={inputRef} 
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleKeyDown}
                value={search}
                type="text"
                placeholder="검색어를 입력하세요"
                className="sm:w-[500px] w-full h-full px-4 py-4 rounded-xl border dark:bg-zinc-800 dark:text-white border-black text-black"
              />
            </div>
            {/* 이미지 컴포넌트 */}
            <SearchImages />
          </ModalContent>
          <ModalFooter className="gap-4">
            <CustomButton onClick={handleSearch} text="Search" />
          </ModalFooter>
        </ModalBody>
      </Modal>
    </div>
  );
}
