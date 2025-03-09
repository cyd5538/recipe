import React from 'react'
import { IoMdMenu } from 'react-icons/io'

interface Prop {
    setIsOpen: (isOpen: boolean) => void;
}

export const MobileMenuBtn: React.FC<Prop> = ({ setIsOpen }) => {
    return (
        <IoMdMenu
            className="cursor-pointer rounded-md hover:border dark:bg-zinc-800 dark:text-white border-black bg-white text-black text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200 p-1"
            size={32}
            onClick={() => setIsOpen(true)}
        />
    )
}
