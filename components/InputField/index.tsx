import styles from "./styles.module.css";
import EyeOff from "./EyeOff.svg";
import EyeOn from "./EyeOn.svg";
import { useState } from "react";

type Props = {
  color: string;
  placeholder: string;
  value: string;
  onChange: (newValue: string) => void;
  password?: boolean;
};

export const InputField = ({
  color,
  placeholder,
  value,
  onChange,
  password,
}: Props) => {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div
      className={styles.container}
      style={{
        borderColor: focused ? color : "#F9F9FB",
        backgroundColor: focused ? "#FFF" : "#F9F9FB",
      }}
    >
      <input
        type={password ? (showPassword ? "text" : "password") : "text"}
        className={styles.input}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      <div
        className={styles.showPassword}
        onClick={() => setShowPassword(!showPassword)}
      >
        {password && (
          <>
            {showPassword && <EyeOn color="#CCC" />}
            {!showPassword && <EyeOff color="#CCC" />}
          </>
        )}
      </div>
    </div>
  );
};
