import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import ALink from "~/components/features/custom-link";
import filterData from "~/utils/data/shop";
import { scrollTopHandler } from "~/utils";

import { useCategories } from "hooks/useCategories";

function SidebarFilterThree() {
  const router = useRouter();
  const { categories } = useCategories({
    take: null,
    random: false,
  });
  const [isFirst, setFirst] = useState(true);
  const query = router.query;
  const prices = [
    { min: "0", max: "50" },
    { min: "50", max: "100" },
    { min: "100", max: "200" },
    { min: "200", max: "" },
  ];

  useEffect(() => {
    window.addEventListener("resize", resizeHandler, false);
    document.querySelector("body").addEventListener("click", onBodyClick);

    return () => {
      window.removeEventListener("resize", resizeHandler);
      document.querySelector("body").removeEventListener("click", onBodyClick);
    };
  }, []);

  useEffect(() => {
    if (isFirst) {
      setFirst(false);
    } else {
      scrollTopHandler();
    }
  }, [query]);

  const containsAttrInUrl = (type, value) => {
    // @ts-ignore
    const currentQueries = query[type] ? query[type].split(",") : [];
    if (type === "min_price" || type === "max_price") {
      return (
        currentQueries &&
        ((value === "" && currentQueries.length === 0) ||
          currentQueries.includes(value))
      );
    } else {
      return currentQueries && currentQueries.includes(value);
    }
  };

  const getUrlForAttrs = (type, value) => {
    // @ts-ignore
    let currentQueries = query[type] ? query[type].split(",") : [];
    if (type === "min_price" || type === "max_price") {
      currentQueries =
        currentQueries.length > 0 && currentQueries.includes(value)
          ? []
          : [value];
    } else {
      currentQueries = containsAttrInUrl(type, value)
        ? currentQueries.filter((item) => item !== value)
        : [...currentQueries, value];
    }
    return currentQueries.join(",");
  };

  const selectOptionHandler = function (e) {
    e.preventDefault();
    e.currentTarget
      .closest(".toolbox-item.select-menu")
      .classList.toggle("opened");
  };

  function onBodyClick(e) {
    e.target.closest(".select-menu.opened") ||
      (document.querySelector(".select-menu.opened") &&
        document
          .querySelector(".select-menu.opened")
          .classList.remove("opened"));
  }

  const hideSidebar = () => {
    document.querySelector("body").classList.remove("sidebar-active");
  };

  const resizeHandler = () => {
    document.querySelector("body").classList.remove("sidebar-active");
  };

  const selectFilterHandler = (e) => {
    setTimeout(() => {
      if (document.querySelector(".select-items").children.length > 1) {
        document
          .querySelector(".select-items")
          .setAttribute(
            "style",
            "visibility: visible; opacity: 1; height: auto; margin-top: 2px; margin-bottom: 1.8rem"
          );
      } else {
        document.querySelector(".select-items").setAttribute("style", "");
      }
    }, 100);
  };

  return (
    <aside className="sidebar shop-sidebar sidebar-fixed">
      <ALink className="sidebar-close" href="#" onClick={hideSidebar}>
        <i className="d-icon-times"></i>
      </ALink>

      <div className="sidebar-content toolbox-left">
        <div className="toolbox-item select-menu">
          <a
            className="select-menu-toggle"
            href="#"
            onClick={selectOptionHandler}
          >
            Categorías
          </a>

          <ul className="filter-items">
            {categories.map((category, index) => (
              <li
                className={
                  containsAttrInUrl("category", `${category.id}`)
                    ? "active"
                    : ""
                }
                key={category.id}
                onClick={selectFilterHandler}
              >
                <ALink
                  href={{
                    pathname: router.pathname,
                    query: {
                      ...query,
                      page: 1,
                      category: containsAttrInUrl("category", `${category.id}`)
                        ? getUrlForAttrs("category", `${category.id}`)
                        : getUrlForAttrs("category", `${category.id}`),
                    },
                  }}
                  scroll={false}
                >
                  {category.name}
                </ALink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
}

export default SidebarFilterThree;
