"use client";

import { useAuthUser } from "@/hooks/useAuthUser";
import axios from "axios";
import AuthButtons from "./AuthButtons";
import { toast } from "sonner";
import { createClient } from "@/lib/client";

const UserActions = () => {
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

    return user?.id ? (
        <button onClick={handleLogout} className="text-sm font-medium text-red-500 hover:text-red-600">
            로그아웃
        </button>
    ) : (
        <AuthButtons />
    );
};

export default UserActions;
