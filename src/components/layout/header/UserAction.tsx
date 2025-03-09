"use client";

import { useAuthUser } from "@/hooks/useAuthUser";
import axios from "axios";
import AuthButtons from "./AuthButtons";
import { toast } from "sonner";
import { createClient } from "@/lib/client";
import CustomButton from "@/components/ui/CustomButton";

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
        <CustomButton text="로그아웃" onClick={handleLogout} className="px-1 w-24"/>
    ) : (
        <AuthButtons />
    );
};

export default UserActions;
