import React from "react";
import { RiMenu3Fill } from "react-icons/ri";
import { MdOutlineClose } from "react-icons/md";

interface MenuButtonProps {
  open: boolean;
  onClick: () => void;
}

const MenuButton: React.FC<MenuButtonProps> = ({ open, onClick }) => {
  return (
    <button 
      onClick={onClick} 
      className="p-2 rounded-md z-50"
    >
      {!open ? <RiMenu3Fill color="fff" size={32} className="cursor-pointer" /> 
             : <MdOutlineClose color="fff" size={32} className="cursor-pointer" />}
    </button>
  );
};

export default MenuButton;