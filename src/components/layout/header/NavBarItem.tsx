import Link from 'next/link';
import React from 'react'

interface Props {
    href: string;
    text: string;
}

const NavBarItem:React.FC<Props> = ({href,text}) => {
  return (
    <li className='px-4 py-2 hover:bg-gray-100 dark:text-white dark:hover:bg-zinc-700 rounded-md'>
      <Link href={href}>
        {text}
      </Link>
    </li>
  )
}

export default NavBarItem
