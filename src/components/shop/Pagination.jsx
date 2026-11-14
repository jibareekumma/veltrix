import "../../styles/components/Pagination.scss";

const Pagination = function ({ page, pageCount, onChange }) {
  if (pageCount <= 1) {
    return null;
  }

  const goToPrevious = function () {
    onChange(page === 0 ? pageCount - 1 : page - 1);
  };

  const goToNext = function () {
    onChange((page + 1) % pageCount);
  };

  return (
    <nav className="pagination" aria-label="Pagination">
      <button type="button" className="pagination__btn" onClick={goToPrevious} aria-label="Previous page">
        &#8592;
      </button>
      {Array.from({ length: pageCount }).map(function (_, index) {
        return (
          <button
            type="button"
            key={index}
            className={`pagination__btn ${index === page ? "pagination__btn--active" : ""}`}
            onClick={function () {
              onChange(index);
            }}
            aria-current={index === page ? "page" : undefined}
          >
            {index + 1}
          </button>
        );
      })}
      <button type="button" className="pagination__btn" onClick={goToNext} aria-label="Next page">
        &#8594;
      </button>
    </nav>
  );
};

export default Pagination;
