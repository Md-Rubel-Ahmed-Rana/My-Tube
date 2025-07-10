/* eslint-disable @typescript-eslint/no-explicit-any */
export const reactSelectStyles = (theme: string) => {
  return {
    control: (base: any) => ({
      ...base,
      backgroundColor:
        theme === "light"
          ? "oklch(96.7% 0.003 264.542)"
          : "oklch(37.3% 0.034 259.733)",
      borderColor:
        theme === "light"
          ? "oklch(92.8% 0.006 264.531)"
          : "oklch(44.6% 0.03 256.802)",
      boxShadow: "none",
    }),
    menu: (base: any) => ({
      ...base,
      backgroundColor:
        theme === "light"
          ? "oklch(96.7% 0.003 264.542)"
          : "oklch(37.3% 0.034 259.733)",
      zIndex: 20,
    }),
    option: (base: any) => ({
      ...base,
      backgroundColor:
        theme === "light"
          ? "oklch(96.7% 0.003 264.542)"
          : "oklch(37.3% 0.034 259.733)",
      color: theme === "light" ? "black" : "white",
    }),
  };
};
