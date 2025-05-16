import { AiOutlineGlobal } from "react-icons/ai";
import { FaBowlRice, FaBreadSlice } from "react-icons/fa6";
import { ImFire } from "react-icons/im";
import { GiSushis } from "react-icons/gi";

export const categoryOptions = [
    { value: "all", label: "All", icon: <AiOutlineGlobal /> },
    { value: "한식", label: "한식", icon: <FaBowlRice /> },
    { value: "중식", label: "중식", icon: <ImFire /> },
    { value: "일식", label: "일식", icon: <GiSushis /> },
    { value: "양식", label: "양식", icon: <GiSushis /> },
    { value: "디저트", label: "디저트", icon: <FaBreadSlice /> },
];

export const timeOptions = [
    { value: "all", label: "All" },
    { value: "15분", label: "15분" },
    { value: "30분", label: "30분" },
    { value: "1시간", label: "1시간" },
    { value: "2시간", label: "2시간" },
    { value: "2시간 이상", label: "2시간 이상" },
];

export const difficultyOptions = [
    { value: "all", label: "All" },
    { value: "하", label: "하" },
    { value: "중", label: "중" },
    { value: "상", label: "상" },
];

export const priceOptions = [
    { value: "all", label: "All" },
    { value: "10,000원", label: "10,000원" },
    { value: "20,000원", label: "20,000원" },
    { value: "50,000원", label: "50,000원" },
    { value: "100,000원", label: "100,000원" },
];