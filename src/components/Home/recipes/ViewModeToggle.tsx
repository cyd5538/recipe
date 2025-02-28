import React from 'react'
import { CiBoxList } from "react-icons/ci";
import { FiCreditCard } from "react-icons/fi";

interface Props {
    viewMode: "card" | "list";
    setViewMode: React.Dispatch<React.SetStateAction<"card" | "list">>;
}

const ViewModeButton: React.FC<{ icon: React.ReactNode; label: string; onClick: () => void }> = ({ icon, label, onClick }) => {
    return (
        <button className="cursor-pointer font-semibold flex gap-2 justify-center items-center px-4 py-2" onClick={onClick}>
            {icon} {label}
        </button>
    );
};

const ViewModeToggle: React.FC<Props> = ({ viewMode, setViewMode }) => {
    const isCardView = viewMode === "card";

    return (
        <div className="my-4 flex justify-end">
            <ViewModeButton
                icon={isCardView ? <CiBoxList /> : <FiCreditCard />}
                label={isCardView ? "리스트뷰 보기" : "카드 뷰 보기"}
                onClick={() => setViewMode(isCardView ? "list" : "card")}
            />
        </div>
    );
};

export default ViewModeToggle;
