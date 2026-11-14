import "../../styles/components/Rating.scss";

const Rating = function ({ value }) {
  return (
    <span
      className="rating"
      style={{ "--rating": value }}
      role="img"
      aria-label={`${value} out of 5 stars`}
    ></span>
  );
};

export default Rating;
