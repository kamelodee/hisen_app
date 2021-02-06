import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import includes from "lodash/includes";

const ScrollReset = ({ setShowHeader }) => {
  const router = useLocation();
  useEffect(() => {
    let browsePagesList = ["pf"];
    let exactUrl = router.pathname.split("/");
    if (includes(browsePagesList, exactUrl[1])) {
      setShowHeader(false);
    } else {
      setShowHeader(true);
    }
    const anchor = document.querySelector("#App");
    anchor.scrollTo({ top: 0, behavior: "smooth" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.pathname]);

  return null;
};

export default ScrollReset;
