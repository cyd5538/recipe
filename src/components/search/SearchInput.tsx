
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  loading: boolean;
}

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange, loading }) => {
  return (
    <div className="relative">
      <div className="absolute top-[50%] left-3 translate-y-[-50%] w-4">
        {loading
          ? <AiOutlineLoading3Quarters className='animate-spin' size={20} />
          : <CiSearch size={20} />}
      </div>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border p-2 w-full py-2 pl-10 rounded-xl"
        placeholder="레시피 검색..."
      />
    </div>
  );
};

export default SearchInput;