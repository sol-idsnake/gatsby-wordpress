import React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import { flatListToHierarchical } from "../utils/flatListToHierarchical";

import "../styles/header.scss";

const Header = () => {
  const { menu } = useStaticQuery(menuQuery);

  const routes = flatListToHierarchical(menu.menuItems.nodes);

  return (
    <header>
      <section className="logo">
        <h3>Header</h3>
      </section>
      <nav>
        <ul className="parent-menu">
          {routes.map((parent) => (
            <li key={parent.id}>
              <Link to={parent.path}>{parent.label}</Link>
              <ul className="sub-menu">
                {parent.children &&
                  parent.children.map((child) => (
                    <li key={child.id}>
                      <Link to={child.path}>{child.label}</Link>
                    </li>
                  ))}
              </ul>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

const menuQuery = graphql`
  {
    menu: wpMenu(slug: { eq: "header-menu" }) {
      menuItems {
        nodes {
          id
          path
          parentId
          label
        }
      }
    }
  }
`;

export default Header;
