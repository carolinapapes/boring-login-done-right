import { useState } from "react";

export function usePasswordVisibility() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((value) => !value);
  };

  const passwordInputType = isPasswordVisible ? "text" : "password";

  const passwordToggleButton = {
    label: isPasswordVisible ? "Hide password" : "Show password",
    text: isPasswordVisible ? "Hide" : "Show",
    pressed: isPasswordVisible,
    onClick: togglePasswordVisibility,
  };

  return {
    passwordInputType,
    passwordToggleButton,
  };
}
