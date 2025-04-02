"use client";

import React, { useState } from "react";
import MenuPanel from "./MenuPanel";
import MenuButton from "./MenuButton";

const NavBar = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="relative">
      <MenuButton open={open} onClick={() => setOpen(!open)} />
      <MenuPanel open={open} onClose={() => setOpen(false)} />
    </div>
  );
};

export default NavBar;
