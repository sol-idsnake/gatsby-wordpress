import React from "react";
import { graphql, Link } from "gatsby";
import sanitizeHtml from "sanitize-html";
import sanitizeOptions from "../utils/sanitizeOptions";
import Pagination from "../components/Pagination";

import "../styles/blog.scss";

const Blog = ({ data, pageContext }) => {
  const { posts } = data;

  return (
    <>
      <ul className="archive-posts">
        {posts.nodes?.map((post) => (
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
      <Pagination
        base={"/blog"}
        currentPage={pageContext.currentPage || 1}
        pageSize={parseInt(process.env.GATSBY_PAGE_SIZE)}
        skip={pageContext.skip}
        totalCount={posts.totalCount}
      />
    </>
  );
};

export const query = graphql`
  query($skip: Int = 0, $pageSize: Int = 2) {
    posts: allWpPost(
      limit: $pageSize
      skip: $skip # sort: { order: DESC, fields: date }
    ) {
      totalCount
      nodes {
        date(formatString: "MMM Do, YYYY")
        excerpt
        id
        title
        uri
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
