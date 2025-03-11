import React from "react";

type ThemeType = "theme-light" | "dark" | "system";

interface ThemeContextType {
  theme: ThemeType;
  setThemeState: (theme: ThemeType) => void;
};

const ThemeContext = React.createContext<ThemeContextType | null>(null);

export default ThemeContext;

export const useTheme = () => {
  return React.useContext(ThemeContext) as ThemeContextType;
};

export const ThemeProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [theme, setThemeState] = React.useState<ThemeType>("theme-light");

  React.useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    setThemeState(isDarkMode ? "dark" : "theme-light");
  }, []);

  React.useEffect(() => {
    console.info("theme is", theme);
    const isDark =
      theme === "dark" ||
      (theme === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.classList[isDark ? "add" : "remove"]("dark");
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setThemeState,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
