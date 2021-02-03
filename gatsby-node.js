import path from "path";
import { slash } from "gatsby-core-utils";

async function singlePostToPage({ graphql, actions }) {
  const SinglePost = path.resolve("src/templates/SinglePost.js");

  const { data } = await graphql(`
    query {
      posts: allWpPost {
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
