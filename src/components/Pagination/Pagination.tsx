import classNames from 'classnames';
import React from 'react';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (value: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const numOfPages = Math.ceil(total / perPage);

  function arrayNumOfPages(value: number) {
    const pages = [];

    for (let i = 1; i <= value; i++) {
      pages.push(i);
    }

    return pages;
  }

  const pages = arrayNumOfPages(numOfPages);

  return (
    <ul className="pagination">
      <li
        className={classNames('page-item', {
          disabled: currentPage === pages[0],
        })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === pages[0]}
          onClick={event => {
            event.preventDefault();
            if (currentPage !== pages[0]) {
              onPageChange(currentPage - 1);
            }
          }}
        >
          «
        </a>
      </li>

      {pages.map(page => {
        return (
          <li
            className={classNames('page-item', {
              active: page === currentPage,
            })}
            key={page}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${page}`}
              onClick={() => {
                if (page !== currentPage) {
                  onPageChange(page);
                }
              }}
            >
              {page}
            </a>
          </li>
        );
      })}
      <li
        className={classNames('page-item', {
          disabled: currentPage === pages[pages.length - 1],
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === pages[pages.length - 1]}
          onClick={event => {
            event.preventDefault();
            if (currentPage !== pages[pages.length - 1]) {
              onPageChange(currentPage + 1);
            }
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};
