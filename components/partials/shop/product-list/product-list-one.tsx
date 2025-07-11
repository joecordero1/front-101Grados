import { FC, useEffect } from "react";
import { useRouter } from "next/router";
import ProductTwo from "~/components/features/product/product-two";
import ProductEight from "~/components/features/product/product-eight";
import Pagination from "~/components/features/pagination";
import withApollo from "~/server/apollo";
import { CatalogueItem } from "../../../../utils/types/catalogueItem";
import { PaginationMetaDto } from "../../../../utils/types/common";

type Props = {
  items: CatalogueItem[];
  meta: PaginationMetaDto;
  handlePageChange: (newMeta: PaginationMetaDto) => void;
  loading?: boolean;
  itemsPerRow?: number;
  type?: string;
  isToolbox?: boolean;
};

const ProductListOne: FC<Props> = (props) => {
  const { items, loading, meta, handlePageChange } = props;
  const { itemsPerRow = 3, type = "left", isToolbox = true } = props;
  const router = useRouter();
  const query = router.query;

  // const products = data && data.products.data;
  const gridClasses = {
    3: "cols-2 cols-sm-3",
    4: "cols-2 cols-sm-3 cols-md-4",
    5: "cols-2 cols-sm-3 cols-md-4 cols-xl-5",
    6: "cols-2 cols-sm-3 cols-md-4 cols-xl-6",
    7: "cols-2 cols-sm-3 cols-md-4 cols-lg-5 cols-xl-7",
    8: "cols-2 cols-sm-3 cols-md-4 cols-lg-5 cols-xl-8",
  };
  // @ts-ignore
  const perPage = query.per_page ? parseInt(query.per_page) : 15;
  // const totalPage = data
  //   ? // @ts-ignore
  //     parseInt(data.products.total / perPage) +
  //     (data.products.total % perPage ? 1 : 0)
  //   : 1;
  const page = query.page ? query.page : 1;
  const gridType = query.type ? query.type : "grid";

  useEffect(() => {
    // getProducts({
    //   variables: {
    //     search: query.search,
    //     // @ts-ignore
    //     colors: query.colors ? query.colors.split(',') : [],
    //     // @ts-ignore
    //     sizes: query.sizes ? query.sizes.split(',') : [],
    //     // @ts-ignore
    //     brands: query.brands ? query.brands.split(',') : [],
    //     // @ts-ignore
    //     min_price: parseInt(query.min_price),
    //     // @ts-ignore
    //     max_price: parseInt(query.max_price),
    //     category: query.category,
    //     tag: query.tag,
    //     sortBy: query.sortby,
    //     // @ts-ignore
    //     from: perPage * (page - 1),
    //     // @ts-ignore
    //     to: perPage * page,
    //   },
    // });
  }, [query]);

  return (
    <>
      {/* {isToolbox ? <ToolBox type={type} /> : ''} */}
      {loading ? (
        gridType === "grid" ? (
          <div className={`row product-wrapper ${gridClasses[itemsPerRow]}`}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => (
              <div
                className="product-loading-overlay"
                key={"popup-skel-" + item}
              ></div>
            ))}
          </div>
        ) : (
          <div className="row product-wrapper skeleton-body cols-1">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => (
              <div
                className="skel-pro skel-pro-list mb-4"
                key={"list-skel-" + item}
              ></div>
            ))}
          </div>
        )
      ) : (
        ""
      )}

      {items.length > 0 ? (
        <div
          className="toolbox toolbox-pagination"
          style={{ paddingTop: 10, paddingBottom: 0 }}
        >
          {/* {data && (
            <p className="show-info">
              Showing{' '}
              <span>
                {perPage * (page - 1) + 1} - 
                {Math.min(perPage * page, data.products.total)} of{' '}
                {data.products.total}
              </span>
              Products
            </p>
          )} */}

          <Pagination meta={meta} handlePageChange={handlePageChange} />
        </div>
      ) : (
        ""
      )}

      {gridType === "grid" ? (
        <div className={`row product-wrapper ${gridClasses[7]}`}>
          {items.map((item) => (
            <div className="product-wrap" key={"shop-" + item.award.id}>
              <ProductTwo item={item} adClass="" />
            </div>
          ))}
        </div>
      ) : (
        <div className="product-lists product-wrapper">
          {items.map((item) => (
            <ProductEight item={item} key={"shop-list-" + item.award.id} />
          ))}
        </div>
      )}

      {items.length === 0 ? (
        <p className="ml-1">
          No hemos encontrado ningún premio con esos filtros.
        </p>
      ) : (
        ""
      )}

      {items.length > 0 ? (
        <div className="toolbox toolbox-pagination">
          {/* {data && (
            <p className="show-info">
              Showing{' '}
              <span>
                {perPage * (page - 1) + 1} - 
                {Math.min(perPage * page, data.products.total)} of{' '}
                {data.products.total}
              </span>
              Products
            </p>
          )} */}

          <Pagination meta={meta} handlePageChange={handlePageChange} />
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default withApollo({ ssr: typeof window === "undefined" })(
  ProductListOne
);
