import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";

import withApollo from "~/server/apollo";

import { useLogs } from "hooks";
import { LogType } from "~/utils/types/logType";
import styles from "./footerSearchBoxStyles.module.scss";
import { IconButton, TextField } from "@mui/material";

function SearchForm() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  // const [ searchProducts, { data } ] = useLazyQuery( GET_PRODUCTS );
  const [timer, setTimer] = useState(null);
  const { dispatchLog } = useLogs();

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
      if (timer) clearTimeout(timer);
      let timerId = setTimeout(() => {
        // searchProducts( { variables: { search: search } } );
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
    <div className="header-search hs-toggle dir-up">
      <a
        href="#"
        className="search-toggle sticky-link"
        role="button"
        onClick={onSearchClick}
      >
        <i className="d-icon-search"></i>
        <span>Buscar</span>
      </a>

      <form
        action="#"
        method="get"
        onSubmit={onSubmitSearchForm}
        className="input-wrapper"
        style={{
          marginRight: "-110px",
          marginLeft: "50px",
          width: "400px",
        }}
      >
        <div className={styles.merlinIconBox}>
          <img
            src={`https://storage.googleapis.com/lala4/store/files/fav-merlin-1-1721681703043.png`}
            alt="Merlin"
          />
        </div>
        <TextField
          variant="standard"
          fullWidth
          name="search"
          autoComplete="off"
          value={search}
          onChange={onSearchChange}
          placeholder="Mi nombre es Merlin, ¿Qué
          necesitas?"
          required
          sx={{
            "& .MuiInputBase-input": {
              fontSize: "1.5rem",
              padding: "10px 0",
            },
            "& .MuiInputBase-root:before": {
              borderBottom: "2px solid #ccc",
            },
            "& .MuiInputBase-root:after": {
              borderBottom: "2px solid #3f51b5",
            },
            "& .MuiInputBase-input::placeholder": {
              fontSize: "1.2rem",
              color: "#000",
            },
          }}
        />

        <IconButton className="" type="submit">
          <AutoFixHighIcon />
        </IconButton>

        <div className="live-search-list bg-white">
          {/* { search.length > 2 && data && data.products.data.map( ( product, index ) => (
                        <ALink href={ `/product/default/${ product.slug }` } className="autocomplete-suggestion" key={ `search-result-${ index }` }>
                            <LazyLoadImage effect="opacity" src={ process.env.NEXT_PUBLIC_ASSET_URI + product.pictures[ 0 ].url } width={ 40 } height={ 40 } alt="product" />
                            <div className="search-name" dangerouslySetInnerHTML={ removeXSSAttacks( matchEmphasize( product.name ) ) }></div>

                            <span className="search-price">
                                {
                                    product.price[ 0 ] !== product.price[ 1 ] ?
                                        product.variants.length === 0 ?
                                            <>
                                                <span className="new-price mr-1">${ toDecimal( product.price[ 0 ] ) }</span>
                                                <span className="old-price">${ toDecimal( product.price[ 1 ] ) }</span>
                                            </>
                                            :
                                            < span className="new-price">${ toDecimal( product.price[ 0 ] ) } – ${ toDecimal( product.price[ 1 ] ) }</span>
                                        : <span className="new-price">${ toDecimal( product.price[ 0 ] ) }</span>
                                }
                            </span>
                        </ALink>
                    ) )
                    } */}
        </div>
      </form>
    </div>
  );
}

export default withApollo({ ssr: typeof window === "undefined" })(SearchForm);
