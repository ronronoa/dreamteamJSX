import { Search } from "lucide-react";
import { InputBase, type InputBaseProps } from "@/components/base/input/input";

const SearchInputIcon: NonNullable<InputBaseProps["icon"]> = ({ className }) => (
  <Search size={14} className={className} />
);

export default function TableSearch() {
  return (
    <div>
      <InputBase
        type="search"
        aria-label="Search records"
        placeholder="Search"
        icon={SearchInputIcon}
        wrapperClassName="h-9 w-64 rounded-lg border border-gray-200 bg-white shadow-none ring-0 focus-within:border-purple-400 focus-within:ring-2 focus-within:ring-purple-100"
        inputClassName="h-full rounded-lg py-0 pr-3 text-xs text-gray-700 placeholder:text-gray-400"
      />
    </div>
  );
}
