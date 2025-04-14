import { ArrowUpOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import { useEffect, useState } from "react";
import Visibility from "./visibility";

export default function ScrollToTopBtn() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 20) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <Visibility visibility={isVisible}>
      <Tooltip title="Nhấn để trở lại đầu trang">
        <Button
          variant="filled"
          onClick={scrollToTop}
          className="h-10 w-10 rounded-full fixed z-20 sm:right-10 right-5 sm:bottom-14 bottom-20 !bg-red-600 !text-white !border-[white]"
        >
          <ArrowUpOutlined />
        </Button>
      </Tooltip>
    </Visibility>
  );
}
