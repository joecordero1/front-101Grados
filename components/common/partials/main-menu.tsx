import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import ALink from '~/components/features/custom-link';

import { useApiAuth } from 'hooks/useApiAuth';
import { Category } from 'utils/types';
import { SubcategoriesList } from '../../../utils/types/award';

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
              {/* <i className="d-icon-desktop"></i> */}
              <i className="fab fa-smile"></i>
            </figure>
            <div className="category-content">
              <h4 className="category-name">{category.name}</h4>
            </div>
          </ALink>
        </div>
      ))}
      {/* <div className="category category-icon">
        <ALink
          href={{ pathname: '/shop', query: { category: 'office-computers' } }}
        >
          <figure className="categroy-media">
            <i className="d-icon-desktop"></i>
          </figure>
          <div className="category-content">
            <h4 className="category-name">Office Computers</h4>
          </div>
        </ALink>
      </div>
      <div className="category category-icon">
        <ALink href={{ pathname: '/shop', query: { category: 'women-s-bag' } }}>
          <figure className="categroy-media">
            <i className="d-icon-handbag"></i>
          </figure>
          <div className="category-content">
            <h4 className="category-name">Women’s Bag</h4>
          </div>
        </ALink>
      </div>
      <div className="category category-icon">
        <ALink
          href={{ pathname: '/shop', query: { category: 'men-s-clothings' } }}
        >
          <figure className="categroy-media">
            <i className="d-icon-t-shirt2"></i>
          </figure>
          <div className="category-content">
            <h4 className="category-name">Men's Clothings</h4>
          </div>
        </ALink>
      </div>
      <div className="category category-icon">
        <ALink href={{ pathname: '/shop', query: { category: 'electronics' } }}>
          <figure className="categroy-media">
            <i className="d-icon-camera2"></i>
          </figure>
          <div className="category-content">
            <h4 className="category-name">Electronics</h4>
          </div>
        </ALink>
      </div>
      <div className="category category-icon">
        <ALink
          href={{ pathname: '/shop', query: { category: 'game-consoles' } }}
        >
          <figure className="categroy-media">
            <i className="d-icon-gamepad2"></i>
          </figure>
          <div className="category-content">
            <h4 className="category-name">Game Consoles</h4>
          </div>
        </ALink>
      </div>
      <div className="category category-icon">
        <ALink
          href={{ pathname: '/shop', query: { category: 'office-solution' } }}
        >
          <figure className="categroy-media">
            <i className="d-icon-officebag"></i>
          </figure>
          <div className="category-content">
            <h4 className="category-name">Office Solution</h4>
          </div>
        </ALink>
      </div>
      <div className="category category-icon">
        <ALink href={{ pathname: '/shop', query: { category: 'smartphone' } }}>
          <figure className="categroy-media">
            <i className="d-icon-mobile"></i>
          </figure>
          <div className="category-content">
            <h4 className="category-name">SmartPhone</h4>
          </div>
        </ALink>
      </div>
      <div className="category category-icon">
        <ALink href={{ pathname: '/shop', query: { category: 'industrial' } }}>
          <figure className="categroy-media">
            <i className="d-icon-bridge-lamp"></i>
          </figure>
          <div className="category-content">
            <h4 className="category-name">Industrial</h4>
          </div>
        </ALink>
      </div>
      <div className="category category-icon">
        <ALink href={{ pathname: '/shop', query: { category: 'headphone' } }}>
          <figure className="categroy-media">
            <i className="d-icon-headphone"></i>
          </figure>
          <div className="category-content">
            <h4 className="category-name">Headphones</h4>
          </div>
        </ALink>
      </div>
      <div className="category category-icon">
        <ALink href={{ pathname: '/shop', query: { category: 'accessories' } }}>
          <figure className="categroy-media">
            <i className="d-icon-memory"></i>
          </figure>
          <div className="category-content">
            <h4 className="category-name">Accessories</h4>
          </div>
        </ALink>
      </div>
      <div className="category category-icon">
        <ALink href={{ pathname: '/shop', query: { category: 'rice-cooker' } }}>
          <figure className="categroy-media">
            <i className="d-icon-cook"></i>
          </figure>
          <div className="category-content">
            <h4 className="category-name">Rice Cooker</h4>
          </div>
        </ALink>
      </div>  */}
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

const useCategories = () => {
  const { get } = useApiAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  const getCategories = async () => {
    try {
      setLoading(true);
      const data = await get<SubcategoriesList[]>(
        '/catalogue-items/categories'
      );

      // Extract the categories from the categories with no repeated categories
      const categories = data.reduce((acc, subcategory) => {
        const category = subcategory.category_id;
        if (!acc.find((item) => item.id === category)) {
          acc.push({ id: category, name: subcategory.category_name });
        }
        return acc;
      }, [] as Category[]);

      const randomizedCategories = categories.sort(() => Math.random() - 0.5);

      setCategories(randomizedCategories.slice(0, 10));
      setLoading(false);
    } catch (error) {
      console.log('error', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return {
    categories,
    loading,
  };
};

export default MainMenu;
