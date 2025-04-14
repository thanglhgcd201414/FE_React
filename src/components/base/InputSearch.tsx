import { SearchOutlined } from "@ant-design/icons";

interface SearchInputProps {
  placeholder: string;
  onSearch: () => void;
  value: string;
  typeInput?: string;
  icon?: React.ReactNode;
  onHandleChange: (value: string) => void;
}

export default function InputSearch({
  placeholder,
  value,
  icon,
  typeInput,
  onSearch,
  onHandleChange,
}: SearchInputProps) {
  return (
    <div className="flex items-center border-[1px] border-solid border-gray-300 rounded-3xl overflow-hidden shadow-sm focus-within:shadow-md transition-shadow duration-300 h-full w-[240px]">
      <div className="ps-5">
        {icon ?? <SearchOutlined className="text-gray-500 text-xl mt-1" />}
      </div>
      <input
        type={typeInput ?? "text"}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onHandleChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSearch();
          }
        }}
        className="flex-1 p-2 outline-none border-none focus:ring-0"
      />
    </div>
  );
}
