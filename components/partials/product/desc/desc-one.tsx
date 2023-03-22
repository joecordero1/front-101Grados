import React from "react";
import { connect } from "react-redux";
import { Tabs, Tab, TabList, TabPanel } from "react-tabs";

import ALink from "~/components/features/custom-link";

import { modalActions } from "~/store/modal";

import { toDecimal } from "~/utils";
import { CatalogueItem, VariantType } from "~/utils/types";
function DescOne(props: {
  product: CatalogueItem;
  isGuide?: boolean;
  isDivider?: boolean;
  openModal?: () => void;
}) {
  const { product, isGuide = true, isDivider = true, openModal } = props;

  let colors = [],
    sizes = [];

  return (
    <Tabs
      className="tab tab-nav-simple product-tabs"
      selectedTabClassName="show"
      selectedTabPanelClassName="active"
      defaultIndex={0}
    >
      <TabList className="nav nav-tabs justify-content-center" role="tablist">
        <Tab className="nav-item">
          <span className="nav-link">Description</span>
        </Tab>
        {(product && product.award.subcategories.length > 0) ||
        product.award.variants ? (
          <Tab className="nav-item">
            <span className="nav-link">Additional information</span>
          </Tab>
        ) : (
          ""
        )}
        {isGuide ? (
          <Tab className="nav-item">
            <span className="nav-link">Size Guide</span>
          </Tab>
        ) : (
          ""
        )}
      </TabList>

      <div className="tab-content">
        <TabPanel className="tab-pane product-tab-description">
          <div className="row mt-6">
            <div className="col-12">
              <h5 className="description-title mb-4 font-weight-semi-bold ls-m">
                Descripción
              </h5>
              <p
                className="product-short-desc"
                dangerouslySetInnerHTML={{ __html: product.award.description }}
              ></p>
            </div>
          </div>
        </TabPanel>

        {(product && product.award.subcategories.length > 0) ||
        product.award.variants ? (
          <TabPanel className="tab-pane product-tab-additional">
            <ul className="list-none">
              {product.award.subcategories.length > 0 ? (
                <li>
                  <label>Categories:</label>
                  <p>
                    {product.award.subcategories.map((item, index) => (
                      <React.Fragment key={item.name + "-" + index}>
                        {item.name}
                        {index < product.award.subcategories.length - 1
                          ? ", "
                          : ""}
                      </React.Fragment>
                    ))}
                  </p>
                </li>
              ) : (
                ""
              )}

              {
                <li>
                  <label>Marca:</label>
                  <p>
                    <React.Fragment>{product.award.brand.name}</React.Fragment>
                  </p>
                </li>
              }

              {product.award.variants.length > 0 &&
              product.award.variants.filter(
                (variant) => variant.type === VariantType.COLOR
              ) ? (
                <li>
                  <label>Color:</label>
                  <p>
                    {product.award.variants.map((item, index) => (
                      <React.Fragment key={item.name + "-" + index}>
                        {item.name}
                        {index < colors.length - 1 ? ", " : ""}
                      </React.Fragment>
                    ))}
                  </p>
                </li>
              ) : (
                ""
              )}

              {product.award.variants.length > 0 &&
              product.award.variants.filter(
                (variant) => variant.type === VariantType.SIZE
              ) ? (
                <li>
                  <label>Talla:</label>
                  <p>
                    {product.award.variants.map((item, index) => (
                      <React.Fragment key={item.name + "-" + index}>
                        {item.name}
                        {index < colors.length - 1 ? ", " : ""}
                      </React.Fragment>
                    ))}
                  </p>
                </li>
              ) : (
                ""
              )}
            </ul>
          </TabPanel>
        ) : (
          ""
        )}
      </div>
    </Tabs>
  );
}

export default DescOne;
