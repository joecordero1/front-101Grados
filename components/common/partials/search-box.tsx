import React, { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useRouter } from "next/router";
import queryString from "query-string";

import ALink from "~/components/features/custom-link";

import { useApiAuth, useProgram, useLogs } from "~/hooks";
import { CatalogueItem, Page } from "~/utils/types";
import { LogType } from "~/utils/types/logType";

function SearchForm() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const { program } = useProgram();
  const api = useApiAuth();
  const [items, setItems] = useState<CatalogueItem[]>([]);
  const [timer, setTimer] = useState(null);
  const { dispatchLog } = useLogs();

  const getItems = async () => {
    const params = { toSearch: search.length > 2 && search, take: 50 };
    const query = queryString.stringify(params);
    const { data } = await api.get<Page<CatalogueItem>>(
      "/catalogue-items/store?" + query
    );
    setItems(data);
  };

  useEffect(() => {
    document.querySelector("body").addEventListener("click", onBodyClick);

    return () => {
      document.querySelector("body").removeEventListener("click", onBodyClick);
    };
  }, []);

  useEffect(() => {
    setSearch("");
  }, [router.query.slug]);

  useEffect(() => {
    if (search.length > 2) {
      getItems();
      if (timer) clearTimeout(timer);
      let timerId = setTimeout(() => {
        setTimer(null);
      }, 500);

      setTimer(timerId);
    }
  }, [search]);

  useEffect(() => {
    document.querySelector(".header-search.show-results") &&
      document
        .querySelector(".header-search.show-results")
        .classList.remove("show-results");
  }, [router.pathname]);

  function removeXSSAttacks(html) {
    const SCRIPT_REGEX = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;

    // Removing the <script> tags
    while (SCRIPT_REGEX.test(html)) {
      html = html.replace(SCRIPT_REGEX, "");
    }

    // Removing all events from tags...
    html = html.replace(/ on\w+="[^"]*"/g, "");

    return {
      __html: html,
    };
  }

  function matchEmphasize(name) {
    let regExp = new RegExp(search, "i");
    return name.replace(regExp, (match) => "<strong>" + match + "</strong>");
  }

  function onSearchClick(e) {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.parentNode.classList.toggle("show");
  }

  function onBodyClick(e) {
    if (e.target.closest(".header-search"))
      return (
        e.target.closest(".header-search").classList.contains("show-results") ||
        e.target.closest(".header-search").classList.add("show-results")
      );

    document.querySelector(".header-search.show") &&
      document.querySelector(".header-search.show").classList.remove("show");
    document.querySelector(".header-search.show-results") &&
      document
        .querySelector(".header-search.show-results")
        .classList.remove("show-results");
  }

  function onSearchChange(e) {
    setSearch(e.target.value);
  }

  function onSubmitSearchForm(e) {
    e.preventDefault();
    router.push({
      pathname: "/shop",
      query: {
        search: search,
      },
    });
    dispatchLog(LogType.SEARCH_AWARD, {
      searchText: search,
    });
  }

  return (
    <div className="header-search hs-expanded">
      <a
        href="#"
        className="search-toggle"
        role="button"
        onClick={onSearchClick}
      >
        <i className="icon-search-3"></i>
      </a>
      <form
        action="#"
        method="get"
        onSubmit={onSubmitSearchForm}
        className="input-wrapper"
      >
        <input
          type="text"
          className="form-control"
          name="search"
          autoComplete="off"
          value={search}
          onChange={onSearchChange}
          placeholder="Buscar..."
          disabled={!program.isStoreActive}
          required
        />

        <button className="btn btn-search" type="submit">
          <i className="d-icon-search"></i>
        </button>

        <div className="live-search-list bg-white">
          {search.length > 2 &&
            items &&
            items.map((product, index) => (
              <ALink
                href={`/award/${product.award.id}`}
                className="autocomplete-suggestion"
                key={`search-result-${index}`}
              >
                <LazyLoadImage
                  effect="opacity"
                  src={product.award.mainImage}
                  width={40}
                  height={40}
                  alt="product"
                />
                <div
                  className="search-name ml-4"
                  dangerouslySetInnerHTML={removeXSSAttacks(
                    matchEmphasize(
                      `${product.award.name} ${
                        product.award.brand.name &&
                        `|${product.award.brand.name}`
                      }${product.award.model && `|${product.award.model}`}`
                    )
                  )}
                ></div>
                <span className="search-price">
                  {product.points} {program.coinName}
                </span>
              </ALink>
            ))}
        </div>
      </form>
    </div>
  );
}

export default SearchForm;
