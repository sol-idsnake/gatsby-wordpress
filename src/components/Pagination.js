import { Link } from "gatsby";
import React from "react";

import "../styles/pagination.scss";

const Pagination = ({ pageSize, totalCount, currentPage, skip, base }) => {
  const totalPages = Math.ceil(totalCount / pageSize);
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;
  const hasNextPage = nextPage <= totalPages;
  const hasPrevPage = prevPage >= 1;

  return (
    <>
      <div className="pagination">
        <Link disabled={!hasPrevPage} to={`${base}/${prevPage}`}>
          &#8592; Prev
        </Link>
        {Array.from({ length: totalPages }).map((_, i) => (
          <Link
            className={currentPage === 1 && i === 0 ? "current" : ""}
            to={`${base}/${i > 0 ? i + 1 : ""}`}
            key={`page${i}`}
          >
            {i + 1}
          </Link>
        ))}
        <Link disabled={!hasNextPage} to={`${base}/${nextPage}`}>
          Next &#8594;
        </Link>
      </div>
    </>
  );
};

export default Pagination;
