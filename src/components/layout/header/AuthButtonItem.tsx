import CustomButton from '@/components/ui/CustomButton';
import Link from 'next/link';
import React from 'react'


interface Props {
  href: string;
  text: string;
}

const AuthButtonItem:React.FC<Props> = ({href, text}) => {
  return (
    <Link href={href} className='rounded-md'>
      <CustomButton text={text} />
    </Link>
  )
}

export default AuthButtonItem
