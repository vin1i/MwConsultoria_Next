// src/utils/utils.js
export const normalizeValues = (value) => {
    if (!value) return 0;
    if (typeof value === "string") {
      return parseFloat(
        value.replace("R$", "").replace(/\./g, "").replace(",", ".")
      );
    }
    return value;
  };
  