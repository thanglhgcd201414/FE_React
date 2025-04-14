import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface IProps {
  children: React.ReactNode;
}

const ScrollToTop = ({children}: IProps) => {
  const location = useLocation();
  useEffect(() => {
    console.log("ScrollToTop");
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [location.pathname]);

  return children || null;
};

export default ScrollToTop;
