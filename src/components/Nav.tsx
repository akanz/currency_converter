import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="">
      <Link to="/">
        <h2> Currency converter</h2>
      </Link>

      <Link to="allrates">
        <button>All rates</button>
      </Link>
    </nav>
  );
};

export default Nav;
