import React from "react";
import { graphql } from "gatsby";
import Img from "gatsby-image";
import sanitizeHtml from "sanitize-html";
import sanitizeOptions from "../utils/sanitizeOptions";

import "../styles/singlePost.scss";

const SinglePost = ({ data }) => {
  const { post } = data;

  return (
    <>
      <section className="header-image">
        <Img
          fluid={post.featuredImage.node.localFile.childImageSharp.fluid}
          alt="Gatsby Docs are awesome"
        />
      </section>
      <article>
        <h1>{post.title}</h1>
        <time>{post.date}</time>
        <span>
          By {post.author.node.firstName} {post.author.node.lastName}
        </span>
        <main
          dangerouslySetInnerHTML={{
            __html: sanitizeHtml(post.content, sanitizeOptions),
          }}
        ></main>
      </article>
    </>
  );
};

// $slug: String - have to specify the type per GraphQL. The '!' means it's required
// 'post' is a name and can be anything
export const query = graphql`
  query($slug: String!) {
    post: wpPost(slug: { eq: $slug }) {
      title
      date(formatString: "MMM Do, YYYY")
      author {
        node {
          firstName
          lastName
        }
      }
      content
      featuredImage {
        node {
          id
          localFile {
            childImageSharp {
              fluid(maxWidth: 1920, maxHeight: 500) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`;

export default SinglePost;
