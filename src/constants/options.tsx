import { AiOutlineGlobal } from "react-icons/ai";
import { FaBowlRice, FaBreadSlice } from "react-icons/fa6";
import { ImFire } from "react-icons/im";
import { GiSushis } from "react-icons/gi";

export const categoryOptions = [
    { value: "all", label: "All", icon: <AiOutlineGlobal /> },
    { value: "korean", label: "한식", icon: <FaBowlRice /> },
    { value: "chinese", label: "중식", icon: <ImFire /> },
    { value: "japanese", label: "일식", icon: <GiSushis /> },
    { value: "western", label: "양식", icon: <GiSushis /> },
    { value: "dessert", label: "디저트", icon: <FaBreadSlice /> },
];

export const timeOptions = [
    { value: "all", label: "All" },
    { value: "15", label: "15분" },
    { value: "30", label: "30분" },
    { value: "60", label: "1시간" },
    { value: "120", label: "2시간" },
    { value: "180", label: "2시간 이상" },
];

export const difficultyOptions = [
    { value: "하", label: "하" },
    { value: "중", label: "중" },
    { value: "상", label: "상" },
];

export const priceOptions = [
    { value: "10000", label: "10,000원" },
    { value: "20000", label: "20,000원" },
    { value: "50000", label: "50,000원" },
    { value: "100000", label: "100,000원" },
    { value: "200000", label: "기타" },
];