import { useEffect, useLayoutEffect } from "react";
import { connect } from "react-redux";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/router";
import "react-toastify/dist/ReactToastify.min.css";
import "react-image-lightbox/style.css";
import "react-input-range/lib/css/index.css";

import Header from "~/components/common/header";
import Footer from "~/components/common/footer";
import StickyFooter from "~/components/common/sticky-footer";
import Quickview from "~/components/features/product/common/quickview-modal";
import VideoModal from "~/components/features/modals/video-modal";
import { modalActions } from "~/store/modal";
import {
  showScrollTopHandler,
  stickyHeaderHandler,
  stickyFooterHandler,
} from "~/utils";

import { useProgram, useAuth } from "hooks";

function Layout({ children, closeQuickview }) {
  const { program } = useProgram();
  const { isLoggedIn, participant } = useAuth();
  const router = useRouter();

  useLayoutEffect(() => {
    document.querySelector("body").classList.remove("loaded");
  }, [router.pathname]);

  useEffect(() => {
    window.addEventListener("scroll", showScrollTopHandler, true);
    window.addEventListener("scroll", stickyHeaderHandler, true);
    window.addEventListener("scroll", stickyFooterHandler, true);
    window.addEventListener("resize", stickyHeaderHandler, true);
    window.addEventListener("resize", stickyFooterHandler, true);

    return () => {
      window.removeEventListener("scroll", showScrollTopHandler, true);
      window.removeEventListener("scroll", stickyHeaderHandler, true);
      window.removeEventListener("scroll", stickyFooterHandler, true);
      window.removeEventListener("resize", stickyHeaderHandler, true);
      window.removeEventListener("resize", stickyFooterHandler, true);
    };
  }, []);

  useEffect(() => {
    closeQuickview();

    // @ts-ignore
    let bodyClasses = [...document.querySelector("body").classList];
    for (let i = 0; i < bodyClasses.length; i++) {
      document.querySelector("body").classList.remove(bodyClasses[i]);
    }

    setTimeout(() => {
      document.querySelector("body").classList.add("loaded");
    }, 50);
  }, [router.pathname]);

  useEffect(() => {
    if (
      isLoggedIn &&
      (!participant.approvedTermsAndConditions || !participant.approvedPolicy)
    ) {
      router.push("/pages/privacy-policy");
    }
  }, [isLoggedIn, participant]);

  useEffect(() => {
    if (isLoggedIn && !program?.isStoreActive) {
      router.push("/");
    }
  }, [isLoggedIn, program?.isStoreActive]);

  if (!program) {
    return (
      <>
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "fixed",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        ></div>
      </>
    );
  }

  return (
    <div>
      <div className="page-wrapper">
        {isLoggedIn && <Header />}

        {children}

        {isLoggedIn && <Footer />}

        {isLoggedIn ? <StickyFooter /> : <div></div>}
      </div>

      <ToastContainer
        autoClose={3000}
        // @ts-ignore
        duration={300}
        newestOnTo={true}
        className="toast-container"
        position="bottom-left"
        closeButton={false}
        hideProgressBar={true}
        newestOnTop={true}
      />

      <Quickview />

      <VideoModal />
    </div>
  );
}

export default connect(null, { closeQuickview: modalActions.closeQuickview })(
  Layout
);
