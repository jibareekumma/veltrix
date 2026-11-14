import { useEffect, useRef, useState } from "react";

const supportsObserver = function () {
  return typeof window !== "undefined" && "IntersectionObserver" in window;
};

const useReveal = function (threshold = 0.15) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(function () {
    return !supportsObserver();
  });

  useEffect(function () {
    const node = ref.current;
    if (!node || !supportsObserver()) {
      return;
    }

    const observer = new IntersectionObserver(
      function (entries) {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(node);

    return function () {
      observer.disconnect();
    };
  }, [threshold]);

  return [ref, isVisible];
};

export default useReveal;
