import { useAuthUser } from '@/hooks/useAuthUser';
import Link from 'next/link';
import React from 'react';

interface Prop {
  href: string;
  text: string;
}

const MobileNavMenuList: React.FC<Prop> = ({ href, text }) => {
  const { user } = useAuthUser();

  const linkHref =
    text === "마이 페이지" && user?.id
      ? `${href}${href.includes('?') ? '&' : '?'}id=${user.id}`
      : href;

  return (
    <li className="text-end text-lg font-semibold w-full rounded-xl hover:bg-gray-100 hover:underline p-2 cursor-pointer transition-all delay-75">
      <Link href={linkHref}>{text}</Link>
    </li>
  );
};

export default MobileNavMenuList;
