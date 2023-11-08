import { useEffect } from "react";

import ALink from "~/components/features/custom-link";

import FooterSearchBox from "~/components/common/partials/footer-search-box";
import FooterAccountBox from "~/components/common/partials/footer-account-box";

export default function StickyFooter() {
  useEffect(() => {
    const stickyFooterHandler = (e) => {
      const top =
        document.querySelector(".page-content") instanceof HTMLElement
          ? (document.querySelector(".page-content") as HTMLElement).offsetTop +
            (document.querySelector("header") as HTMLElement)?.offsetHeight +
            100
          : 600;

      let stickyFooter = document.querySelector(
        ".sticky-footer.sticky-content"
      ) as HTMLElement;
      let height = stickyFooter ? stickyFooter.offsetHeight : 0;

      if (stickyFooter) {
        if (!stickyFooter.classList.contains("fixed")) {
          stickyFooter.classList.add("fixed");
          stickyFooter.style.marginBottom = "0";
        }

        let wrapper = document.querySelector(
          ".sticky-content-wrapper"
        ) as HTMLElement;

        if (!wrapper) {
          wrapper = document.createElement("div");
          wrapper.className = "sticky-content-wrapper";
          // Insert the wrapper before the stickyFooter's current parent
          if (stickyFooter.parentNode) {
            stickyFooter.parentNode.insertBefore(wrapper, stickyFooter);
          }
        }

        // Check if stickyFooter is already a child of the wrapper
        if (stickyFooter.parentNode !== wrapper) {
          // Insert the stickyFooter inside the wrapper
          wrapper.appendChild(stickyFooter);
          wrapper.style.height = height + "px";
        }
      }

      if (window.outerWidth > 767) {
        const contentWrapper = document.querySelector(
          ".sticky-content-wrapper"
        ) as HTMLElement;
        if (contentWrapper) {
          contentWrapper.style.height = "auto";
        }
      }

      tmp = e.currentTarget.scrollY;
    };
    let tmp = 0;
    window.addEventListener("scroll", stickyFooterHandler);

    return () => {
      window.removeEventListener("scroll", stickyFooterHandler);
    };
  }, []);

  return (
    <>
      <div className="sticky-footer sticky-content fix-bottom fixed">
        <ALink href="/" className="sticky-link active">
          <i className="d-icon-home"></i>
          <span>Inicio</span>
        </ALink>

        <ALink href="/shop" className="sticky-link">
          <i className="d-icon-shoppingbag"></i>
          <span>Premios</span>
        </ALink>

        <FooterSearchBox />

        <FooterAccountBox />
      </div>
    </>
  );
}
