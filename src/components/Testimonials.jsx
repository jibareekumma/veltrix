


import ImagePlaceholder from "./ImagePlaceholder/ImagePlaceholder";
import "../css/Testimonials.css";

const testimonials = [
  { id: 1, name: "Jonah Mercer", quote: "The most comfortable pair I have run in all year." },
  { id: 2, name: "Ada Okafor", quote: "Fits true to size and looks even better in person." },
  { id: 3, name: "Leo Martins", quote: "Durable, stylish, and worth every naira spent." },
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
              <ImagePlaceholder className="testimonials__avatar" label="User" ratio="1/1" />
              <h3 className="testimonials__name">{testimonial.name}</h3>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Testimonials;