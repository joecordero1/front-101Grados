import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import ALink from '~/components/features/custom-link';

import { useCategories } from 'hooks';

function MainMenu() {
  const { categories } = useCategories();
  const pathname = useRouter().pathname;

  return (
    <nav className="menu category-menu">
      {categories.map((category) => (
        <div className="category category-icon">
          <ALink
            key={category.id}
            href={{
              pathname: '/shop',
              query: { category: 'office-computers' },
            }}
          >
            <figure className="categroy-media">
              {/* <i className="fas fa-car"></i> */}
              <i className={category.icon ? category.icon : 'fas fa-award'}></i>
            </figure>
            <div className="category-content">
              <h4 className="category-name">{category.name}</h4>
            </div>
          </ALink>
        </div>
      ))}

      <div className="category category-icon">
        <ALink href="/shop">
          <figure className="categroy-media">
            <i className="d-icon-category"></i>
          </figure>
          <div className="category-content">
            <h4 className="category-name">Todas las Categorías</h4>
          </div>
        </ALink>
      </div>
    </nav>
  );
}

export default MainMenu;
