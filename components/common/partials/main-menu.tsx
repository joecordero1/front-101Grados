import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import ALink from "~/components/features/custom-link";

import { useCategories } from "hooks";

function MainMenu() {
  const { categories } = useCategories({
    take: 10,
    random: true,
  });
  const pathname = useRouter().pathname;

  return (
    <nav className="menu category-menu">
      <div className="category category-icon">
        <ALink href="/shop">
          <figure className="categroy-media">
            <i
              className="d-icon-category"
              style={{
                color: "#2D2D2D",

                height: 35,
                paddingTop: 20,
              }}
            ></i>
          </figure>
          <div className="category-content">
            <h4
              className="category-name"
              style={{
                color: "#2D2D2D",
              }}
            >
              Todas
            </h4>
          </div>
        </ALink>
      </div>
      {categories.map((category) => (
        <div className="category category-icon" key={category.id}>
          <ALink
            key={category.id}
            href={{
              pathname: "/shop",
              query: { category: category.id },
            }}
          >
            {category.image ? (
              <figure className="categroy-media">
                <img
                  src={category.image}
                  alt={category.name}
                  style={{
                    width: 50,
                    height: 50,
                    paddingBottom: 5,
                    backgroundColor: "transparent",
                  }}
                />
              </figure>
            ) : (
              <figure className="categroy-media">
                {/* <i className="fas fa-car"></i> */}
                <i
                  className={category.icon ? category.icon : "fas fa-award"}
                  style={{
                    color: "#2D2D2D",
                    paddingTop: 25,
                  }}
                ></i>
              </figure>
            )}

            <div className="category-content">
              <h4
                className="category-name"
                style={{
                  color: "#2D2D2D",
                }}
              >
                {category.name}
              </h4>
            </div>
          </ALink>
        </div>
      ))}
    </nav>
  );
}

export default MainMenu;
