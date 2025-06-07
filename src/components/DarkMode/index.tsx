import { useEffect, useState } from "react";
import { Toggle } from "../ui/toggle";

const DarkMode = () => {
  // Menyimpan status darkMode dengan tipe boolean
  const [darkMode, setDarkMode] =
    useState <
    boolean >
    (() => {
      return localStorage.getItem("darkMode") === "true";
    });

  // Fungsi untuk menangani perubahan dark mode
  const handleDarkMode = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  };

  // Menggunakan useEffect untuk mengupdate status darkMode pada document dan localStorage
  useEffect(() => {
    if (darkMode) {
      document.querySelector("html")?.classList.add("dark");
    } else {
      document.querySelector("html")?.classList.remove("dark");
    }
    localStorage.setItem("darkMode", String(darkMode)); // Menyimpan status dalam localStorage
  }, [darkMode]);

  return (
    <div className="dark_mode">
      <Toggle
        onClick={handleDarkMode}
        checked={darkMode}
        className="toggle-button rounded-full shadow-inner dark:bg-white bg-gray-300 hover:bg-gray-500 transition hover:shadow-lg"
      >
        {darkMode ? (
          <img src="/svg/Sun.svg" alt="toggle.icon" />
        ) : (
          <img src="/svg/Moon.svg" alt="toggle.icon" />
        )}
      </Toggle>
    </div>
  );
};

export default DarkMode;
