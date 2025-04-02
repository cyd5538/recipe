"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import MenuList from "./MenuList";

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
            className="fixed inset-0 bg-black bg-opacity-70 z-40" 
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
            className="fixed top-0 right-0 w-64 h-full bg-white dark:bg-zinc-900 shadow-lg z-50 p-6"
          >
            <MenuList onClose={onClose} />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MenuPanel;
