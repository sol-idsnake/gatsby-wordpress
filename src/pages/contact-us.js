import React from "react";
import { graphql } from "gatsby";
import Img from "gatsby-image";

import "../styles/ContactUs.scss";

// https://github.com/robmarshall/gatsby-gravityforms-component

const ContactUs = ({ data }) => {
  const { contact } = data;
  const { form } = data;
  console.log(form);

  return (
    <>
      <section className="header-image">
        <Img
          fluid={contact.featuredImage.node.localFile.childImageSharp.fluid}
          alt="Gatsby Docs are awesome"
        />
      </section>

      <article>
        <h1>Contact Us</h1>
        <div></div>
      </article>
    </>
  );
};

// $slug: String - have to specify the type per GraphQL. The '!' means it's required
// 'post' is a name and can be anything
export const query = graphql`
  {
    contact: wpPage(slug: { eq: "contact-us" }) {
      title
      featuredImage {
        node {
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
    form: gfForm(slug: { eq: "contact-us" }) {
      id
      slug
      title
      is_active
      formFields {
        choices
        conditionalLogic
        content
        cssClass
        defaultValue
        description
        descriptionPlacement
        emailConfirmEnabled
        errorMessage
        id
        inputMaskValue
        isRequired
        label
        labelPlacement
        maxLength
        placeholder
        size
        type
        visibility
      }
    }
  }
`;

export default ContactUs;
