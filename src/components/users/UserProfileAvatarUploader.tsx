import Image from "next/image";
import { motion } from "framer-motion";
import { useRef } from "react";

interface Props {
  preview: string | undefined;
  currentAvatar: string | undefined;
  onFileChange: (file: File) => void;
}

const UserProfileAvatarUploader: React.FC<Props> = ({
  preview,
  currentAvatar,
  onFileChange,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => fileInputRef.current?.click();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onFileChange(file);
  };

  return (
    <div onClick={handleClick} className="relative inline-block cursor-pointer">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Image
          src={preview || currentAvatar || "/avatar.webp"}
          alt="아바타"
          width={160}
          height={160}
          className="rounded-full border shadow-md object-cover aspect-square"
        />
        <span className="absolute bottom-2 right-2 bg-white rounded-full p-1 shadow text-sm">✏️</span>
      </motion.div>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className="hidden"
        onChange={handleChange}
      />
    </div>
  );
};

export default UserProfileAvatarUploader;