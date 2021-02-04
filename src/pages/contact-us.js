import React from "react";
import { graphql } from "gatsby";
import Img from "gatsby-image";
import useContactForm from "../utils/useContactForm";

import "../styles/ContactUs.scss";

// https://github.com/robmarshall/gatsby-gravityforms-component

const ContactUs = ({ data }) => {
  const { contact } = data;
  const { form } = data;

  const { values, updateValue } = useContactForm({
    firstName: "",
    lastName: "",
    email: "",
  });

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
        <div className="gform">
          <div>
            <label htmlFor={form.formFields[0].label}>
              {form.formFields[0].label}
            </label>
            <input
              type={form.formFields[0].type}
              required={form.formFields[0].isRequired}
              name={form.formFields[0].label}
              placeholder={form.formFields[0].placeholder}
            />
          </div>
          <div>
            <label htmlFor={form.formFields[1].label}>
              {form.formFields[1].label}
            </label>
            <input
              type={form.formFields[1].type}
              required={form.formFields[1].isRequired}
              name={form.formFields[1].label}
              placeholder={form.formFields[1].placeholder}
            />
          </div>
          <div>
            <label htmlFor={form.formFields[2].label}>
              {form.formFields[2].label}
            </label>
            <input
              type={form.formFields[2].type}
              required={form.formFields[2].isRequired}
              name={form.formFields[2].label}
              placeholder={form.formFields[2].placeholder}
            />
          </div>
        </div>
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
