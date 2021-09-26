import React from "react";

// Components
import Navbar from "../Components/Navbar";

function HomeLayout({ children }) {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 lg:px-20">{children}</div>
    </div>
  );
}

export default HomeLayout;
