import React from "react";
import { TextInput } from "@mantine/core";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [searchText, setSearchText] = React.useState<string>();
  const navigation = useNavigate();

  const onSearchHandler = () => {
    if (searchText) {
      navigation(`/${searchText}`);
    }
  };
  return (
    <div className="max-w-xl w-full mx-auto mt-4">
      <TextInput
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
