import React from "react";
import { useAuthUser } from "@/hooks/useAuthUser";
import axios from "axios";
import { createClient } from "@/lib/client";
import { toast } from "sonner";
import { authItems } from "@/constants/navItems";
import Link from "next/link";

export const MobileAuthMenu = () => {
	const { user } = useAuthUser();

	const supabase = createClient();
	
	const handleLogout = async () => {
		try {
			await axios.post("/auth/signout");
			await supabase.auth.signOut(); // 클라이언트 로그아웃
			toast.success("로그아웃 하였습니다.");
		} catch (error) {
			console.error("로그아웃 실패", error);
		}
	}

	return (
		<>
			{!user?.id ? (
				<>
					{authItems.map((item) => (
						<li key={item.href} className="text-end text-lg font-semibold w-full rounded-xl hover:bg-gray-100 hover:underline p-2 cursor-pointer transition-all delay-75">
							<Link href={item.href}>{item.text}</Link>
						</li>
					))}
				</>
			) : (
				<li
					className="text-end text-lg font-semibold w-full rounded-xl hover:bg-gray-100 hover:underline p-2 cursor-pointer transition-all delay-75"
					onClick={handleLogout}
				>
					로그아웃
				</li>
			)}
		</>
	);
};
