import { useState, useEffect } from "react";

const useScroll = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const sensitivityThreshold = 15;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrolledDown = currentScrollY > lastScrollY + sensitivityThreshold;
      const scrolledUp = currentScrollY < lastScrollY - sensitivityThreshold;

      if (scrolledDown || scrolledUp) {
        setIsScrollingDown(scrolledDown);
      }

      setScrollY(currentScrollY);
      setIsAtTop(currentScrollY <= 100);
      setIsAtBottom(
        window.innerHeight + currentScrollY >= document.body.scrollHeight - 100
      );

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return { scrollY, isScrollingDown, isAtTop, isAtBottom };
};

export default useScroll;
