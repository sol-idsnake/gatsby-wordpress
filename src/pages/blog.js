import React from "react";
import { graphql, Link } from "gatsby";
import sanitizeHtml from "sanitize-html";
import sanitizeOptions from "../utils/sanitizeOptions";

import "../styles/blog.scss";

function Blog({ data }) {
  return (
    <ul className="archive-posts">
      {data.posts?.nodes.map((post) => (
        <li key={post.id}>
          <div>
            <Link to={post.uri}>
              <img
                srcSet={post.featuredImage.node.srcSet}
                alt={post.featuredImage.node.altText}
              />
            </Link>
          </div>
          <div>
            <h2>
              <Link to={post.uri}>{post.title}</Link>
            </h2>
            <time>{post.date}</time>
            <div
              className="excerpt"
              dangerouslySetInnerHTML={{
                __html: sanitizeHtml(
                  post.excerpt.substr(3, 150),
                  sanitizeOptions
                ),
              }}
            ></div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export const query = graphql`
  {
    posts: allWpPost(sort: { order: DESC, fields: date }) {
      nodes {
        id
        title
        excerpt
        uri
        date(formatString: "MMM Do, YYYY")
        featuredImage {
          node {
            altText
            srcSet
          }
        }
      }
    }
  }
`;

export default Blog;
