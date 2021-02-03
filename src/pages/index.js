import React from "react";
import { graphql } from "gatsby";
import sanitizeHtml from "sanitize-html";
import sanitizeOptions from "../utils/sanitizeOptions";
import Img from "gatsby-image";

const FrontPage = ({ data }) => {
  const { front } = data;

  return (
    <>
      <Img
        // fluid={data.heroImage.childImageSharp.fluid}
        fixed={data.heroImage.childImageSharp.fixed}
        alt="Gatsby Docs are awesome"
      />
      <h1>{front.title}</h1>
      <section
        dangerouslySetInnerHTML={{
          __html: sanitizeHtml(front.content, sanitizeOptions),
        }}
      ></section>
    </>
  );
};

export const query = graphql`
  {
    front: wpPage(isFrontPage: { eq: true }) {
      id
      title
      content
    }
    heroImage: file(relativePath: { eq: "homepage-irrigation.jpg" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
        fixed(width: 300) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`;

export default FrontPage;
