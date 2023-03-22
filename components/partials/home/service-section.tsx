import React from "react";

import OwlCarousel from "~/components/features/owl-carousel";
import { useProgram } from "~/hooks";

import { serviceSlider } from "~/utils/data/carousel";

function ServiceBox(props) {
  const { program } = useProgram();
  return (
    <div className="service-wrapper mt-2 mb-10">
      <div className="service-list">
        <OwlCarousel adClass="owl-theme" options={serviceSlider}>
          <div className="icon-box icon-box-side icon-box1">
            <i className="icon-box-icon d-icon-truck"></i>
            <div className="icon-box-content">
              <h4 className="icon-box-title text-capitalize lh-1">
                <a href={program.faq} target="_blank" rel="noreferrer">
                  Preguntas Frecuentes
                </a>
              </h4>
              <p className="lh-1">Hemos recopilado las dudas más comunes</p>
            </div>
          </div>

          <div className="icon-box icon-box-side icon-box2">
            <i className="icon-box-icon d-icon-service"></i>
            <div className="icon-box-content">
              <h4 className="icon-box-title text-capitalize lh-1">
                <a href={program.rules} target="_blank" rel="noreferrer">
                  Reglamento
                </a>
              </h4>
              <p className="lh-1">
                Permítenos contarte cómo funciona la tienda
              </p>
            </div>
          </div>

          <div className="icon-box icon-box-side icon-box3">
            <i className="icon-box-icon d-icon-secure"></i>
            <div className="icon-box-content">
              <h4 className="icon-box-title text-capitalize lh-1">
                <a
                  href={program.howToEarnPoints}
                  target="_blank"
                  rel="noreferrer"
                >
                  ¿Comó Ganar?
                </a>
              </h4>
              <p className="lh-1">
                Tienes preparada una mecánica especialmente para tí
              </p>
            </div>
          </div>
        </OwlCarousel>
      </div>
    </div>
  );
}

export default React.memo(ServiceBox);
