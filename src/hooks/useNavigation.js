import React from "react";
import { useNavigate } from "react-router-dom";

export default function useNavigation() {
  const navigate = useNavigate();

  const goTo = (path) => {
    navigate(path);
  };

  const goToAndState = (path, state) => {
    navigate(path, { state });
  };

  return {
    goTo,
    goToAndState,
  };
}
