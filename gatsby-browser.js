import React from "react";
import Layout from "./src/components/Layout";

// Note: There is an equivalent hook in Gatsby’s SSR API. It is recommended to use both APIs together. https://www.gatsbyjs.com/docs/ssr-apis/#wrapPageElement
export function wrapPageElement({ element, props }) {
  return <Layout {...props}>{element}</Layout>;
}
