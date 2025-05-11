import React, { FC } from "react";
import { useRouter } from "next/router";

import ALink from "~/components/features/custom-link";

import { PaginationMetaDto } from "../../utils/types/common";

type Props = {
  meta: PaginationMetaDto;
  handlePageChange: (metaProps: PaginationMetaDto) => void;
};

const Pagination: FC<Props> = (props) => {
  const { meta, handlePageChange } = props;
  const router = useRouter();
  const query = router.query;
  const currentPage = query.page ? parseInt(query.page.toString()) : 1;

  const pages = [];
  // Fill in the pages array with some middle pages, and the first and last pages.
  if (meta.pageCount <= 7) {
    for (let i = 1; i <= meta.pageCount; i++) {
      pages.push(i);
    }
  } else {
    if (currentPage <= 4) {
      for (let i = 1; i <= 5; i++) {
        pages.push(i);
      }
      pages.push("...");
      pages.push(meta.pageCount);
    } else if (currentPage >= meta.pageCount - 3) {
      pages.push(1);
      pages.push("...");
      for (let i = meta.pageCount - 4; i <= meta.pageCount; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      pages.push("...");
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        pages.push(i);
      }
      pages.push("...");
      pages.push(meta.pageCount);
    }
  }

  return (
    <>
      {meta.pageCount > 1 && (
        <ul className="pagination">
          <li className={`page-item ${meta.page === 1 ? "disabled" : ""}`}>
            <ALink
              className="page-link page-link-prev"
              href={
                meta.page > 1
                  ? {
                      pathname: router.pathname,
                      query: { ...query, page: meta.page - 1 },
                    }
                  : "#"
              }
              scroll={false}
            >
              <i className="d-icon-arrow-left"></i>
            </ALink>
          </li>

          {pages.map((page, index) => (
            <li
              className={`page-item ${page === currentPage ? "active" : ""}`}
              key={index}
            >
              <ALink
                className="page-link"
                href={
                  page === currentPage
                    ? "#"
                    : {
                        pathname: router.pathname,
                        query: { ...query, page },
                      }
                }
                scroll={false}
                onClick={() => handlePageChange({ page })}
              >
                {page}
                {page === currentPage && (
                  <span className="sr-only">(current)</span>
                )}
              </ALink>
            </li>
          ))}

          {/* {pages.map((page, index) =>
            index === 1 ? (
              <React.Fragment key={`page-${index}`}>
                <span className="page-item dots">...</span>
                <li
                  className={`page-item ${
                    page === currentPage ? 'active' : ''
                  }`}
                >
                  <ALink
                    className="page-link"
                    href={
                      page === currentPage
                        ? '#'
                        : {
                            pathname: router.pathname,
                            query: { ...query, page },
                          }
                    }
                    scroll={false}
                  >
                    {page}
                    {page === currentPage && (
                      <span className="sr-only">(current)</span>
                    )}
                  </ALink>
                </li>
              </React.Fragment>
            ) : index === pages.length - 2 && page + 1 < meta.pageCount ? (
              <React.Fragment key={`page-${index}`}>
                <li
                  className={`page-item ${
                    page === currentPage ? 'active' : ''
                  }`}
                >
                  <ALink
                    className="page-link"
                    href={
                      page === currentPage
                        ? '#'
                        : {
                            pathname: router.pathname,
                            query: { ...query, page },
                          }
                    }
                    scroll={false}
                  >
                    {page}
                    {page === currentPage && (
                      <span className="sr-only">(current)</span>
                    )}
                  </ALink>
                </li>
                <span className="page-item dots">...</span>
              </React.Fragment>
            ) : (
              <li
                className={`page-item ${page === currentPage ? 'active' : ''}`}
                key={`page-${index}`}
              >
                <ALink
                  className="page-link"
                  href={
                    page === currentPage
                      ? '#'
                      : {
                          pathname: router.pathname,
                          query: { ...query, page },
                        }
                  }
                  scroll={false}
                >
                  {page}
                  {page === currentPage && (
                    <span className="sr-only">(current)</span>
                  )}
                </ALink>
              </li>
            )
          )} */}

          <li
            className={`page-item ${
              meta.page > meta.pageCount - 1 ? "disabled" : ""
            }`}
          >
            <ALink
              className="page-link page-link-next"
              href={
                meta.page < meta.pageCount
                  ? {
                      pathname: router.pathname,
                      query: { ...query, page: meta.page + 1 },
                    }
                  : "#"
              }
              scroll={false}
            >
              <i className="d-icon-arrow-right"></i>
            </ALink>
          </li>
        </ul>
      )}
    </>
  );
};

export default React.memo(Pagination);
