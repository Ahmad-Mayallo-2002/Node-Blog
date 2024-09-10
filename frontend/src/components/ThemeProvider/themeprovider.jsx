import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../../redux/themeSlice.js";

export default function ThemeProvider({ children }) {
  const { theme } = useSelector((state) => state?.themeSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) dispatch(setTheme(storedTheme));
  }, [dispatch]);

  return (
    <>
      <div className={theme}>
        <div className="bg-white text-gray-700 dark:!text-gray-200 dark:bg-[rgb(16,23,42)]">
          {children}
        </div>
      </div>
    </>
  );
}
