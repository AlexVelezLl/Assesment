import React from "react";

import BPLogo from "../assets/BPLogo.svg";

const Header = () => {
  return (
    <header
      className="bp-full-width bp-flx-hc"
      role="banner"
    >
      <img
        src={BPLogo} alt="BP Logo"
        width="180rem"
      />
    </header>
  );
};

export default Header;
