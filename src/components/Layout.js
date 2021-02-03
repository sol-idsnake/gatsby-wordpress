import React from "react";
import Header from "./Header";

import "normalize.css";
import "../styles/global.scss";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <footer>
        <h5>footer</h5>
        <div>{new Date().getFullYear()}</div>
      </footer>
      {/* <Header siteTitle={data.site.siteMetadata?.title || `Title`} /> */}
    </>
  );
};

export default Layout;
