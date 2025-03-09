import React from 'react'
import { IoMdClose } from 'react-icons/io'

interface Prop {
    setIsOpen: (isOpen: boolean) => void;
}

export const MobileCloseBtn: React.FC<Prop> = ({ setIsOpen }) => {
    return (
        <button className="p-4 fixed top-0 right-0 cursor-pointer z-50" onClick={() => setIsOpen(false)}>
            <IoMdClose size={32} />
        </button>
    )
}
