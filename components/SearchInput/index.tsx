import { useState } from "react";
import styles from "./styles.module.css";
import SearchIcon from "./searchIcon.svg";
import { useAppContext } from "./../../contexts/app";

type Props = {
  onSearch: (searchValue: string) => void;
};

export const SearchInput = ({ onSearch }: Props) => {
  const { tenant, setTenant } = useAppContext();

  const [focused, setFocused] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") {
      onSearch(searchValue);
    }
  };

  return (
    <div
      className={styles.container}
      style={{ borderColor: focused ? tenant?.mainColor : "#FFF" }}
    >
      <div className={styles.button} onClick={() => onSearch(searchValue)}>
        <SearchIcon color={tenant?.mainColor} />
      </div>
      <input
        type="text"
        className={styles.input}
        placeholder="Digite o nome do produto"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onKeyUp={handleKeyUp}
        onChange={(e) => setSearchValue(e.target.value)}
      />
    </div>
  );
};
