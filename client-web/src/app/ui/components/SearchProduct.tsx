import { SearchOutlined } from "@mui/icons-material";
import React from "react";

const SearchProduct = (): JSX.Element => {
  return (
    <div className="relative w-full h-10 py-1 pr-4 pl-2 bg-white rounded-md shadow-sm flex flex-row items-center ">
      <SearchOutlined className="text-gray-400 size-6 max-md:size-4 absolute md:top-2" />
      <input
        type="text"
        placeholder="Search"
        className="w-full pl-5 h-full ml-2 border-none focus:outline-none bg-transparent placeholder:text-gray-400 placeholder:text-sm placeholder:font-medium text-sm text-gray-500"
      />
    </div>
  );
};

export default SearchProduct;
