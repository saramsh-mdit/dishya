import React, { KeyboardEvent } from "react";
import { TextInput } from "@mantine/core";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [searchText, setSearchText] = React.useState<string>();

  const onSearchHandler = () => {
    if (searchText) {
      window.location.href = `/${searchText}`;
    }
  };
  const keyboardhandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") onSearchHandler();
  };
  return (
    <div className="max-w-xl w-full mx-auto mt-4">
      <TextInput
        onKeyDown={(e) => keyboardhandler(e)}
        onChange={(e) => setSearchText(e.target.value)}
        rightSection={
          <Icon
            onClick={onSearchHandler}
            className="text-xl cursor-pointer hover:text-blue-600"
            icon="ic:round-search"
          />
        }
        placeholder="Search Here"
      />
    </div>
  );
};

export default Search;
