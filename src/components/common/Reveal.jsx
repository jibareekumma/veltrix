import useReveal from "../../hooks/useReveal";

const Reveal = function ({ children, delay = 0, className = "" }) {
  const [ref, isVisible] = useReveal();

  return (
    <div
      ref={ref}
      className={`reveal ${isVisible ? "is-visible" : ""} ${className}`}
      style={{ "--reveal-delay": `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default Reveal;
