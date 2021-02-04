import path from "path";
import { slash } from "gatsby-core-utils";

async function singlePostToPage({ graphql, actions }) {
  const BlogPage = path.resolve("src/pages/blog.js");
  const SinglePost = path.resolve("src/templates/SinglePost.js");

  const { data } = await graphql(`
    query {
      posts: allWpPost {
        totalCount
        nodes {
          slug
          uri
        }
      }
    }
  `);

  data.posts.nodes.forEach((post) => {
    actions.createPage({
      // Path for this page — required
      path: `${post.uri}`,
      component: slash(SinglePost),
      context: {
        // Add optional context data to be inserted
        // as props into the page component..
        // include slug so we can query a single post's data
        slug: post.slug,
      },
    });
  });

  const pageSize = parseInt(process.env.GATSBY_PAGE_SIZE);
  const pageCount = Math.ceil(data.posts.totalCount / pageSize);

  Array.from({ length: pageCount }).forEach((_, index) => {
    console.log(`Creating page ${index}`);

    actions.createPage({
      path: `/blog/${index + 1}`,
      component: slash(BlogPage),
      // This data is passed to the template when we create it
      context: {
        skip: index * pageSize,
        currentPage: index + 1,
        pageSize,
      },
    });
  });
}

async function interiorPages({ graphql, actions }) {
  const InteriorPage = path.resolve("src/templates/InteriorPage.js");

  const { data } = await graphql(`
    query {
      pages: allWpPage(
        filter: { slug: { nin: ["blog", "front-page", "contact-us"] } }
      ) {
        nodes {
          slug
          uri
        }
      }
    }
  `);

  data.pages.nodes.forEach((post) => {
    actions.createPage({
      // Path for this page — required
      path: `${post.uri}`,
      component: slash(InteriorPage),
      context: {
        // Add optional context data to be inserted
        // as props into the page component..
        // include slug so we can query a single post's data
        slug: post.slug,
      },
    });
  });
}

export async function createPages(params) {
  // Create pages dynamically
  // Wait for all promises to be resolved before finishing this function
  await Promise.all([singlePostToPage(params), interiorPages(params)]);
}
