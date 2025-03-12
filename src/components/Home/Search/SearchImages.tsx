"use client";
import { motion } from "motion/react";
import Image from "next/image";

const images = ["/2.jpg", "/3.jpg", "/4.webp", "/5.jpg"];

const SearchImages = () => {
  return (
    <div className="flex justify-center items-center">
      {images.map((image, idx) => (
        <motion.div
          key={"images" + idx}
          style={{ rotate: Math.random() * 20 - 10 }}
          whileHover={{ scale: 1.1, rotate: 0, zIndex: 100 }}
          whileTap={{ scale: 1.1, rotate: 0, zIndex: 100 }}
          className="rounded-xl -mr-4 mt-4 p-1 bg-white dark:bg-neutral-800 dark:border-neutral-700 border border-neutral-100 shrink-0 overflow-hidden"
        >
          <Image
            src={image}
            alt="bali images"
            width="500"
            height="500"
            className="rounded-lg h-36 w-36 md:h-48 md:w-48 object-cover shrink-0"
          />
        </motion.div>
      ))}
    </div>
  );
};

export default SearchImages;
