import { ModalTrigger } from '@/components/ui/animated-modal'
import React from 'react'
import { CiSearch } from 'react-icons/ci'

const SeacrhModalBtn = () => {
  return (
    <ModalTrigger className="z-50 lg:hidden bg-black fixed bottom-4 right-4 rounded-full w-16 h-16 dark:bg-white dark:text-black text-white flex justify-center items-center group/modal-btn">
      <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500">
        Search
      </span>
      <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
        <CiSearch size={32} />
      </div>
    </ModalTrigger>
  )
}

export default SeacrhModalBtn