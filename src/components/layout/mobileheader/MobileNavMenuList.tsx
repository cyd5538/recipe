import Link from 'next/link'
import React from 'react'

interface Prop {
	href: string;
	text: string;
}

const MobileNavMenuList: React.FC<Prop> = ({ href, text }) => {
	return (
		<li
			className="text-end text-lg font-semibold w-full rounded-xl hover:bg-gray-100 hover:underline p-2 cursor-pointer transition-all delay-75"

		>
			<Link href={href}>{text}</Link>
		</li>
	)
}

export default MobileNavMenuList