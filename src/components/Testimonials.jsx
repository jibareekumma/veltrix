


import ImagePlaceholder from "./ImagePlaceholder/ImagePlaceholder";
import "../css/Testimonials.css";

import person1 from "/images/testimonials/person1.jpeg"
import person2 from "/images/testimonials/person2.jpeg"
import person3 from "/images/testimonials/person3.jpeg"

const testimonials = [
  { id: 1, name: "Jonah Mercer", 
    quote: "The most comfortable pair I have run in all year.",
  image: person1 },
  { id: 2, name: "Martins Evans", 
    quote: "Fits true to size and looks even better in person.",
   image: person2 },
  { id: 3, name: "Christabel Jayson", 
    quote: "Durable, stylish, and worth every cent spent.",
  image: person3  },
];

const Testimonials = function () {
  return (
    <section className="testimonials">
      <h2 className="section-title">What Our Customers Say</h2>
      <div className="testimonials__list">
        {testimonials.map(function (testimonial) {
          return (
            <div key={testimonial.id} className="testimonials__card">
              <span className="testimonials__quote-mark">“</span>
              <p className="testimonials__text">{testimonial.quote}</p>
              <img src = {testimonial.image} alt= {testimonial.name} 
              loading="lazy" className="testimonials__avatar" />
              <h3 className="testimonials__name">{testimonial.name}</h3>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Testimonials;