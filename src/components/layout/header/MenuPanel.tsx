"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import MenuList from "./MenuList";
import { X } from "lucide-react";

interface MenuPanelProps {
  open: boolean;
  onClose: () => void;
}

const MenuPanel: React.FC<MenuPanelProps> = ({ open, onClose }) => {
  const ref = useOnClickOutside(onClose);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div 
            className="fixed inset-0 bg-black/20 backdrop-blur-[1px] z-40" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          <motion.div
            ref={ref}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed top-0 right-0 w-[280px] h-full bg-white dark:bg-gray-900 shadow-lg z-50"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">메뉴</h2>
                <button 
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto">
                <MenuList onClose={onClose} />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MenuPanel;
