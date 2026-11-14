import Reveal from "../common/Reveal";
import Rating from "../shop/Rating";
import "../../styles/components/Testimonials.scss";

import person1 from "/images/testimonials/person1.jpeg";
import person2 from "/images/testimonials/person2.jpeg";
import person3 from "/images/testimonials/person3.jpeg";

const testimonials = [
  {
    id: 1,
    name: "Jonah Mercer",
    quote: "The most comfortable pair I have run in all year.",
    image: person1,
  },
  {
    id: 2,
    name: "Martins Evans",
    quote: "Fits true to size and looks even better in person.",
    image: person2,
  },
  {
    id: 3,
    name: "Christabel Jayson",
    quote: "Durable, stylish, and worth every cent spent.",
    image: person3,
  },
];

const Testimonials = function () {
  return (
    <section className="testimonials">
      <h2 className="section-title section-title--center">What Our Customers Say</h2>
      <div className="testimonials__list">
        {testimonials.map(function (testimonial, index) {
          return (
            <Reveal key={testimonial.id} delay={index * 100}>
              <figure className="testimonials__card">
                <Rating value={5} />
                <blockquote className="testimonials__text">{testimonial.quote}</blockquote>
                <figcaption className="testimonials__author">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    loading="lazy"
                    className="testimonials__avatar"
                  />
                  <span>
                    <strong className="testimonials__name">{testimonial.name}</strong>
                    <small className="testimonials__role">Verified buyer</small>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
};

export default Testimonials;
