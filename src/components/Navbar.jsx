import React from "react";
import ThemeToggle from "./ThemeToggle";

function Navbar(props) {
  return (
    <header className="bg-base-300  border-b border-base-content/10 ">
      <div className="mx-auto max-w-6xl  p-4  px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between ">
          <h1 className="text-3xl font-bold text-primary font-mono tracking-tight">
            Gemini
          </h1>
          <div className="items-center flex">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
