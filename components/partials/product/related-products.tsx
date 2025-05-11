import OwlCarousel from '~/components/features/owl-carousel';

import ProductTwo from '~/components/features/product/product-two';
import { useItems } from '~/hooks';

import { mainSlider17 } from '~/utils/data/carousel';
import { CatalogueItem } from '~/utils/types';

export default function RelatedProducts(props: {
  adClass?: string;
  item: CatalogueItem;
}) {
  const { adClass = 'pt-3 mt-10', item } = props;

  const { items: products } = useItems({
    filterOptions: {
      categoriesIds: item.award?.subcategories?.map(
        (subcategory) => subcategory.category.id
      ),
    },
  });

  return products.length > 0 ? (
    <section className={`${adClass}`}>
      <h2 className='title justify-content-center'>Premios Relacionados</h2>

      <OwlCarousel
        adClass='owl-carousel owl-theme owl-nav-full'
        options={mainSlider17}
      >
        {products &&
          products
            .slice(0, 5)
            .map((item, index) => (
              <ProductTwo item={item} key={'product-two-' + index} adClass='' />
            ))}
      </OwlCarousel>
    </section>
  ) : (
    <div className=''>
      <h3>Sin productos relacionados</h3>
    </div>
  );
}
