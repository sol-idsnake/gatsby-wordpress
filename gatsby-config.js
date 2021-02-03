module.exports = {
  siteMetadata: {
    title: "gatsby-wordpress",
  },
  plugins: [
    {
      resolve: "gatsby-source-wordpress-experimental",
      options: {
        url: "http://localhost:8000/graphql",
        // url: "http://gatsbywp.216-70-96-51.jvv2-rfnp.accessdomain.com/graphql",
        // url: "http://gatsby-wordpress.local/graphql",
      },
    },
    "gatsby-plugin-sass",
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: "UA-xxxx-xxxx",
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: "gatsby-source-gravityforms",
      options: {
        // Base URL needs to include protocol (http/https)
        baseUrl: "http://localhost:8000",
        include: [1], // Array of form IDs. Will only import these forms.
        // exclude: [], // Array of form IDs. Will exclude these forms.
        // Gravity Forms API
        // allowSelfSigned: false,
        api: {
          key: "ck_2b7111be11a36b79a73ef41b037403d4243a9faf", // put in .env in production
          secret: "cs_6a1f2e5de5dfd3e611665df867cbcc5d24f0a413", // put in .env in production
        },
        // basicAuth: {
        //   username: "helle",
        //   password: "test",
        // },
      },
    },
  ],
};
