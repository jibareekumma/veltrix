import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollManager = function () {
  const { pathname, hash } = useLocation();

  useEffect(function () {
    if (hash) {
      const target = document.getElementById(hash.slice(1));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, hash]);

  return null;
};

export default ScrollManager;
