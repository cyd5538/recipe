import { motion } from "framer-motion";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const UserProfileNicknameInput: React.FC<Props> = ({ value, onChange }) => (
  <motion.div whileFocus={{ scale: 1.02 }} className="flex flex-col gap-1 text-left">
    <label className="text-sm text-gray-600">닉네임</label>
    <input
      className="w-full border p-3 rounded-md text-center"
      placeholder="닉네임을 입력하세요"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </motion.div>
);

export default UserProfileNicknameInput;