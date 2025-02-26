import Link from 'next/link';
import React from 'react'


interface Props {
  href: string;
  text: string;
}

const AuthButtonItem:React.FC<Props> = ({href, text}) => {
  return (
    <Link href={href} className='px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:text-white dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded-md'>
      <button>{text}</button>
    </Link>
  )
}

export default AuthButtonItem
