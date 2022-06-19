import React, { useCallback } from "react";
import { cep } from "../Utils/Mascaras.js";

export const InputComMascara = ({ mask, ...props }) => {
  const handleKeyUp = useCallback((e) => {
    if (mask === "cepCliente") {
      return cep(e);
    }

    return <input {...props} onKeyUp={handleKeyUp} />;
  });
};
